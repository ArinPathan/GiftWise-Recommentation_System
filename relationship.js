"use strict";
/* Step 2: who is the recipient to you? */
(function(){
  if(!Auth.require())return;
  mountNav("find");mountSteps(1);stickers(["🎁|left:.8%;top:74%","💐|right:1%;top:80%"]);
  const r=Rec.get(),s={v:r.rel};
  if(r.name)$("#sub").textContent="How is "+r.name+" related to you?";
  chipGroup($("#rel"),["Partner","Friend","Parent","Sibling","Child","Colleague","Other"],s,false,()=>showErr(""));
  $("#next").addEventListener("click",()=>{if(!s.v)return showErr("Please choose a relationship.");Rec.set({rel:s.v});location.href="occasion.html"});
})();
