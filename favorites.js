"use strict";
/* Favorites: every gift the customer saved with the heart button */
(function(){
  if(!Auth.require())return;
  mountNav("fav");stickers(["💐|right:.8%;top:12%","🎁|left:.8%;top:76%"]);
  let page=0;
  function draw(){
    const ids=Favs.list(),rows=innerHeight>=940?3:2,ps=4*rows,t=Math.max(1,Math.ceil(ids.length/ps));page=Math.min(page,t-1);
    if(!ids.length){$("#list").outerHTML='<div class="card" id="empty"><p class="m">No saved gifts yet. Tap the ♡ on any gift to keep it here.</p><div><a class="btn" href="recipient.html">Find gifts</a></div></div>';$("#pager").hidden=true;return fit()}
    $("#list").style.setProperty("--r",rows);
    $("#list").innerHTML=ids.slice(page*ps,page*ps+ps).map(i=>giftCard(G[i],{from:"favorites"})).join("");
    $("#pager").innerHTML='<button class="chip" data-d="-1" '+(page?"":"disabled")+'>‹ Prev</button><span class="m">Page '+(page+1)+" of "+t+" · "+ids.length+' saved</span><button class="chip" data-d="1" '+(page>=t-1?"disabled":"")+'>Next ›</button>';
    fit();
  }
  $("#pager").addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b||b.disabled)return;page+=+b.dataset.d;draw()});
  bindHearts($("#list"),draw);draw();
})();
