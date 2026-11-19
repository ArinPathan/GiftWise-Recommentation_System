"use strict";
/* Recommendations: filters the catalogue by budget tier, then ranks by interests, occasion, relationship, gender and age */
(function(){
  if(!Auth.require())return;
  const r=Rec.get();if(!r.name){location.replace("recipient.html");return}
  mountNav("find");stickers(["🎲|right:.8%;top:10%","💐|left:.8%;top:78%"]);
  const pool=G.filter(g=>r.bud<0||g.b===r.bud),ranked=rank(r,pool),PS=6;let cat="All",page=0;
  $("#title").innerHTML="Gift ideas for <em>"+esc(r.name)+"</em>";
  $("#sum").textContent=[r.rel,r.occ,r.age?"age "+r.age:"",r.gender,r.bud>=0?BN[r.bud]:"Any budget",...r.int].filter(Boolean).join(" · ")+" · "+pool.length+" gifts in range";
  const hit=g=>g.t.some(t=>r.int.includes(t));
  const cats=CATS.map(c=>[c,pool.filter(g=>g.c===c)]).filter(x=>x[1].length);
  const drawCats=()=>{$("#cats").innerHTML=[["All",pool.length],...cats.map(x=>[x[0],x[1].length])].map(([c,n])=>'<button class="chip'+(cat===c?" sel":"")+'" data-c="'+c+'">'+(CI[c]||"✨")+" "+c+" · "+n+"</button>").join("")};
  function draw(){
    const list=ranked.filter(x=>cat==="All"||x.g.c===cat),t=Math.max(1,Math.ceil(list.length/PS));page=Math.min(page,t-1);
    $("#grid").innerHTML=list.slice(page*PS,page*PS+PS).map(x=>giftCard(x.g,{h:1,why:wy(x),from:"recommendations"})).join("");
    $("#pager").innerHTML='<button class="chip" data-d="-1" '+(page?"":"disabled")+'>‹ Prev</button><span class="m">Page '+(page+1)+" of "+t+'</span><button class="chip" data-d="1" '+(page>=t-1?"disabled":"")+'>Next ›</button>';
    fit();
  }
  $("#cats").addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;cat=b.dataset.c;page=0;drawCats();draw()});
  $("#pager").addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b||b.disabled)return;page+=+b.dataset.d;draw()});
  bindHearts($("#grid"));drawCats();draw();
})();
