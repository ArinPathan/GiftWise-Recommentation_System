"use strict";
/* Step 1: saves name, age and gender for the recommendation engine */
(function(){
  if(!Auth.require())return;
  mountNav("find");mountSteps(0);stickers(["🎁|left:.8%;top:74%","⚽|right:1%;top:80%"]);
  const r=Rec.get(),g={v:r.gender};
  $("#name").value=r.name;$("#age").value=r.age;
  chipGroup($("#gender"),["Female","Male","Other"],g,false);
  $("#rf").addEventListener("submit",e=>{
    e.preventDefault();
    const name=$("#name").value.trim(),age=$("#age").value;
    if(!name)return showErr("Please enter the recipient's name.");
    if(age&&(+age<1||+age>110))return showErr("Enter a valid age (1-110).");
    Rec.set({name,age,gender:g.v});location.href="relationship.html";
  });
})();
