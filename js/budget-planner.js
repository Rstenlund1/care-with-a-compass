(function(){
"use strict";
/* Optional simple-center calculator. Monthly USD; food and meal-program funds are excluded. */
const KEY="cwc-budget-planner-v1";
/* Estimated median full-time center preschool weekly prices by county.
 * Source: https://paybytown.com/childcare/california/ (October 2026).
 * Based on DOL NDCP 2022 county data and publisher's 23.3% 2026 adjustment.
 * Estimates may be modeled or assigned by survey zone. */
const COUNTY_WEEKLY_PRESCHOOL_2026={"Alameda":504,"Alpine":207,"Amador":179,"Butte":221,"Calaveras":200,"Colusa":188,"Contra Costa":469,"Del Norte":183,"El Dorado":281,"Fresno":250,"Glenn":186,"Humboldt":236,"Imperial":199,"Inyo":217,"Kern":210,"Kings":188,"Lake":200,"Lassen":183,"Los Angeles":277,"Madera":192,"Marin":534,"Mariposa":188,"Mendocino":207,"Merced":204,"Modoc":183,"Mono":349,"Monterey":244,"Napa":294,"Nevada":248,"Orange":313,"Placer":287,"Plumas":183,"Riverside":233,"Sacramento":321,"San Benito":313,"San Bernardino":213,"San Diego":299,"San Francisco":588,"San Joaquin":228,"San Luis Obispo":336,"San Mateo":539,"Santa Barbara":299,"Santa Clara":506,"Santa Cruz":315,"Shasta":264,"Sierra":183,"Siskiyou":272,"Solano":263,"Sonoma":252,"Stanislaus":211,"Sutter":286,"Tehama":185,"Trinity":183,"Tulare":195,"Tuolumne":200,"Ventura":369,"Yolo":385,"Yuba":220};
const COUNTIES=Object.keys(COUNTY_WEEKLY_PRESCHOOL_2026).sort((a,b)=>a.localeCompare(b));
const CALIFORNIA_FALLBACK_MONTHLY=1202; // 2022 CA center preschool median $225/wk ×1.233 ×52/12.
function countyRateFor(county){
 const weekly=COUNTY_WEEKLY_PRESCHOOL_2026[county];
 return Number.isFinite(weekly)&&weekly>0?{monthly:Math.round(weekly*52/12),fallback:false}:{monthly:CALIFORNIA_FALLBACK_MONTHLY,fallback:true};
}

const DEFAULTS={
 students:14,tuition:923,partStudents:0,partTuition:692,county:"San Bernardino",
 staffCount:0,staffHourly:23,staffWeeklyHours:40,
 rent:0,utilities:0,insurance:0,directorSalary:6500,
 overnightNights:0,overnightFee:95
};
const KEYS=Object.keys(DEFAULTS);
function clamp(v,min=0,max=1000000){const n=Number(v);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):min;}
function rate75(full){return Math.round(clamp(full)*.75);}
function migrate(v){
 if(!v||typeof v!=="object")return {...DEFAULTS};
 if(Object.prototype.hasOwnProperty.call(v,"students")){
  const result={...DEFAULTS};
  for(const key of KEYS)if(Object.prototype.hasOwnProperty.call(v,key))result[key]=key==="county"?String(v[key]):clamp(v[key]);
  return result;
 }
 const teachers=Math.max(0,Number(v.teachersFte)||0),aides=Math.max(0,Number(v.aidesFte)||0),count=teachers+aides;
 const avgWage=count?(teachers*(Number(v.teacherWage)||0)+aides*(Number(v.aideWage)||0))/count:DEFAULTS.staffHourly;
 const rentBase=v.rentMode==="actual"?Number(v.rentActual):Number(v.sqft)*(Number(v.rateOverride)>0?Number(v.rateOverride):1.77);
 const rentExtra=v.rentMode==="actual"?Number(v.leaseExtras)||0:(Number(v.sqft)||0)*(Number(v.nnnSqft)||0);
 const result={...DEFAULTS,
  students:clamp(v.fullChildren??DEFAULTS.students),tuition:clamp(v.fullTuition??DEFAULTS.tuition),county:"San Bernardino",
  partStudents:clamp(v.partChildren??0),partTuition:clamp(v.partTuition??DEFAULTS.partTuition),
  staffCount:count||DEFAULTS.staffCount,staffHourly:avgWage||DEFAULTS.staffHourly,
  staffWeeklyHours:clamp(v.weeklyHours??40),rent:Math.max(0,(rentBase||0)+rentExtra),
  insurance:clamp(v.insurance??0),
  utilities:Math.max(0,(rentBase||0)*(Number(v.utilitiesPct)||0)/100),
  directorSalary:clamp(v.directorSalary??DEFAULTS.directorSalary),
  overnightNights:Math.max(0,(Number(v.nightChildren)||0)*(Number(v.nightsPerChild)||0)),
  overnightFee:clamp(v.nightPrice??95)
 };
 return result;
}
function load(){
 try{
  const saved=JSON.parse(localStorage.getItem(KEY)||"null");
  if(saved&&typeof saved==="object"){
   // Never convert a previously untouched example into a real user expense assumption.
   if(!saved.touched)return {values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false};
   const values=migrate(saved.values),old=saved.values||{};
   const partLinked=typeof saved.partLinked==="boolean"?saved.partLinked:(Number(old.partStudents??old.partChildren??0)===0 && Number(old.partTuition??1000)===1000);
   if(partLinked)values.partTuition=rate75(values.tuition);
   return {values,touched:true,partLinked,tuitionManual:typeof saved.tuitionManual==="boolean"?saved.tuitionManual:true};
  }
 }catch(_){}
 return {values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false};
}
let state=load();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(_){}}
function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function cash(n){return (n<0?"−":"")+"$"+Math.abs(Math.round(n)).toLocaleString("en-US");}
function val(key){return clamp(state.values[key]);}
function calculate(){
 const full=val("students"),part=val("partStudents"),night=val("overnightNights");
 const fullIncome=full*val("tuition"),partIncome=part*val("partTuition"),nightIncome=night*val("overnightFee");
 const revenue=fullIncome+partIncome+nightIncome;
 const staffPayroll=val("staffCount")*val("staffWeeklyHours")*52/12*val("staffHourly");
 const director=val("directorSalary"),rent=val("rent"),utilities=val("utilities"),insurance=val("insurance");
 const expenses=staffPayroll+director+rent+utilities+insurance;
 const surplus=revenue-expenses;
 // Break-even tuition adjusts only the full-time rate. Part-time and overnight revenue stay fixed.
 const tuitionRequired=full>0?Math.max(0,(expenses-partIncome-nightIncome)/full):null;
 return {full,part,night,revenue,expenses,surplus,tuitionRequired,staffPayroll,director,rent,utilities,insurance};
}
function countyRateNote(county,manual){
 const info=countyRateFor(county);
 const first=manual?"Custom tuition entered. Choosing a county loads its benchmark.":(info.fallback?"No county price: California reference ":""+esc(county)+" County estimated median: ")+cash(info.monthly)+"/month.";
 return '<span>'+first+'</span> <a href="https://paybytown.com/childcare/california/" target="_blank" rel="noopener noreferrer">County data</a> <span class="budget-county-method">2026 estimate based on DOL 2022 median full-time preschool center prices; some figures modeled. <a href="https://scrillischool.net/guides/preschool-and-daycare-cost/" target="_blank" rel="noopener noreferrer">Statewide fallback source</a>.</span>';
}
function field(key,label,step=1){
 return '<label class="budget-compact-field"><span>'+esc(label)+'</span><input type="number" data-budget-key="'+key+'" inputmode="decimal" min="0" max="1000000" step="'+step+'" value="'+esc(state.values[key])+'"></label>';
}
function breakdown(c){
 const line=(name,n)=>'<div><dt>'+esc(name)+'</dt><dd>'+cash(n)+'</dd></div>';
 return '<details class="budget-breakdown"><summary>Monthly expense breakdown</summary><dl>'+
  line("Classroom staff",c.staffPayroll)+line("Director salary",c.director)+line("Rent",c.rent)+
  line("Utilities",c.utilities)+line("Insurance",c.insurance)+'</dl></details>';
}
function view(){
 const c=calculate(),county=state.values.county||"San Bernardino";
 return '<section class="budget-compact" id="cwc-budget" aria-label="Tuition and expenses calculator">'+
 '<div class="budget-mobile-strip" aria-label="Live monthly summary">'+
 '<span>Revenue<strong id="b-mobile-income">'+cash(c.revenue)+'</strong></span>'+
 '<span>Expenses<strong id="b-mobile-expenses">'+cash(c.expenses)+'</strong></span>'+
 '<span>Surplus<strong id="b-mobile-profit">'+cash(c.surplus)+'</strong></span></div>'+
 '<div class="budget-compact-editor">'+
 '<div class="budget-compact-heading"><h3>Will the center support your goals?</h3><p>Choose a county to prefill an editable tuition estimate. Results update as you type.</p></div>'+
 '<label class="budget-compact-field budget-county-selector"><span>California county</span><select data-budget-key="county">'+COUNTIES.map(name=>'<option value="'+esc(name)+'"'+(name===county?' selected':'')+'>'+esc(name)+' County</option>').join("")+'</select></label>'+
 '<p id="budget-county-source" class="budget-county-source">'+countyRateNote(county,state.tuitionManual)+'</p>'+
 '<div class="budget-enrollment-pair">'+
 '<div class="budget-enrollment-group"><h4>Full-time</h4>'+field("students","Children")+field("tuition","Monthly tuition ($)",25)+'</div>'+
 '<div class="budget-enrollment-group"><h4>Part-time</h4>'+field("partStudents","Children")+field("partTuition","Monthly tuition ($)",25)+
 '<small>Starts at 75% of full-time tuition. You can change it.</small></div></div>'+
 '<div class="budget-director-first">'+field("directorSalary","Director monthly salary ($)",100)+'</div>'+
 '<div class="budget-compact-fields">'+
 field("staffCount","Additional classroom staff (FTE, excluding director)",.25)+
 field("staffHourly","Hourly staff pay ($)",.5)+
 field("staffWeeklyHours","Paid hours per staff / week")+
 field("rent","Monthly rent ($)",50)+
 field("utilities","Monthly utilities ($)",25)+
 field("insurance","Monthly insurance ($)",25)+
 '</div>'+
 '<details class="budget-compact-extra"><summary>Optional overnight revenue'+(val("overnightNights")?" (included in totals)":"")+'</summary>'+
 '<div class="budget-compact-fields">'+field("overnightNights","Overnight stays / month")+field("overnightFee","Fee per stay ($)",5)+'</div>'+
 '<p class="budget-smallprint">If overnight care requires additional paid staff, increase your staffing estimate accordingly. This simplified calculator does not automatically add night shifts.</p></details>'+
 '<div class="budget-compact-footer"><button type="button" class="btn outline" data-budget-reset="1">Restore example figures</button>'+
 '<p>Food and meal-program costs and reimbursements are excluded. This is an illustrative budget, not a licensing determination.</p></div></div>'+
 '<aside class="budget-compact-live" aria-label="Live monthly financial results"><div class="kicker">Monthly results</div>'+
 '<div class="budget-compact-numbergrid" aria-live="polite">'+
 '<div><span>Revenue</span><strong id="b-income">'+cash(c.revenue)+'</strong></div>'+
 '<div><span>Expenses including director pay</span><strong id="b-expenses">'+cash(c.expenses)+'</strong></div>'+
 '<div class="budget-surplus"><span>Surplus / shortfall</span><strong id="b-profit">'+cash(c.surplus)+'</strong></div>'+
 '<div class="budget-goal-result"><span>Break-even full-time tuition</span><strong id="b-tuition">'+(c.tuitionRequired==null?"Add full-time children":cash(c.tuitionRequired)+"/child")+'</strong></div></div>'+
 '<div id="b-verdict" class="budget-compact-verdict">'+(c.surplus<0?"Current numbers show an operating shortfall.":"Current numbers show an operating surplus.")+'</div>'+
 '<div id="b-breakdown">'+breakdown(c)+'</div>'+
 '<p class="budget-smallprint">Break-even tuition covers the listed expenses, including your director salary, with no extra profit target. Part-time and overnight revenue are held constant. Payroll taxes and benefits, meals, taxes, and unlisted expenses are not modeled.</p>'+
 '</aside></section>';
}
function update(){
 if(!document.getElementById("cwc-budget"))return;
 const c=calculate(),entries={
 "b-income":cash(c.revenue),"b-expenses":cash(c.expenses),"b-profit":cash(c.surplus),
 "b-mobile-income":cash(c.revenue),"b-mobile-expenses":cash(c.expenses),"b-mobile-profit":cash(c.surplus),
 "b-tuition":c.tuitionRequired==null?"Add full-time children":cash(c.tuitionRequired)+"/child"
 };
 for(const [id,text] of Object.entries(entries)){const node=document.getElementById(id);if(node)node.textContent=text;}
 const banner=document.getElementById("b-verdict");
 if(banner)banner.textContent=c.surplus<0?"Current numbers show an operating shortfall.":"Current numbers show an operating surplus.";
 const source=document.getElementById("budget-county-source");if(source)source.innerHTML=countyRateNote(state.values.county,state.tuitionManual);
 const el=document.getElementById("b-breakdown");
 if(el){const open=!!el.querySelector("details")?.open;el.innerHTML=breakdown(c);const details=el.querySelector("details");if(details)details.open=open;}
}
function updateField(input){
 const key=input.dataset.budgetKey;
 if(!Object.prototype.hasOwnProperty.call(DEFAULTS,key))return;
 if(key==="county"){
  state.values.county=String(input.value);
  state.values.tuition=countyRateFor(state.values.county).monthly;
  state.tuitionManual=false;
  const full=document.querySelector('[data-budget-key="tuition"]');if(full)full.value=state.values.tuition;
 }else state.values[key]=clamp(input.value);
 if(key==="tuition")state.tuitionManual=true;
 if(key==="partTuition")state.partLinked=false;
 if((key==="tuition"||key==="county")&&state.partLinked){
  state.values.partTuition=rate75(state.values.tuition);
  const node=document.querySelector('[data-budget-key="partTuition"]');
  if(node)node.value=state.values.partTuition;
 }
 state.touched=true;persist();update();
 document.dispatchEvent(new Event("cwc-budget-changed"));
}
document.addEventListener("input",e=>{
 if(e.target?.dataset?.budgetKey&&e.target.tagName==="INPUT")updateField(e.target);
});
document.addEventListener("change",e=>{
 if(e.target?.dataset?.budgetKey&&(e.target.tagName==="INPUT"||e.target.tagName==="SELECT"))updateField(e.target);
});
document.addEventListener("click",e=>{
 const reset=e.target.closest("[data-budget-reset]");
 if(!reset)return;
 state={values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false};persist();
 const node=document.getElementById("cwc-budget");
 if(node)node.outerHTML=view();
 document.dispatchEvent(new Event("cwc-budget-changed"));
});
function reset(){state={values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false};persist();}
function goalHeader(){return "";} // Old callers can safely omit this preamble.
function loadBenchmarks(){return undefined;}
function countyRate(){return countyRateFor(state.values.county);}
window.CWC_BUDGET={view,goalHeader,calculate,update,touched:()=>state.touched,reset,loadBenchmarks,countyRate};
})();