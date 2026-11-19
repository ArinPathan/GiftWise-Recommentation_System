"use strict";
/* View profile: shows the signed-in customer's details */
(function(){
  const m=Auth.require();if(!m)return;
  mountNav("profile");stickers(["🎁|left:5%;top:20%","💻|right:5%;top:72%"]);
  $("#box").innerHTML=
   '<div class="row"><div class="av">'+esc(m.name[0]||"?")+'</div><div><h2>'+esc(m.name)+'</h2><span class="m">@'+esc(m.username)+'</span></div></div>'+
   '<div class="dl"><span>Email</span><span>'+esc(m.email)+'</span><span>Phone</span><span>'+(esc(m.phone)||"—")+'</span><span>Gender</span><span>'+(esc(m.gender)||"—")+'</span><span>About</span><span>'+(esc(m.bio)||"—")+'</span><span>Favorites</span><span>'+Favs.list().length+' gifts</span></div>'+
   '<div class="row"><a class="btn" href="edit-profile.html">Edit profile</a><a class="btn ghost" href="favorites.html">My favorites</a></div>';
  fit();
})();
