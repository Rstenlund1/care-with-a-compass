(function(){
"use strict";
/* Compact optional operating calculator. All financial figures are monthly USD unless labelled otherwise. */
const KEY="cwc-budget-planner-v1";
const DEFAULTS={
 students:14,tuition:1300,staffCount:4,staffHourly:23,staffWeeklyHours:40,
 rent:4200,utilities:600,insurance:500,directorSalary:6500,profitGoal:3000,
 payrollBurden:22,partStudents:0,partTuition:1000,overnightNights:0,overnightFee:95,
 respiteHours:0,respiteRate:30,extraNightHours:0,includeBackup:false,backupDays:22
};
function clamp(value,min,max){const n=Number(value);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):min;}
function migrate(v){
 if(!v||typeof v!=="object")return {...DEFAULTS};
 if(Object.prototype.hasOwnProperty.call(v,"students"))return {...DEFAULTS,...v};
 const teachers=Math.max(0,Number(v.teachersFte)||0),aides=Math.max(0,Number(v.aidesFte)||0);
 const team=teachers+aides;
 const wage=team?((teachers*(Number(v.teacherWage)||0)+aides*(Number(v.aideWage)||0))/team):DEFAULTS.staffHourly;
 const oldRent=v.rentMode==="actual"?Number(v.rentActual):Number(v.sqft)*(Number(v.rateOverride)>0?Number(v.rateOverride):1.77);
 const rent=Number.isFinite(oldRent)?oldRent:DEFAULTS.rent;
 const extras=v.rentMode==="actual"?Number(v.leaseExtras)||0:(Number(v.sqft)||0)*(Number(v.nnnSqft)||0);
 return {
  ...DEFAULTS,students:clamp(v.fullChildren??DEFAULTS.students,0,1000),
  tuition:clamp(v.fullTuition??DEFAULTS.tuition,0,1000000),
  staffCount:team||DEFAULTS.staffCount,staffHourly:wage||DEFAULTS.staffHourly,
  staffWeeklyHours:clamp(v.weeklyHours??40,0,80),
  rent:Math.max(0,rent+extras),
  utilities:Math.max(0,rent*(Number(v.utilitiesPct)||0)/100),
  insurance:clamp(v.insurance??DEFAULTS.insurance,0,1000000),
  directorSalary:clamp(v.directorSalary??DEFAULTS.directorSalary,0,1000000),
  profitGoal:clamp(v.profitGoal??DEFAULTS.profitGoal,0,1000000),
  payrollBurden:clamp(v.payrollBurden??22,0,200),
  partStudents:clamp(v.partChildren??0,0,1000),
  partTuition:clamp(v.partTuition??1000,0,1000000),
  overnightNights:Math.max(0,(Number(v.nightChildren)||0)*(Number(v.nightsPerChild)||0)),
  overnightFee:clamp(v.nightPrice??95,0,1000000),
  respiteHours:clamp(v.respiteHours??0,0,1000000),
  respiteRate:clamp(v.respiteRate??30,0,1000000),
  extraNightHours:clamp(v.extraNightHours??0,0,1000000),
  includeBackup:v.includeCoverageCost==="yes",backupDays:clamp(v.coverageDays??22,0,31)
 };
}
function load(){
 try{
  const saved=JSON.parse(localStorage.getItem(KEY)||"null");
  if(saved&&typeof saved==="object"){if(!saved.touched&&saved.values&&!Object.prototype.hasOwnProperty.call(saved.values,"students"))return {values:{...DEFAULTS},touched:false};return {values:migrate(saved.values),touched:!!saved.touched};}
 }catch(_){}
 return {values:{...DEFAULTS},touched:false};
}
let state=load();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(_){}}
function fmt(n){return (n<0?"−":"")+"$"+Math.abs(Math.round(n)).toLocaleString("en-US");}
function escapeHtml(s){return String(s==null?"":s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function num(k){return clamp(state.values[k],0,1000000);}
function calculate(){
 const v=state.values;
 const full=num("students"),part=num("partStudents"),night=num("overnightNights"),respite=num("respiteHours");
 const revenue=full*num("tuition")+part*num("partTuition")+night*num("overnightFee")+respite*num("respiteRate");
 const staffPayroll=num("staffCount")*num("staffWeeklyHours")*(52/12)*num("staffHourly")*(1+num("payrollBurden")/100);
 const overnightPayroll=num("extraNightHours")*num("staffHourly")*(1+num("payrollBurden")/100);
 const coverage=typeof window.CWC_STAFFING==="function"?window.CWC_STAFFING():null;
 const backup=v.includeBackup&&coverage?coverage.cost*num("backupDays"):0;
 const director=num("directorSalary"),rent=num("rent"),utilities=num("utilities"),insurance=num("insurance");
 const expenses=staffPayroll+overnightPayroll+backup+director+rent+utilities+insurance;
 const surplus=revenue-expenses;
 const other=part*num("partTuition")+night*num("overnightFee")+respite*num("respiteRate");
 const goal=num("profitGoal");
 const tuitionRequired=full>0?Math.max(0,(expenses+goal-other)/full):null;
 const totalEnrollment=full+part;
 const avgTuition=totalEnrollment>0?(full*num("tuition")+part*num("partTuition"))/totalEnrollment:0;
 const breakEven=avgTuition>0?Math.ceil(Math.max(0,(expenses-(revenue-(full*num("tuition")+part*num("partTuition"))))/avgTuition)):null;
 return {revenue,expenses,surplus,tuitionRequired,breakEven,staffPayroll,overnightPayroll,backup,director,rent,utilities,insurance,goal,full,part,night,respite};
}
function field(key,title,step=1){
 const value=state.values[key];
 return '<label class="budget-compact-field"><span>'+escapeHtml(title)+'</span><input type="number" data-budget-key="'+key+'" min="0" max="1000000" step="'+step+'" inputmode="decimal" value="'+escapeHtml(value)+'"></label>';
}
function detailRow(name,val){return '<div><dt>'+name+'</dt><dd>'+fmt(val)+'</dd></div>';}
function breakdown(c){
 return '<details class="budget-breakdown"><summary>View monthly cost breakdown</summary><dl>'+
 detailRow("Classroom staff payroll",c.staffPayroll)+
 (c.overnightPayroll?detailRow("Additional overnight staffing",c.overnightPayroll):"")+
 (c.backup?detailRow("Extra backup shifts",c.backup):"")+
 detailRow("Director salary",c.director)+
 detailRow("Rent",c.rent)+
 detailRow("Utilities",c.utilities)+
 detailRow("Insurance",c.insurance)+
 '</dl></details>';
}
function view(){
 const c=calculate(),v=state.values;
 return '<section class="budget-compact" id="cwc-budget" aria-label="Tuition and expenses calculator">'+
 '<div class="budget-mobile-strip" aria-label="Live monthly summary"><span>Revenue<strong id="b-mobile-income">'+fmt(c.revenue)+'</strong></span><span>Expenses<strong id="b-mobile-expenses">'+fmt(c.expenses)+'</strong></span><span>Surplus<strong id="b-mobile-profit">'+fmt(c.surplus)+'</strong></span></div>'+
 '<div class="budget-compact-editor">'+
 '<div class="budget-compact-heading"><h3>Tuition &amp; expenses</h3><p>Change any number. Results update as you type.</p></div>'+
 '<div class="budget-compact-fields">'+
 field("students","Full-time children")+
 field("tuition","Monthly tuition per child ($)",25)+
 field("staffCount","Classroom staff (FTE)",.25)+
 field("staffHourly","Hourly staff pay ($)",.5)+
 field("staffWeeklyHours","Paid hours per staff member / week")+
 field("rent","Monthly rent ($)",50)+
 field("utilities","Monthly utilities ($)",25)+
 field("insurance","Monthly insurance ($)",25)+
 field("directorSalary","Director monthly salary ($)",100)+
 field("profitGoal","Monthly profit goal ($)",100)+
 '</div>'+
 '<details class="budget-compact-extra"><summary>Additional care revenue and payroll settings'+(v.partStudents||v.overnightNights||v.respiteHours?' (included in totals)':'')+'</summary>'+
 '<div class="budget-compact-fields">'+
 field("partStudents","Part-time children")+
 field("partTuition","Monthly part-time tuition ($)",25)+
 field("overnightNights","Overnight stays per month")+
 field("overnightFee","Fee per overnight stay ($)",5)+
 field("respiteHours","Respite billable hours per month")+
 field("respiteRate","Respite hourly fee ($)")+
 field("payrollBurden","Payroll taxes and benefits (%)")+
 field("extraNightHours","Additional overnight staff hours / month")+
 field("backupDays","Days per month of extra backup coverage")+
 '</div><label class="budget-compact-check"><input type="checkbox" data-budget-key="includeBackup" '+(v.includeBackup?"checked":"")+'><span>Include optional backup-shift costs from the staffing example</span></label>'+
 '<p class="budget-smallprint">Backup costs are excluded unless selected. Avoid counting the same shifts twice.</p></details>'+
 '<div class="budget-compact-footer"><button type="button" class="btn outline" data-budget-reset="1">Restore example figures</button><p>Food and meal-program costs or reimbursements are outside this tuition model. Staffing and supervision rules depend on the program.</p></div>'+
 '</div>'+
 '<aside class="budget-compact-live" aria-label="Live monthly financial results">'+
 '<div class="kicker">Monthly results</div>'+
 '<div class="budget-compact-numbergrid" aria-live="polite">'+
 '<div><span>Revenue</span><strong id="b-income">'+fmt(c.revenue)+'</strong></div>'+
 '<div><span>Expenses, including director pay</span><strong id="b-expenses">'+fmt(c.expenses)+'</strong></div>'+
 '<div class="budget-surplus"><span>Surplus / shortfall</span><strong id="b-profit">'+fmt(c.surplus)+'</strong></div>'+
 '<div class="budget-goal-result"><span>Tuition to reach profit goal</span><strong id="b-tuition">'+(c.tuitionRequired==null?"Add full-time enrollment":fmt(c.tuitionRequired)+"/child")+'</strong></div>'+
 '</div>'+
 '<div id="b-verdict" class="budget-compact-verdict">'+(c.surplus<0?"Current numbers show an operating shortfall.":"Current numbers show an operating surplus.")+'</div>'+
 '<p class="budget-compact-substat">Approx. full-time-equivalent break-even enrollment: <strong id="b-break">'+(c.breakEven==null?"Not calculable":String(c.breakEven))+'</strong></p>'+
 '<div id="b-breakdown">'+breakdown(c)+'</div>'+
 '<p class="budget-smallprint">Tuition assumes current attendance and other care fees. Enrollment estimates hold staffing costs and the current tuition mix fixed. Planning estimates, not a licensing or financial guarantee.</p>'+
 '</aside></section>';
}
function update(){
 if(!document.getElementById("cwc-budget"))return;
 const c=calculate(),values={
  "b-income":fmt(c.revenue),"b-expenses":fmt(c.expenses),"b-profit":fmt(c.surplus),
  "b-mobile-income":fmt(c.revenue),"b-mobile-expenses":fmt(c.expenses),"b-mobile-profit":fmt(c.surplus),
  "b-tuition":c.tuitionRequired==null?"Add full-time enrollment":fmt(c.tuitionRequired)+"/child",
  "b-break":c.breakEven==null?"Not calculable":String(c.breakEven)
 };
 for(const [id,value] of Object.entries(values)){const el=document.getElementById(id);if(el)el.textContent=value;}
 const banner=document.getElementById("b-verdict");if(banner)banner.textContent=c.surplus<0?"Current numbers show an operating shortfall.":"Current numbers show an operating surplus.";
 const details=document.getElementById("b-breakdown");
 if(details){
  const open=!!details.querySelector("details")?.open;
  details.innerHTML=breakdown(c);
  const pane=details.querySelector("details");
  if(pane)pane.open=open;
 }
}
function updateField(input){
 const key=input.dataset.budgetKey;
 if(!Object.prototype.hasOwnProperty.call(DEFAULTS,key))return;
 state.values[key]=key==="includeBackup"?!!input.checked:clamp(input.value,0,1000000);
 state.touched=true;
 persist();
 update();
 document.dispatchEvent(new Event("cwc-budget-changed"));
}
document.addEventListener("input",e=>{
 if(e.target&&e.target.dataset?.budgetKey&&e.target.type!=="checkbox")updateField(e.target);
});
document.addEventListener("change",e=>{
 if(e.target&&e.target.dataset?.budgetKey)updateField(e.target);
});
document.addEventListener("click",e=>{
 const btn=e.target.closest("[data-budget-reset]");
 if(!btn)return;
 state={values:{...DEFAULTS},touched:false};persist();
 const root=document.getElementById("cwc-budget");
 if(root)root.outerHTML=view();
 document.dispatchEvent(new Event("cwc-budget-changed"));
});
function reset(){state={values:{...DEFAULTS},touched:false};persist();}
function goalHeader(){return "";}
function loadBenchmarks(){return undefined;}
function countyRate(){return null;}
window.CWC_BUDGET={view,goalHeader,calculate,update,touched:()=>state.touched,reset,loadBenchmarks,countyRate};
})();