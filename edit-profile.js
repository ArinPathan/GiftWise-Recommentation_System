"use strict";
/* Edit profile: loads the current details, validates and saves changes */
(function(){
  const m=Auth.require();if(!m)return;
  mountNav("profile");stickers(["📚|left:5%;top:25%","🎲|right:5%;top:65%"]);
  $("#name").value=m.name;$("#email").value=m.email;$("#phone").value=m.phone||"";$("#gender").value=m.gender||"";$("#bio").value=m.bio||"";
  $("#ef").addEventListener("submit",e=>{
    e.preventDefault();
    const name=$("#name").value.trim(),email=$("#email").value.trim(),phone=$("#phone").value.trim(),pw=$("#pw").value;
    if(!name)return showErr("Name cannot be empty.");
    if(!/^\S+@\S+\.\S+$/.test(email))return showErr("Enter a valid email address.");
    if(phone&&!/^(\+?88)?01\d{9}$/.test(phone.replace(/[\s-]/g,"")))return showErr("Enter a valid mobile number, e.g. 01712345678.");
    if(pw&&pw.length<4)return showErr("Password needs at least 4 characters.");
    const patch={name,email,phone,gender:$("#gender").value,bio:$("#bio").value.trim()};
    if(pw)patch.password=pw;
    Auth.update(m.username,patch);location.href="profile.html";
  });
  fit();
})();
