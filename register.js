"use strict";
/* Register: validates the form, creates the account, signs the user in, then starts the gift wizard */
$("#rf").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("#name").value.trim(),username=$("#username").value.trim(),email=$("#email").value.trim(),
        pw=$("#pw").value,pw2=$("#pw2").value,gender=($("input[name=g]:checked")||{}).value||"";
  let msg="";
  if(!name||!username||!email||!pw)msg="Please fill in all fields.";
  else if(!/^\S+@\S+\.\S+$/.test(email))msg="Enter a valid email address.";
  else if(pw.length<4)msg="Password needs at least 4 characters.";
  else if(pw!==pw2)msg="Passwords do not match.";
  else if(Auth.exists(username))msg="That username is taken.";
  else if(!$("#tc").checked)msg="Please accept the Terms and Conditions.";
  if(msg)return showErr(msg);
  Auth.register({username,password:pw,name,email,phone:"",gender,bio:""});
  Rec.clear();
  location.href="recipient.html";
});
