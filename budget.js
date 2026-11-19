"use strict";
/* Step 4: Budget (under 500) / Mid-range (500-2,000) / Premium (2,000-6,000) / Any */
(function(){
  if(!Auth.require())return;
  mountNav("find");mountSteps(3);stickers(["💐|left:.8%;top:74%","🎮|right:1%;top:80%"]);
  let sel=Rec.get().bud;
  const T=[[-1,"Any budget","0 – 6,000 tk",G.length],[0,"Budget","Under 500 tk",G.filter(g=>g.b===0).length],[1,"Mid-range","500 – 2,000 tk",G.filter(g=>g.b===1).length],[2,"Premium","2,000 – 6,000 tk",G.filter(g=>g.b===2).length]];
  const draw=()=>{$("#tiers").innerHTML=T.map(t=>'<button type="button" class="tier'+(sel===t[0]?" sel":"")+'" data-v="'+t[0]+'"><b>'+t[1]+'</b><span>'+t[2]+' · '+t[3]+' gifts</span></button>').join("");fit()};
  $("#tiers").addEventListener("click",e=>{const b=e.target.closest(".tier");if(!b)return;sel=+b.dataset.v;draw()});
  $("#next").addEventListener("click",()=>{Rec.set({bud:sel});location.href="interests.html"});
  draw();
})();
