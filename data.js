/* GiftWise: product catalogue (99 items: 33 Budget, 33 Mid-range, 33 Premium; prices in BDT, approximate)
   Each RAW line = Category|Brand|Name|Price|Emoji|tags
   tags (comma separated): interests (Gaming, Books...), F/M (gender), kid/teen/adult/senior (age),
   Partner/Friend/Parent/Sibling/Colleague (relationship), or an occasion name. */
const BN=["Budget","Mid-range","Premium"],BUD=["Budget · under 500tk","Mid-range · 500–2,000tk","Premium · 2,000–6,000tk"],BR=[[0,499],[500,1999],[2000,6000]];
const CATS=["Tech","Gaming","Books","Music","Sports","Fitness","Fashion","Beauty","Sweets","Home","Kids"],CI={Tech:"💻",Gaming:"🎮",Books:"📚",Music:"🎧",Sports:"🏏",Fitness:"💪",Fashion:"👕",Beauty:"💄",Sweets:"🍫",Home:"🏡",Kids:"🧸"};
const OCCS=["Birthday","Anniversary","Graduation","Wedding","Eid","Pohela Boishakh","Valentines Day","Parents Day","New Baby","Housewarming","Get Well","Other"];
const OD={Tech:["Birthday","Graduation","Eid"],Gaming:["Birthday","Eid"],Books:["Birthday","Graduation","Get Well","Pohela Boishakh"],Music:["Birthday","Valentines Day","Eid"],Sports:["Birthday","Eid","Graduation"],Fitness:["Birthday","Graduation"],Fashion:["Birthday","Eid","Pohela Boishakh","Wedding"],Beauty:["Birthday","Valentines Day","Eid","Parents Day"],Sweets:["Birthday","Eid","Anniversary","Get Well","Housewarming","Pohela Boishakh"],Home:["Housewarming","Wedding","Anniversary","Birthday","Parents Day"],Kids:["Birthday","New Baby"]};
const DS={Tech:"Dependable everyday tech they will actually use.",Gaming:"Great for game nights and playtime.",Books:"A thoughtful pick for readers and writers.",Music:"For anyone who always has something playing.",Sports:"Built for the pitch, the court and the park.",Fitness:"A small push towards a healthier routine.",Fashion:"A stylish gift that is easy to love.",Beauty:"Self-care they will enjoy using.",Sweets:"A sweet treat that always lands well.",Home:"Adds warmth and personality to any room.",Kids:"Safe, fun and made for little hands."};
const RAW=`Tech|Anker|USB-C Fast Charging Cable|450|🔌|Friend,Colleague
Tech|Xiaomi|Redmi Basic Earphones|390|🎧|Music,teen
Tech|SanDisk|Cruzer Blade 32GB Pen Drive|420|💾|Colleague
Gaming|Mattel|UNO Card Game|380|🃏|Friend,Sibling,kid,teen,adult
Gaming|Hot Wheels|Die-cast Car|150|🏎️|kid,M
Gaming|Play-Doh|4-Pack Modelling Dough|450|🎨|kid
Books|Anyaprokash|Himu Somogro by Humayun Ahmed|450|📖|Pohela Boishakh,Friend
Books|Penguin|Gitanjali by Rabindranath Tagore|350|📖|Parent,Pohela Boishakh,senior,adult
Books|Pentel|Energel Gel Pen Set|220|🖊️|Colleague
Music|Hohner|Harmonica|480|🎵|Friend,teen
Music|Havit|Wired Earphones|350|🎧|Tech,Friend
Sports|SG|Tennis Cricket Ball Pack|180|🏏|M,teen,Friend
Sports|SG|Cricket Bat Grip Set|220|🏏|M,Friend
Sports|Cosco|Shuttlecock 3 pcs|250|🏸|Friend
Sports|GM|Cricket Cap|320|🧢|M,Friend
Fitness|Nivia|Skipping Rope|180|🪢|Friend
Fitness|Nivia|Resistance Band|350|💪|Friend
Fashion|Bata|Cotton Socks 3-Pair Pack|450|🧦|M
Fashion|Aarong|Printed Cotton Scarf|480|🧣|F,Parents Day,Parent
Fashion|Richman|Cotton Handkerchief Set|300|👔|M,Parent,Colleague
Beauty|Nivea|Lip Care Balm|220|💄|F,Partner
Beauty|Garnier|Face Wash|350|🧴|Friend
Beauty|Fogg|Scent Body Spray|420|🌸|M,Friend
Sweets|Cadbury|Dairy Milk Silk 60g|220|🍫|kid,teen,adult,senior,Valentines Day
Sweets|Kinder|Joy Egg|100|🥚|kid
Sweets|Ferrero|Rocher 3-piece|240|🍬|Valentines Day,Partner,F
Sweets|Toblerone|Milk Chocolate 100g|480|🍫|Valentines Day,Partner
Home|Archies|Greeting Card|150|💌|Valentines Day,Partner
Home|Archies|Scented Candle|380|🕯️|Partner,F
Home|Aarong|Handmade Notebook|350|📓|Graduation,Colleague
Home|Aarong|Terracotta Flower Vase|450|🏺|Parent
Kids|Cussons|Baby Powder & Lotion Set|450|🍼|kid
Kids|Johnson & Johnson|Baby Bath Mini Set|480|🛁|kid
Tech|Logitech|M170 Wireless Mouse|850|🖱️|Colleague,Graduation
Tech|Baseus|10000mAh Power Bank|1650|🔋|Friend,Colleague
Tech|Xiaomi|Redmi Buds 4 Active|1750|🎧|Music,Friend,Partner
Gaming|LEGO|Brick Builder Mini Set|1250|🧱|kid
Gaming|Barbie|Fashion Doll|1250|👸|kid,F
Gaming|Hasbro|Jenga Classic|1450|🪵|Friend,Sibling,kid,teen,adult
Books|Penguin|Atomic Habits by James Clear|750|📖|Friend,Colleague,Sibling
Books|Parker|Vector Ball Pen|850|🖋️|Colleague,Parent,M
Books|Lamy|Safari Ball Pen|1650|🖊️|Colleague,Partner
Music|JBL|Go Essential Speaker|1750|🔊|Tech,Friend,Sibling
Music|Havit|H2002d Headphones|1350|🎧|Tech,Gaming,Sibling
Sports|SS|Cricket Tennis Bat|1250|🏏|M,teen,Friend,Sibling
Sports|Nivia|Football Size 5|950|⚽|M,Friend,Sibling
Sports|Yonex|Muscle Power Badminton Racquet|1350|🏸|Friend,Partner
Sports|SG|Cricket Batting Gloves|1800|🏏|M,teen,Friend
Fitness|Nivia|Yoga Mat 6mm|1250|🧘|F,Friend,Partner
Fitness|Boldfit|Dumbbell Pair 5kg|1650|🏋️|M,Friend
Fitness|Boldfit|Gym Shaker Bottle|650|🧴|Friend,Colleague
Fashion|Yellow|Cotton Polo Shirt|1450|👕|M,Friend,Sibling
Fashion|Aarong|Cotton Panjabi|1850|👘|M,Wedding,Parent,Partner
Fashion|Fastrack|Sunglasses|1650|🕶️|Friend,Partner,Sibling
Fashion|Ecstasy|Cotton Kurti|1250|👚|F,Parent,Sibling,Partner
Beauty|The Body Shop|Shower Gel|1450|🛁|F,Partner
Beauty|Nivea|Gift Set|1250|🎁|Parent,Sibling
Beauty|Maybelline|Super Stay Lipstick|1150|💄|F,Friend,Sibling
Sweets|Ferrero|Rocher 16-piece Box|1850|🍬|Valentines Day,Partner,Wedding
Sweets|Lindt|Lindor Truffles Box|1450|🍫|Valentines Day,Partner
Sweets|Haribo|Gummy Party Box|650|🧸|kid,teen,Friend
Home|Philips|LED Desk Lamp|1650|💡|Graduation,Colleague
Home|Aarong|Nakshi Kantha Cushion Set|1250|🛋️|Parent
Home|Aarong|Hand-painted Photo Frame|950|🖼️|Partner,Parent
Kids|LEGO|Duplo Starter Box|1850|🧱|kid
Kids|Fisher-Price|Baby Rattle Set|950|🍼|kid
Tech|JBL|Go 3 Bluetooth Speaker|2650|🔊|Music,Friend,Sibling
Tech|Xiaomi|Smart Band 8|3990|⌚|Fitness,Partner,Friend
Tech|Anker|PowerCore 20000 Power Bank|3800|🔋|Colleague,Parent
Tech|Amazfit|Bip 3 Smartwatch|5200|⌚|Fitness,Partner,Parent
Gaming|Hasbro|Monopoly Classic|2600|🎩|Friend,Sibling,kid,teen,adult
Gaming|LEGO|Classic Large Brick Box|4800|🧱|kid,teen
Gaming|Logitech|G102 Gaming Mouse|2400|🖱️|Tech,Friend,Sibling,M
Books|Parker|Sonnet Ball Pen|3800|🖋️|Colleague,Parent,Partner,M
Books|Lamy|Safari Fountain Pen|3200|🖋️|Colleague,Friend
Books|Moleskine|Classic Notebook Large|2900|📓|Colleague,Partner,F
Music|JBL|Tune 510BT Headphones|4200|🎧|Tech,Friend,Partner,Sibling
Music|Sony|WH-CH520 Headphones|5500|🎧|Tech,Partner,Parent
Sports|SS|Ton Premium Cricket Bat|3200|🏏|M,teen,Friend,Sibling
Sports|Kookaburra|Cricket Batting Pads|3600|🏏|M,teen,Friend
Sports|Adidas|Starlancer Football|2200|⚽|M,Friend,Sibling
Sports|Nike|Brasilia Duffel Bag|3800|🎒|Fitness,Friend,Partner
Fitness|Nike|Dri-FIT Training Tee|2600|👕|Fashion,M,Friend,Partner
Fitness|Boldfit|Adjustable Dumbbell Set 10kg|3200|🏋️|M,Friend
Fitness|Puma|Softride Running Shoes|5500|👟|Sports,Fashion,Partner
Fashion|Casio|Vintage A168 Watch|3800|⌚|Partner,Friend,Parent
Fashion|Aarong|Cotton Saree|3500|🥻|F,Parent,Wedding,Partner
Fashion|Aarong|Silk Panjabi|3200|👘|M,Wedding,Parent,Partner
Beauty|The Body Shop|Gift Collection Box|3200|🎁|F,Partner,Parent
Beauty|Davidoff|Cool Water Eau de Toilette|4300|🌊|M,Partner
Sweets|Ferrero|Rocher 24-piece Box|2900|🍬|Valentines Day,Wedding,Partner
Sweets|Lindt|Excellence Gift Collection|2400|🍫|Valentines Day,Partner,Parent
Sweets|Toblerone|Giant 360g Gift Box|2250|🍫|Valentines Day,Friend
Home|Philips|Electric Kettle|2200|☕|Parent,Wedding
Home|Aarong|Nakshi Kantha Throw|3500|🛏️|Parent,Partner
Home|Yankee Candle|Large Jar Candle|4200|🕯️|Partner,F
Home|Walton|Rice Cooker 1.8L|3400|🍚|Parent,Wedding
Kids|LEGO|Creator 3-in-1 Set|2800|🧱|kid
Kids|Fisher-Price|Baby Gym Playmat|3500|🍼|kid`;
const IN=["Gaming","Books","Music","Tech","Sports","Fashion","Fitness"],AG=["kid","teen","adult","senior"],RL=["Partner","Friend","Parent","Sibling","Colleague"];
const bk=p=>p<500?0:p<2000?1:2;
const G=RAW.split("\n").map((l,i)=>{const[c,br,n,p,e,x=""]=l.split("|");const t=[],a=[],r=[],o=[...OD[c]];let g="";
x.split(",").filter(Boolean).forEach(k=>IN.includes(k)?t.push(k):AG.includes(k)?a.push(k):RL.includes(k)?r.push(k):k==="F"||k==="M"?g=k:o.push(k));
const it=["Beauty","Sweets","Home","Kids"].includes(c)?"Other":c;if(!t.includes(it))t.unshift(it);
return{id:i,c,br,n,p:+p,e,b:bk(+p),t,o:[...new Set(o)],a:a.length?a:["teen","adult"],r,g,d:n+" by "+br+". "+DS[c]+" Price is approximate."}});

