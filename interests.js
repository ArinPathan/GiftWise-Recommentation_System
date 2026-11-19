"use strict";
/* Step 5: multi-select interests, then generate the recommendations */
(function(){
  if(!Auth.require())return;
  mountNav("find");mountSteps(4);stickers(["📚|left:.8%;top:74%","🏏|right:1%;top:80%"]);
  const s={v:Rec.get().int};
  chipGroup($("#int"),[{v:"Gaming",l:"🎮 Gaming"},{v:"Books",l:"📚 Books"},{v:"Music",l:"🎧 Music"},{v:"Tech",l:"💻 Tech"},{v:"Sports",l:"🏏 Sports"},{v:"Fashion",l:"👕 Fashion"},{v:"Fitness",l:"💪 Fitness"},{v:"Other",l:"✨ Other"}],s,true,()=>showErr(""));
  $("#go").addEventListener("click",()=>{if(!s.v.length)return showErr("Pick at least one interest.");Rec.set({int:s.v});location.href="recommendations.html"});
})();
