"use strict";
/* GiftWise: shared helpers (storage, session, nav, wizard steps, small UI utilities) */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const tk=n=>n.toLocaleString("en-US")+" tk";

/* ---- storage (browser localStorage; replace with API calls if you add a backend) ---- */
const DB={get(k,d){try{const v=localStorage.getItem("gw_"+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
set(k,v){try{localStorage.setItem("gw_"+k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem("gw_"+k)}catch(e){}}};

/* ---- accounts: register / login / logout / profile ---- */
const Auth={
users(){let u=DB.get("users",null);if(!u){u=[{username:"demo",password:"demo",name:"Demo User",email:"demo@giftwise.com",phone:"01712345678",gender:"Female",bio:"I love finding the perfect gift."}];DB.set("users",u)}return u},
me(){const n=DB.get("session",null);return n?Auth.users().find(u=>u.username===n)||null:null},
exists(name){return Auth.users().some(u=>u.username.toLowerCase()===name.toLowerCase())},
register(o){DB.set("users",[...Auth.users(),o]);DB.set("session",o.username);return o},
login(name,pw){const u=Auth.users().find(a=>a.username===name&&a.password===pw);if(u)DB.set("session",u.username);return u||null},
logout(){DB.del("session")},
update(name,patch){DB.set("users",Auth.users().map(u=>u.username===name?Object.assign(u,patch):u))},
require(){const m=Auth.me();if(!m)location.replace("login.html");return m}};

/* ---- recipient details (steps 1-5), favourites, reviews ---- */
const REC0={name:"",age:"",gender:"",rel:"",occ:"",bud:-1,int:[]};
const Rec={get(){return Object.assign({},REC0,DB.get("rec",{}))},set(p){DB.set("rec",Object.assign(Rec.get(),p))},clear(){DB.del("rec")}};
const Favs={list(){return DB.get("favs",[])},has(id){return Favs.list().includes(id)},
toggle(id){const l=Favs.list(),on=!l.includes(id);DB.set("favs",on?[...l,id]:l.filter(x=>x!==id));toast(on?"Saved to favorites":"Removed from favorites");return on}};
const Rev={all(){return DB.get("reviews",{1:[{by:"Nadia",r:5,t:"Great value, my brother loved them!"}]})},of(id){return Rev.all()[id]||[]},
add(id,x){const a=Rev.all();(a[id]=a[id]||[]).unshift(x);DB.set("reviews",a)},
avg(id){const l=Rev.of(id);return l.length?(l.reduce((s,x)=>s+x.r,0)/l.length).toFixed(1)+" ★ ("+l.length+")":"No reviews yet"}};

/* ---- UI helpers ---- */
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),1900)}
function showErr(m){const e=$("#err");if(e)e.textContent=m;fit()}
let _active="";
function mountNav(active){_active=active||_active;const el=$("#nav");if(!el)return;
el.innerHTML='<nav><a class="logo" href="recipient.html">Gift<em>W</em>ise</a>'+[["recipient.html","Find gifts","find"],["favorites.html","Favorites ("+Favs.list().length+")","fav"],["profile.html","Profile","profile"],["logout.html","Logout","logout"]].map(([h,l,k])=>'<a href="'+h+'" class="'+(k===_active?"on":"")+'">'+l+"</a>").join("")+"</nav>"}
const STEPS=[["recipient","Recipient"],["relationship","Relationship"],["occasion","Occasion"],["budget","Budget"],["interests","Interests"]];
function mountSteps(cur){$("#steps").innerHTML=STEPS.map(([p,l],i)=>{const t=i<cur?"a":"div";return "<"+t+(i<cur?' href="'+p+'.html"':"")+' class="st '+(i<cur?"done":i===cur?"on":"")+'"><b>'+(i<cur?"✓":i+1)+"</b>"+l+"</"+t+">"}).join("")}
/* chipGroup(box, options, {v:selection}, multi, onChange): clickable single/multi-select chips */
function chipGroup(box,opts,state,multi,cb){
const draw=()=>{box.innerHTML=opts.map(o=>{const v=o.v||o,l=o.l||o,on=multi?state.v.includes(v):state.v===v;return '<button type="button" class="chip'+(on?" sel":"")+'" data-v="'+esc(v)+'">'+esc(l)+"</button>"}).join("");fit()};
box.onclick=e=>{const b=e.target.closest(".chip");if(!b)return;const v=b.dataset.v;
if(multi)state.v=state.v.includes(v)?state.v.filter(x=>x!==v):[...state.v,v];else state.v=state.v===v?"":v;draw();cb&&cb(state.v)};draw()}
function stickers(list){document.body.insertAdjacentHTML("afterbegin",list.map(s=>{const[e,p]=s.split("|");return '<div class="deco" style="'+p+'">'+e+"</div>"}).join(""))}
/* fit(): keeps every page inside the window (no scrolling) by scaling down slightly if needed */
function fit(){const a=$("#app"),m=$("main");if(!a||!m)return;let z=1;for(;z>.62;z-=.04){a.style.zoom=z;a.style.height=innerHeight/z+"px";a.style.width=innerWidth/z+"px";if(m.scrollHeight<=m.clientHeight+1&&m.scrollWidth<=m.clientWidth+1)break}}
addEventListener("load",fit);addEventListener("resize",fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
