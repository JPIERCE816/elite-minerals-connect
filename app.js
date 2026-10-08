const demoMembers=[
{name:"Samantha K.",role:"Buyer",location:"Durban, KZN",interests:["Palladium","Rhodium","Platinum Group Metals"]},
{name:"Jason M.",role:"Seller",location:"Pietermaritzburg, KZN",interests:["Coltan","Tantalum","Mineral Trading"]},
{name:"Taryn L.",role:"Service Provider",location:"Durban, KZN",interests:["Logistics","Documentation","Trade Support"]},
{name:"Michael R.",role:"Seller",location:"Pinetown, KZN",interests:["Farming","Mining","Vehicles"]},
{name:"Chantelle B.",role:"Buyer",location:"Ballito, KZN",interests:["Gold","Chrome","Rare Earth Elements"]},
{name:"Ryan D.",role:"Broker",location:"Cape Town, WC",interests:["Business","PGM","Motorsport"]},
{name:"Thabo Ndlovu",role:"Seller",location:"Johannesburg, GP",interests:["Chrome","Manganese","Logistics"]}
];
const extra=JSON.parse(localStorage.getItem("emc_demo_members")||"[]");
const members=[...extra,...demoMembers];
const cards=document.getElementById("cards");
const search=document.getElementById("search"), commodity=document.getElementById("commodity"), role=document.getElementById("role");
const allCom=[...new Set(members.flatMap(m=>m.interests))].sort();
allCom.forEach(x=>commodity.insertAdjacentHTML("beforeend",`<option>${x}</option>`));
function initials(n){return n.split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase()}
function render(){
 const q=search.value.toLowerCase(), c=commodity.value.toLowerCase(), r=role.value.toLowerCase();
 const filtered=members.filter(m=>(!q||JSON.stringify(m).toLowerCase().includes(q))&&(!c||m.interests.some(i=>i.toLowerCase()===c))&&(!r||m.role.toLowerCase()===r));
 cards.innerHTML=filtered.map(m=>`<article class="card"><div class="avatar">${initials(m.name)}</div><div><h3>${m.name}</h3><div class="meta">${m.role} &nbsp;|&nbsp; ${m.location}</div><div class="chips">${m.interests.map(i=>`<span class="chip">${i}</span>`).join("")}</div></div><div class="contact"><strong>🔒 Contact details protected</strong>Connect in the full member system</div></article>`).join("")||"<p>No matching members found.</p>";
}
[search,commodity,role].forEach(x=>x.addEventListener("input",render));
render();

document.querySelectorAll(".nav").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));
 document.getElementById(btn.dataset.view).classList.add("active-view");
}));
const modal=document.getElementById("modal");
document.getElementById("joinBtn").onclick=()=>modal.classList.add("show");
document.getElementById("addBtn").onclick=()=>modal.classList.add("show");
document.getElementById("close").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
document.getElementById("memberForm").onsubmit=e=>{
 e.preventDefault();const f=new FormData(e.target);
 const m={name:f.get("name"),role:f.get("role"),location:f.get("location"),interests:f.get("interests").split(",").map(x=>x.trim()).filter(Boolean)};
 extra.unshift(m);localStorage.setItem("emc_demo_members",JSON.stringify(extra));location.reload();
};
document.getElementById("commodityGrid").innerHTML=allCom.map(x=>`<div><strong>${x}</strong><br><small>Browse members interested in this commodity.</small></div>`).join("");
