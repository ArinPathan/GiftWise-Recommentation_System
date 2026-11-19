"use strict";
/* Login: checks username + password, then goes to the first wizard step */
stickers(["🎁|left:4%;top:8%","♟️|left:30%;top:28%","💐|left:6%;top:42%","🎲|left:16%;top:62%","🎁|left:7%;top:80%","📚|left:30%;top:84%","🎁|right:6%;top:8%","🎮|right:30%;top:12%","⚽|right:32%;top:34%","🎀|right:5%;top:42%","💐|right:24%;top:62%","💻|right:30%;top:84%","🎁|right:6%;top:78%"]);
$("#lf").addEventListener("submit",e=>{
  e.preventDefault();
  const u=Auth.login($("#username").value.trim(),$("#pw").value);
  if(!u)return showErr("Incorrect username or password.");
  location.href="recipient.html";
});
