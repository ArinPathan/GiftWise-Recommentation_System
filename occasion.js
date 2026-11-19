"use strict";
/* Step 3: occasions include Birthday, Eid, Pohela Boishakh, Wedding, New Baby and more (list lives in data.js) */
(function(){
  if(!Auth.require())return;
  mountNav("find");mountSteps(2);stickers(["🎲|left:.8%;top:74%","🎁|right:1%;top:80%"]);
  const s={v:Rec.get().occ};
  chipGroup($("#occ"),OCCS,s,false,()=>showErr(""));
  $("#next").addEventListener("click",()=>{if(!s.v)return showErr("Please choose an occasion.");Rec.set({occ:s.v});location.href="budget.html"});
})();
