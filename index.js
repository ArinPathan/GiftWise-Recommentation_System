"use strict";
/* Get Started: if someone is already signed in, offer to continue */
const me=Auth.me();
if(me){const c=$("#cta");c.href="recipient.html";c.textContent="Continue ➞";$("#alt").innerHTML="Signed in as <em>"+esc(me.name)+"</em>"}
