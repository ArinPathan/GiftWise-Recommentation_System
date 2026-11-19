"use strict";
/* Rate & review: 1-5 stars and an optional comment, saved per gift */
(function(){
  const me=Auth.require();if(!me)return;
  const g=G[+new URLSearchParams(location.search).get("id")];if(!g){location.replace("recommendations.html");return}
  mountNav("find");stickers(["⭐|left:6%;top:24%","🎁|right:6%;top:30%"]);
  const back="gift-details.html?id="+g.id;$("#back").href=back;$("#cancel").href=back;
  $("#what").textContent="Reviewing: "+g.br+" "+g.n;
  let rating=0;
  const draw=()=>{$("#stars").innerHTML=[1,2,3,4,5].map(n=>'<button type="button" class="star'+(n<=rating?" on":"")+'" data-n="'+n+'" aria-label="'+n+' star">★</button>').join("")};
  $("#stars").addEventListener("click",e=>{const b=e.target.closest(".star");if(!b)return;rating=+b.dataset.n;draw();showErr("")});
  $("#rf").addEventListener("submit",e=>{
    e.preventDefault();if(!rating)return showErr("Please pick a star rating.");
    Rev.add(g.id,{by:me.name,r:rating,t:$("#text").value.trim()});location.href=back;
  });
  draw();
})();