/* ---- recommendation engine: scores every product against the recipient details ---- */
function sc(g,r){let s=0,w=[];
const I=g.t.filter(t=>r.int.includes(t));if(I.length){s+=3*I.length;w.push(I[0]==="Other"?"Matches their interests":"Loves "+I[0].toLowerCase())}
if(r.occ&&g.o.includes(r.occ)){s+=3;w.push("Great for "+r.occ)}
if(r.rel&&g.r.length){if(g.r.includes(r.rel)){s+=2;w.push("For your "+r.rel.toLowerCase())}else s--}
const x=r.gender==="Female"?"F":r.gender==="Male"?"M":"";if(x&&g.g){if(g.g===x){s+=2;w.push("Picked for "+(x==="F"?"her":"him"))}else s-=5}
const a=+r.age>0?(r.age<13?"kid":r.age<20?"teen":r.age<60?"adult":"senior"):"";if(a){if(g.a.includes(a)){s+=1;if(a==="kid"||a==="senior")w.push("Right for age "+r.age)}else s-=4}
return{s,w}}
const rank=(r,pool)=>pool.map(g=>({g,...sc(g,r)})).sort((a,b)=>b.s-a.s||a.g.id-b.g.id),wy=x=>x.w.slice(0,2).join(" · ");

/* ---- product picture: put your own photo at images/products/<number>.jpg, otherwise a styled tile is shown ---- */
const HUE=[270,35,210,140,250,340,160,25,190,15,300,50];
function tileSvg(id){const g=G[id];return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><ellipse cx="200" cy="238" rx="115" ry="16" fill="#000" opacity=".5"/><ellipse cx="200" cy="228" rx="98" ry="12" fill="hsl('+HUE[id%12]+' 30% 22%)"/><text x="200" y="205" font-size="120" text-anchor="middle">'+g.e+'</text><circle cx="70" cy="60" r="2.5" fill="#fff" opacity=".6"/><circle cx="330" cy="90" r="2" fill="#fff" opacity=".5"/></svg>'}
function photo(g){return '<div class="pic" style="background:radial-gradient(circle at 50% 40%,hsl('+HUE[g.id%12]+' 45% 30%),#0a0a0a)"><img src="images/products/'+(g.id+1)+'.jpg" alt="'+esc(g.n)+'" loading="lazy" onerror="this.onerror=null;this.outerHTML=tileSvg('+g.id+')"></div>'}
function giftCard(g,o={}){return '<a class="gift'+(o.h?" hz":"")+'" href="gift-details.html?id='+g.id+"&from="+(o.from||"recommendations")+'"><button class="heart" data-id="'+g.id+'" aria-label="Save to favorites">'+(Favs.has(g.id)?"♥":"♡")+"</button>"+photo(g)+'<div class="tx"><div class="m">'+esc(g.br)+"</div><h3>"+esc(g.n)+"</h3>"+(o.why?'<div class="why">'+esc(o.why)+"</div>":"")+'<div class="pr"><span class="price">'+tk(g.p)+"</span>"+(o.h?"":'<span class="m">'+Rev.avg(g.id)+"</span>")+"</div></div></a>"}
function bindHearts(box,cb){box.addEventListener("click",e=>{const b=e.target.closest(".heart");if(!b)return;e.preventDefault();e.stopPropagation();const on=Favs.toggle(+b.dataset.id);b.textContent=on?"♥":"♡";mountNav();cb&&cb()})}
