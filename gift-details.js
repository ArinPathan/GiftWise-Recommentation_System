"use strict";
/* Gift details: big picture, price, why it was picked, save to favorites, link to review */
(function(){
  if(!Auth.require())return;
  const q=new URLSearchParams(location.search),g=G[+q.get("id")],from=q.get("from")==="favorites"?"favorites":"recommendations";
  if(!g){location.replace("recommendations.html");return}
  mountNav(from==="favorites"?"fav":"find");stickers(["🎁|right:.8%;top:8%","🎮|left:.8%;top:82%"]);
  $("#back").href=from+".html";
  $("#pic").innerHTML=photo(g);
  const r=Rec.get(),why=r.name?sc(g,r).w:[];
  const draw=()=>{
    $("#info").innerHTML=
     '<div class="m">'+esc(g.br)+' · #'+(g.id+1)+'</div><h1 class="gh">'+esc(g.n)+'</h1>'+
     '<div class="price" style="font-size:26px">'+tk(g.p)+' <span class="m" style="font-size:14px">approx. · '+BN[g.b]+'</span></div>'+
     '<p class="m">'+Rev.avg(g.id)+'</p><p style="line-height:1.5">'+esc(g.d)+'</p>'+
     '<div class="dl"><span>Category</span><span>'+g.c+'</span><span>Good for</span><span>'+g.o.slice(0,4).join(", ")+'</span>'+(why.length?'<span>Why this gift</span><span>'+esc(why.join(" · "))+'</span>':"")+'</div>'+
     '<div class="row" style="margin-top:6px"><button class="btn" id="fav">'+(Favs.has(g.id)?"♥ Saved to favorites":"♡ Save to favorites")+'</button><a class="btn out" href="review.html?id='+g.id+'">Rate &amp; review</a></div>'+
     '<p class="note">Add your own photo as images/products/'+(g.id+1)+'.jpg</p>';
    $("#fav").onclick=()=>{Favs.toggle(g.id);mountNav();draw()};
    fit();
  };
  const l=Rev.of(g.id);
  $("#rvs").innerHTML=l.length?l.slice(0,2).map(x=>'<div class="card rv2"><span style="color:#e9a23b">'+"★".repeat(x.r)+"☆".repeat(5-x.r)+"</span> <b>"+esc(x.by)+'</b><div class="m">'+esc(x.t)+"</div></div>").join("")+(l.length>2?'<span class="m" style="align-self:center">+'+(l.length-2)+" more</span>":""):'<div class="card rv2 m">No reviews yet. Be the first to review this gift!</div>';
  draw();
})();
