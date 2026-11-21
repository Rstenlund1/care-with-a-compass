(function(){
"use strict";
/* Budget & Tuition Planner. All monetary values are monthly USD unless stated. */
const KEY="cwc-budget-planner-v1";
const COUNTIES="Alameda|Alpine|Amador|Butte|Calaveras|Colusa|Contra Costa|Del Norte|El Dorado|Fresno|Glenn|Humboldt|Imperial|Inyo|Kern|Kings|Lake|Lassen|Los Angeles|Madera|Marin|Mariposa|Mendocino|Merced|Modoc|Mono|Monterey|Napa|Nevada|Orange|Placer|Plumas|Riverside|Sacramento|San Benito|San Bernardino|San Diego|San Francisco|San Joaquin|San Luis Obispo|San Mateo|Santa Barbara|Santa Clara|Santa Cruz|Shasta|Sierra|Siskiyou|Solano|Sonoma|Stanislaus|Sutter|Tehama|Trinity|Tulare|Tuolumne|Ventura|Yolo|Yuba".split("|");
const DEFAULTS={
 mode:"example",county:"San Bernardino",rentMode:"area",sqft:2400,rateOverride:0,rentActual:4200,leaseExtras:0,nnnSqft:.35,
 capacity:24,fullChildren:14,fullTuition:1300,partChildren:4,partTuition:1000,
 nightChildren:2,nightsPerChild:12,nightPrice:95,extraNightHours:0,
 respiteHours:40,respiteRate:30,otherRevenue:0,
 teachersFte:3,teacherWage:24,aidesFte:1,aideWage:20,weeklyHours:40,payrollBurden:22,
 directorSalary:6500,utilitiesPct:15,insurance:500,foodPerChild:90,overnightSupplies:7,respiteSupplies:2,
 cleaning:300,marketing:150,incidentals:650,profitGoal:3000
};
let benchmarks={
 statewide:{monthlyRate:2.40,period:"Q3 2026",method:"Illustrative, unweighted mean of eight California retail market observations, not an official statewide rent average"},
 regions:[
 {counties:["Riverside","San Bernardino"],monthlyRate:1.77,name:"Inland Empire retail market",period:"2026 Q3",source:"CBRE",url:"https://www.cbre.com/insights/figures/inland-empire-retail-figures-q3-2026"},
 {counties:["Los Angeles"],monthlyRate:2.87,name:"Los Angeles retail market",period:"2026 Q3",source:"CBRE",url:"https://www.cbre.com/insights/figures/los-angeles-retail-figures-q3-2026"}
 ],lastReviewed:"2026-11-21"
};
let state=load();
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"null");if(x&&typeof x==="object")return {values:{...DEFAULTS,...x.values},actual:x.actual||null,touched:!!x.touched};}catch(e){}return {values:{...DEFAULTS},actual:null,touched:false};}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
function html(x){return String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function cash(n){return (n<0?"−":"")+"$"+Math.abs(Math.round(n)).toLocaleString("en-US");}
function nval(key,limit=1000000){let n=Number(state.values[key]);return Number.isFinite(n)?Math.max(0,Math.min(limit,n)):0;}
function countyRate(){
 const county=state.values.county;
 const reg=(benchmarks.regions||[]).find(v=>Array.isArray(v.counties)&&v.counties.includes(county)&&Number(v.monthlyRate)>0);
 if(reg)return {rate:Number(reg.monthlyRate),name:reg.name,period:reg.period,source:reg.source,url:reg.url,fallback:false};
 const activeRates=(benchmarks.regions||[]).map(v=>Number(v.monthlyRate)).filter(v=>Number.isFinite(v)&&v>0);
 const dynamicRate=activeRates.length?Math.round(activeRates.reduce((sum,x)=>sum+x,0)/activeRates.length*100)/100:Number(benchmarks.statewide.monthlyRate)||2.40;
 return {rate:dynamicRate,name:"California statewide planning fallback",period:benchmarks.statewide.period||"2026",source:"Unweighted mean of "+activeRates.length+" published California regional retail benchmarks; not an official statewide index",url:"",fallback:true};
}
function calculate(){
 const v=state.values,rateInfo=countyRate();
 const perSf=nval("rateOverride")>0?nval("rateOverride"):rateInfo.rate;
 const rent=v.rentMode==="actual"?nval("rentActual"):nval("sqft")*perSf;
 const leaseExtras=v.rentMode==="actual"?nval("leaseExtras"):nval("sqft")*nval("nnnSqft");
 const full=nval("fullChildren"),part=nval("partChildren"),day=full+part;
 const nights=nval("nightChildren")*nval("nightsPerChild"),nightRevenue=nights*nval("nightPrice");
 const fullRevenue=full*nval("fullTuition"),partRevenue=part*nval("partTuition");
 const respiteRevenue=nval("respiteHours")*nval("respiteRate");
 const monthlyRevenue=fullRevenue+partRevenue+nightRevenue+respiteRevenue+nval("otherRevenue");
 const monthWeeks=52/12;
 const teacherPayroll=nval("teachersFte")*nval("weeklyHours")*monthWeeks*nval("teacherWage")*(1+nval("payrollBurden")/100);
 const aidePayroll=nval("aidesFte")*nval("weeklyHours")*monthWeeks*nval("aideWage")*(1+nval("payrollBurden")/100);
 /* Extra overnight HOURS represent paid hours not already counted in regular FTEs. */
 const nightPayroll=nval("extraNightHours")*nval("teacherWage")*(1+nval("payrollBurden")/100);
 const director=nval("directorSalary"),utility=rent*nval("utilitiesPct")/100;
 const dayConsumables=day*nval("foodPerChild");
 const nightConsumables=nights*nval("overnightSupplies");
 const respiteConsumables=nval("respiteHours")*nval("respiteSupplies");
 const fixed=rent+leaseExtras+utility+nval("insurance")+nval("cleaning")+nval("marketing")+nval("incidentals")+teacherPayroll+aidePayroll+nightPayroll+director;
 const variable=dayConsumables+nightConsumables+respiteConsumables;
 const expenses=fixed+variable,profit=monthlyRevenue-expenses;
 const otherNet=nightRevenue+respiteRevenue+nval("otherRevenue")-nightConsumables-respiteConsumables;
 const avgDayFee=day>0?(fullRevenue+partRevenue)/day:0;
 const dayContribution=avgDayFee-nval("foodPerChild");
 const breakEven=dayContribution>0?Math.max(0,Math.ceil((fixed-otherNet)/dayContribution)):null;
 const targetSeats=dayContribution>0?Math.max(0,Math.ceil((fixed+nval("profitGoal")-otherNet)/dayContribution)):null;
 const tuitionNeeded=full>0?Math.max(0,(expenses+nval("profitGoal")-partRevenue-nightRevenue-respiteRevenue-nval("otherRevenue"))/full):null;
 return {v,rateInfo,perSf,rent,leaseExtras,full,part,day,nights,nightRevenue,fullRevenue,partRevenue,respiteRevenue,monthlyRevenue,teacherPayroll,aidePayroll,nightPayroll,director,utility,dayConsumables,nightConsumables,respiteConsumables,fixed,variable,expenses,profit,otherNet,breakEven,targetSeats,tuitionNeeded,margin:monthlyRevenue?profit/monthlyRevenue*100:0,preDirectorProfit:profit+director,capacity:nval("capacity")};
}
function numeric(key,label,step,help){
 const a=state.values;
 return '<label class="budget-field"><span>'+html(label)+'</span><input type="number" data-budget-key="'+html(key)+'" inputmode="decimal" min="0" step="'+(step||1)+'" value="'+html(a[key])+'">'+(help?'<small>'+html(help)+'</small>':'')+'</label>';
}
function select(key,label,options){
 const value=state.values[key];
 return '<label class="budget-field"><span>'+html(label)+'</span><select data-budget-key="'+html(key)+'">'+options.map(([a,b])=>'<option value="'+html(a)+'"'+(a===value?' selected':'')+'>'+html(b)+'</option>').join('')+'</select></label>';
}
function fieldset(title,items,open){
 return '<details class="budget-section" '+(open?'open':'')+'><summary>'+html(title)+'</summary><div class="budget-fields">'+items.join('')+'</div></details>';
}
function card(label,id,value){
 return '<div class="budget-result"><span>'+html(label)+'</span><strong id="'+id+'">'+value+'</strong></div>';
}
function breakdown(c){
 return '<details class="budget-breakdown"><summary>See where the money goes each month</summary><dl>'+
 '<div><dt>Rent, CAM/NNN and utilities</dt><dd>'+cash(c.rent+c.leaseExtras+c.utility)+'</dd></div>'+
 '<div><dt>Teacher wages, taxes and benefits</dt><dd>'+cash(c.teacherPayroll)+'</dd></div>'+
 '<div><dt>Aide wages, taxes and benefits</dt><dd>'+cash(c.aidePayroll)+'</dd></div>'+
 '<div><dt>Extra paid overnight labor</dt><dd>'+cash(c.nightPayroll)+'</dd></div>'+
 '<div><dt>Director’s desired salary</dt><dd>'+cash(c.director)+'</dd></div>'+
 '<div><dt>Insurance, food and other expenses</dt><dd>'+cash(c.expenses-c.rent-c.leaseExtras-c.utility-c.teacherPayroll-c.aidePayroll-c.nightPayroll-c.director)+'</dd></div>'+
 '</dl></details>';
}
function overview(c){
 return '<div class="budget-results" aria-live="polite">'+
 card("Total monthly income","b-income",cash(c.monthlyRevenue))+
 card("Employees: teachers and aides","b-payroll",cash(c.teacherPayroll+c.aidePayroll+c.nightPayroll))+
 card("Director's desired salary","b-director",cash(c.director))+
 card("Other operating costs","b-othercost",cash(c.expenses-c.teacherPayroll-c.aidePayroll-c.nightPayroll-c.director))+
 card("Monthly surplus after director pay","b-profit",cash(c.profit))+
 '</div><div class="budget-verdict" id="b-verdict">'+verdict(c)+'</div><div id="b-breakdown">'+breakdown(c)+'</div>';
}
function verdict(c){
 if(c.day>c.capacity)return '<strong>Capacity warning:</strong> Daytime enrollment exceeds the licensed maximum you entered. Adjust the schedule or enrollment.';
 if(c.profit<0)return '<strong>Projected shortfall.</strong> Try adjusting enrollment, rates, or expenses. Check coverage before changing staff.';
 return '<strong>Projected surplus.</strong> Check your staff schedules, occupancy assumptions, and whether the tuition is affordable locally.';
}
function sourceLine(c){
 const a=c.rateInfo;
 return 'County benchmark: '+html(a.name)+' · '+html(a.period)+' · '+html(a.source)+'. '+
 (a.fallback?'No county/regional figure was loaded, so the statewide planning fallback is used. ':'')+
 (a.url?'<a href="'+html(a.url)+'" target="_blank" rel="noopener noreferrer">Source</a>. ':'')+
 'Retail asking rent is a proxy, not an average licensed child care lease. Estimate NNN/CAM separately.';
}
function tuition(c){
 const needed=c.tuitionNeeded==null?"Add at least one full-time child":cash(c.tuitionNeeded)+" / full-time child / month";
 const breakEven=c.breakEven==null?"Not calculable":c.breakEven+" daytime children";
 const target=c.targetSeats==null?"Not calculable":c.targetSeats+" daytime children";
 return '<div class="budget-results budget-tu">>'+
 card("Full-time tuition needed for profit goal","b-tuition",needed)+
 card("Daytime enrollments to break even","b-break",breakEven)+
 card("Enrollments for target profit","b-target",target)+
 '</div><p id="b-caveat" class="budget-help">'+
 (c.breakEven!==null&&c.breakEven>c.capacity?'Warning: break-even enrollment exceeds the licensed capacity entered. ':'')+
 'Needed tuition holds other revenue and current enrollment constant. Break-even enrollment holds the current part-time/full-time mix, rates, fixed staffing and other revenue constant; actual staffing costs can increase as enrollment rises.'+
 '</p>';
}
function view(){
 const c=calculate(),v=c.v;
 const countyOpts=COUNTIES.map(x=>[x,x+" County"]);
 return '<section class="budget-page" id="cwc-budget"><div class="section-top"><div><div class="kicker">03 · Operating budget and tuition</div><h2>Can your child care business pay its bills?</h2><p>Start with example numbers or use your own. Change any number and see the monthly results.</p></div></div>'+
 '<div class="budget-top"><div class="budget-steps"><strong>What comes in?</strong><span>What goes out?</span><span>What tuition works?</span></div>'+
 overview(c)+'</div>'+
 '<div class="panel budget-form-panel"><div class="budget-choice">'+
 select("mode","Your planning numbers",[["example","Example numbers (editable)"],["actual","My real center numbers"]])+
 '<button type="button" class="btn outline" data-budget-reset="1">Restore examples</button></div>'+
 fieldset("1. Children and income",[
 numeric("capacity","Licensed simultaneous capacity",1),
 numeric("fullChildren","Full-time children",1),numeric("fullTuition","Full-time monthly tuition ($)",25),
 numeric("partChildren","Part-time children",1),numeric("partTuition","Part-time monthly tuition ($)",25),
 numeric("nightChildren","Overnight-only children",1),numeric("nightsPerChild","Nights per child per month",1),
 numeric("nightPrice","Price per overnight stay ($)",5),
 numeric("respiteHours","Respite hours billed each month",1),numeric("respiteRate","Respite hourly rate ($)",1),
 numeric("otherRevenue","Other center revenue each month ($)",25)
 ],true)+
 fieldset("2. Teachers, aides, and director pay",[
 numeric("teachersFte","Teachers (full-time equivalents)",.25),numeric("teacherWage","Teacher hourly wage ($)",.5),
 numeric("aidesFte","Aides (full-time equivalents)",.25),numeric("aideWage","Aide hourly wage ($)",.5),
 numeric("weeklyHours","Weekly paid hours per full-time position",1),
 numeric("payrollBurden","Benefits and payroll taxes (%)",1),
 numeric("directorSalary","Director’s desired monthly salary ($)",100,"Separate from staff wages and business profit."),
 numeric("extraNightHours","Additional overnight paid staff hours per month",1,"Enter 0 only if qualified, paid overnight supervision is already included in the positions above.")
 ],true)+
 fieldset("3. Rent and building expenses",[
 select("county","California county",countyOpts),
 select("rentMode","How to calculate rent",[["area","Estimate by square footage"],["actual","Enter actual monthly rent"]]),
 (v.rentMode==="area"?numeric("sqft","Building square footage",100)+'<label class="budget-field budget-square-slider"><span>Drag to change building size</span><input type="range" data-budget-key="sqft" min="500" max="50000" step="100" value="'+html(v.sqft)+'"></label>'+numeric("rateOverride","Your own rent rate ($/sq. ft./month; 0 = county benchmark)",.01)+numeric("nnnSqft","Extra CAM/NNN charges ($/sq. ft./month)",.05):
 numeric("rentActual","Actual monthly base rent ($)",100)+numeric("leaseExtras","Extra monthly lease charges ($)",25)),
 numeric("utilitiesPct","Utilities (% of base rent)",1),numeric("insurance","Insurance each month ($)",25)
 ],false)+
 '<p id="b-rentsource" class="budget-source">'+sourceLine(c)+'</p>'+
 fieldset("4. Food and other operating expenses",[
 numeric("foodPerChild","Daytime food and supplies per child/month ($)",5),
 numeric("overnightSupplies","Overnight consumables per night ($)",1),
 numeric("respiteSupplies","Respite consumables per billed hour ($)",1),
 numeric("cleaning","Cleaning per month ($)",25),
 numeric("marketing","Marketing per month ($)",25),
 numeric("incidentals","Other overhead, upkeep, incidentals ($)",25)
 ],false)+
 '</div>'+
 '<section class="panel budget-tuition"><h3>5. Tuition planner</h3><p>What would you need to charge to cover your costs, pay the director, and earn a sustainable operating profit?</p>'+
 '<div class="budget-fields">'+numeric("profitGoal","Desired monthly business profit after paying director ($)",100)+'</div>'+
 tuition(c)+
 '<p class="budget-help"><strong>Director pay is not the same as profit.</strong> The director’s salary is included in monthly expenses before the business-profit target is calculated.</p><p class="budget-help">Overnight care may add revenue without additional payroll <em>only if the required qualified, paid staff are already scheduled and counted in the budget</em>. Sleeping children do not eliminate California supervision obligations. Check your license type, overnight approval, and staffing plan.</p>'+
 '<p class="budget-help">Illustrative planning only. Tuition affordability, subsidized/reimbursement rates, debt service, depreciation, taxes, staffing thresholds, occupancy and local rent vary. No figure here establishes regulatory compliance or a guaranteed profit.</p>'+
 '</section></section>';
}
function update(){
 const root=document.getElementById("cwc-budget");if(!root)return;
 const c=calculate();
 const vals={"b-income":cash(c.monthlyRevenue),"b-payroll":cash(c.teacherPayroll+c.aidePayroll+c.nightPayroll),
 "b-director":cash(c.director),"b-othercost":cash(c.expenses-c.teacherPayroll-c.aidePayroll-c.nightPayroll-c.director),
 "b-profit":cash(c.profit),"b-tuition":c.tuitionNeeded==null?"Add at least one full-time child":cash(c.tuitionNeeded)+" / full-time child / month",
 "b-break":c.breakEven==null?"Not calculable":c.breakEven+" daytime children",
 "b-target":c.targetSeats==null?"Not calculable":c.targetSeats+" daytime children"};
 Object.keys(vals).forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=vals[id];});
 const v=document.getElementById("b-verdict");if(v)v.innerHTML=verdict(c);
 const caveat=document.getElementById("b-caveat");
 if(caveat)caveat.textContent=(c.breakEven!==null&&c.breakEven>c.capacity?"Break-even enrollment exceeds your entered licensed capacity. ":"")+"These calculations hold current rates and staffing costs fixed while you compare possible enrollment levels.";
 const source=document.getElementById("b-rentsource");if(source)source.innerHTML=sourceLine(c);
 const detail=document.getElementById("b-breakdown");if(detail){const wasOpen=!!detail.querySelector("details")?.open;detail.innerHTML=breakdown(c);const box=detail.querySelector("details");if(box)box.open=wasOpen;}
}
function updateField(input){
 const key=input.dataset.budgetKey;if(!key||!(key in DEFAULTS))return;
 const val=input.value;
 if(key==="mode"){
  if(val==="actual"){state.values={...(state.actual||state.values),mode:"actual"};}
  else {if(state.values.mode==="actual")state.actual={...state.values};state.values={...DEFAULTS,mode:"example"};}
 }else{
  state.values[key]=typeof DEFAULTS[key]==="number"?(val===""?0:Math.max(0,Math.min(1000000,Number(val)||0))):val;
  if(state.values.mode==="actual")state.actual={...state.values};
 }
 state.touched=true;persist();
 if(key==="sqft"){document.querySelectorAll('[data-budget-key="sqft"]').forEach(el=>{if(el!==input)el.value=state.values.sqft;});}
 update();
 document.dispatchEvent(new Event("cwc-budget-changed"));
}
document.addEventListener("input",function(e){if(e.target&&e.target.dataset.budgetKey&&e.target.tagName==="INPUT")updateField(e.target);});
document.addEventListener("change",function(e){
 const el=e.target;if(!el||!el.dataset.budgetKey)return;updateField(el);
 if(el.dataset.budgetKey==="rentMode"||el.dataset.budgetKey==="mode"){const root=document.getElementById("cwc-budget");if(root){root.outerHTML=view();}}
});
document.addEventListener("click",function(e){const el=e.target.closest("[data-budget-reset]");if(!el)return;state={values:{...DEFAULTS},actual:state.actual,touched:false};persist();const root=document.getElementById("cwc-budget");if(root)root.outerHTML=view();});
function reset(){state={values:{...DEFAULTS},actual:null,touched:false};persist();}
function loadBenchmarks(){
 if(typeof fetch!=="function")return;
 fetch("data/california-budget-benchmarks.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("market data unavailable");return r.json();}).then(data=>{
 if(data&&data.statewide&&Number(data.statewide.monthlyRate)>0&&Array.isArray(data.regions)){benchmarks=data;update();}
 }).catch(()=>{});
}
window.CWC_BUDGET={view,calculate,update,touched:()=>state.touched,reset,loadBenchmarks,countyRate};
loadBenchmarks();
})();