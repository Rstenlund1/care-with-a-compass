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


/* Estimated 2026 county weekly rates, from PayByTown's DOL NDCP 2022 data
 * adjusted using a 23.3% day-care price index. Array values:
 * [center infant, family infant, family preschool]. Center preschool
 * rates are already in COUNTY_WEEKLY_PRESCHOOL_2026.
 * https://paybytown.com/childcare/california/ (updated Oct 18, 2026).
 */
const COUNTY_WEEKLY_EXTRA_2026={"Alameda":[636,445,426],"Alpine":[439,249,246],"Amador":[290,266,239],"Butte":[437,359,277],"Calaveras":[359,301,254],"Colusa":[327,296,254],"Contra Costa":[594,393,394],"Del Norte":[277,284,241],"El Dorado":[555,459,354],"Fresno":[513,364,288],"Glenn":[294,260,221],"Humboldt":[452,312,252],"Imperial":[274,234,222],"Inyo":[445,307,252],"Kern":[435,293,235],"Kings":[321,269,224],"Lake":[322,286,240],"Lassen":[277,284,240],"Los Angeles":[317,351,273],"Madera":[409,291,241],"Marin":[676,484,502],"Mariposa":[314,286,241],"Mendocino":[343,296,247],"Merced":[302,285,235],"Modoc":[277,253,219],"Mono":[456,364,321],"Monterey":[497,393,313],"Napa":[465,324,309],"Nevada":[391,269,255],"Orange":[486,370,345],"Placer":[554,480,382],"Plumas":[277,284,240],"Riverside":[499,285,251],"Sacramento":[428,298,252],"San Benito":[476,292,291],"San Bernardino":[474,334,276],"San Diego":[468,309,294],"San Francisco":[748,488,505],"San Joaquin":[477,405,319],"San Luis Obispo":[446,303,264],"San Mateo":[684,462,488],"Santa Barbara":[558,448,353],"Santa Clara":[650,445,427],"Santa Cruz":[588,503,387],"Shasta":[306,257,219],"Sierra":[277,253,219],"Siskiyou":[327,236,240],"Solano":[522,452,351],"Sonoma":[300,353,275],"Stanislaus":[390,375,299],"Sutter":[378,271,235],"Tehama":[291,273,225],"Trinity":[277,299,244],"Tulare":[296,304,254],"Tuolumne":[332,297,256],"Ventura":[524,323,323],"Yolo":[478,321,277],"Yuba":[450,337,277]};
const PROGRAM_TYPES=[
 ["small","Small Family Child Care Home"],
 ["large","Large Family Child Care Home"],
 ["preschool","Preschool Center"]
];
function programType(){return PROGRAM_TYPES.some(([id])=>id===state.values.programType)?state.values.programType:"small";}
function countyRates(name,type){
 const e=COUNTY_WEEKLY_EXTRA_2026[name],preschool=COUNTY_WEEKLY_PRESCHOOL_2026[name],center=type==="preschool";
 const childWeekly=center?preschool:e?.[2];
 const infantWeekly=center?e?.[0]:e?.[1];
 return {child:Math.round((Number(childWeekly)||CALIFORNIA_FALLBACK_MONTHLY*12/52)*52/12),
         infant:Math.round((Number(infantWeekly)||CALIFORNIA_FALLBACK_MONTHLY*12/52)*52/12),
         inferred:!(childWeekly>0&&infantWeekly>0)};
}
/* Conservative budget staffing. Home ratios are not a universal staff-child formula.
 * Family care: Title 22 CCR 102416.5.
 * Preschool 1:12: 22 CCR 101216.3; infant 1:4: 101416.5.
 * This assumes the director is authorized, qualified, and available to work
 * with ONE group, not simultaneously supervise two separate age groups.
 */
function programRule(type,older,infants){
 const n=older+infants,small=type==="small",large=type==="large";
 if(small){
  const onlyInfants=older===0&&infants<=4;
  const beyond6=n>6;
  const tooMany=n>8||(n>6&&infants>2)||(n<=6&&infants>3&&!onlyInfants);
  return {required:n?1:0,additional:beyond6?1:0,limit:8,needsSpecial:beyond6&&n<=8,invalid:tooMany,infantLimit:onlyInfants?4:n>6?2:3,rule:"Small family home: 4 infants only; or up to 6 children with no more than 3 infants. Seven or eight require qualifying school-age children and other conditions; adding staff does not waive those rules."};
 }
 if(large){
  const assistantNeeded=n>6||(infants>3&&older>0);
  const invalid=n>14||(n>12&&infants>3)||(n<=12&&infants>4);
  return {required:n?(assistantNeeded?2:1):0,additional:assistantNeeded?1:0,limit:14,needsSpecial:n>12&&n<=14,invalid,infantLimit:n>12?3:4,rule:"Large family home: up to 12 with an assistant and no more than 4 infants, or 13–14 only with qualifying school-age children and no more than 3 infants. Without an assistant, small-home limits apply."};
 }
 const infantNeeded=Math.ceil(infants/4),olderNeeded=Math.ceil(older/12),required=infantNeeded+olderNeeded;
 return {required,additional:Math.max(0,required-1),limit:null,needsSpecial:infants>0,invalid:false,infantLimit:null,rule:"Preschool center: one qualified teacher per 12 preschool-age children; infant groups require one qualified infant-care teacher per 4 infants and an authorized infant-care component. Two-year-old toddler groups may have different requirements. The director counts in only one group when properly qualified and working directly with those children."};
}

const DEFAULTS={
 students:1,tuition:1196,partStudents:0,partTuition:897,county:"San Bernardino",programType:"small",
 infantFull:0,infantPart:0,infantTuition:1447,infantPartTuition:1085,
 staffCount:0,staffHourly:23,staffWeeklyHours:40,
 rent:0,utilities:0,insurance:0,directorSalary:6500,
 overnightNights:0,overnightFee:95,staffUnavailable:"none"
};
const KEYS=Object.keys(DEFAULTS);
function clamp(v,min=0,max=1000000){const n=Number(v);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):min;}
function rate75(full){return Math.round(clamp(full)*.75);}
function migrate(v){
 if(!v||typeof v!=="object")return {...DEFAULTS};
 if(Object.prototype.hasOwnProperty.call(v,"students")){
  const result={...DEFAULTS};
  for(const key of KEYS)if(Object.prototype.hasOwnProperty.call(v,key))result[key]=(key==="county"||key==="staffUnavailable"||key==="programType")?String(v[key]):clamp(v[key]);
  return result;
 }
 const teachers=Math.max(0,Number(v.teachersFte)||0),aides=Math.max(0,Number(v.aidesFte)||0),count=teachers+aides;
 const avgWage=count?(teachers*(Number(v.teacherWage)||0)+aides*(Number(v.aideWage)||0))/count:DEFAULTS.staffHourly;
 const rentBase=v.rentMode==="actual"?Number(v.rentActual):Number(v.sqft)*(Number(v.rateOverride)>0?Number(v.rateOverride):1.77);
 const rentExtra=v.rentMode==="actual"?Number(v.leaseExtras)||0:(Number(v.sqft)||0)*(Number(v.nnnSqft)||0);
 const result={...DEFAULTS,
  students:clamp(v.fullChildren??DEFAULTS.students),tuition:clamp(v.fullTuition??DEFAULTS.tuition),county:"San Bernardino",
  partStudents:clamp(v.partChildren??0),partTuition:clamp(v.partTuition??DEFAULTS.partTuition),programType:"small",
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
   if(!saved.touched)return {values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false,infantPartLinked:true,infantManual:false};
   const values=migrate(saved.values),old=saved.values||{};
   const partLinked=typeof saved.partLinked==="boolean"?saved.partLinked:(Number(old.partStudents??old.partChildren??0)===0 && Number(old.partTuition??1000)===1000);
   if(partLinked)values.partTuition=rate75(values.tuition);
   return {values,touched:true,partLinked,tuitionManual:typeof saved.tuitionManual==="boolean"?saved.tuitionManual:true,infantPartLinked:saved.infantPartLinked!==false,infantManual:!!saved.infantManual};
  }
 }catch(_){}
 return {values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false,infantPartLinked:true,infantManual:false};
}
let state=load();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(_){}}
function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function cash(n){return (n<0?"−":"")+"$"+Math.abs(Math.round(n)).toLocaleString("en-US");}
function val(key){return clamp(state.values[key]);}
function automaticStaffCount(v=state.values){
 const r=programRule(v.programType||"small",
   Math.ceil(Number(v.students)||0)+Math.ceil(Number(v.partStudents)||0),
   Math.ceil(Number(v.infantFull)||0)+Math.ceil(Number(v.infantPart)||0));
 return r.additional;
}
function setSuggestedStaff(){
 state.values.staffCount=automaticStaffCount();
 state.values.staffWeeklyHours=40;
 const n=document.querySelector?.('[data-budget-key="staffCount"]');if(n)n.value=state.values.staffCount;
 const h=document.querySelector?.('[data-budget-key="staffWeeklyHours"]');if(h)h.value=40;
}
function calculate(){
 const full=val("students"),part=val("partStudents"),infantFull=val("infantFull"),infantPart=val("infantPart"),night=val("overnightNights");
 const fullIncome=full*val("tuition"),partIncome=part*val("partTuition");
 const infantIncome=infantFull*val("infantTuition")+infantPart*val("infantPartTuition"),nightIncome=night*val("overnightFee");
 const revenue=fullIncome+partIncome+infantIncome+nightIncome;
 const staffPayroll=val("staffCount")*val("staffWeeklyHours")*52/12*val("staffHourly");
 const director=val("directorSalary"),rent=val("rent"),utilities=val("utilities"),insurance=val("insurance");
 const expenses=staffPayroll+director+rent+utilities+insurance;
 const older=full+part,infants=infantFull+infantPart,daytimeChildren=older+infants;
 const type=programType(),rule=programRule(type,older,infants);
 // FTE is a payroll estimate, not a guarantee someone is on site at each moment.
 const scheduledPeople=1+Math.floor(val("staffCount"));
 const unavailable={none:0,restroom:1,sick:1,emergency:1,two:2}[state.values.staffUnavailable]??0;
 const availablePeople=Math.max(0,scheduledPeople-unavailable);
 const planningFloor=rule.required;
 const coverageGap=Math.max(0,planningFloor-availablePeople);
 const aboveCapacity=rule.invalid;
 const surplus=revenue-expenses;
 // Break-even tuition adjusts only the full-time rate. Part-time and overnight revenue stay fixed.
 const tuitionRequired=full>0?Math.max(0,(expenses-partIncome-infantIncome-nightIncome)/full):null;
 return {full,part,infantFull,infantPart,older,infants,night,revenue,expenses,surplus,tuitionRequired,staffPayroll,director,rent,utilities,insurance,scheduledPeople,unavailable,availablePeople,daytimeChildren,planningFloor,coverageGap,type,rule,aboveCapacity};
}
function countyRateNote(county){
 const type=programType(),info=countyRates(county,type),label=type==="preschool"?"center":"family home";
 return '<span>'+esc(county)+' County estimated '+esc(label)+' monthly prices: older children '+cash(info.child)+', infants '+cash(info.infant)+'. Both tuition fields are editable.</span> <a href="https://paybytown.com/childcare/california/" target="_blank" rel="noopener noreferrer">County price source</a><span class="budget-county-method">2026 estimates based on the DOL 2022 full-time medians for preschool-age children and infants; rates for home and center care differ. These are not provider quotes.</span>';
}
const BUDGET_HELP={
 "county": "Select the county for estimated 2026 full-time tuition prices. Family homes and preschool centers use different medians, and infants have their own rate. You can edit the rates.",
 "programType": "Small family home: six usual or up to eight conditionally. Large family home: twelve usual or up to fourteen conditionally, with assistant. Preschool center: one qualified teacher per 12 preschool-age children and one qualified infant-care teacher per four infants in a separately authorized component; toddler groups have different rules. Staff and infant limits apply.",
 "infantFull": "Full-time infants under 24 months. These are in addition to the older children entered above; do not count an infant twice.",
 "infantPart": "Part-time infants under 24 months, counted separately from older children and full-time infants. The staffing check conservatively assumes all groups could attend together.",
 "infantTuition": "Editable full-time infant monthly tuition. Defaults to the county's estimated median infant fee for the selected home or center type.",
 "infantPartTuition": "Editable part-time infant monthly tuition, initially 75% of full-time infant tuition until you change it separately.",
 "students": "How many children pay full-time monthly tuition. This is enrollment for the revenue estimate, not your licensed capacity.",
 "tuition": "The monthly price charged per full-time child. Part-time tuition follows at 75% until you edit the part-time rate separately.",
 "partStudents": "Children paying the part-time monthly fee. Do not count a child here if they are already counted as full-time.",
 "partTuition": "The monthly price per part-time child. Starts at 75% of full-time tuition; a manual change stops automatic linking.",
 "directorSalary": "What the director receives each month. This is an expense, distinct from additional staff payroll and from the operating surplus.",
 "staffCount": "Additional full-time-equivalent staff beyond the director. The calculator suggests the count when age-group enrollment or program type changes, using 40 paid hours per week. This is a budget estimate, not proof of qualifications or shift coverage; you may manually adjust.",
 "staffUnavailable": "Choose a temporary absence affecting the director or another staff member. Director plus whole additional FTEs form the starting headcount. An absence changes the headcount warning, not payroll.",
 "staffHourly": "Hourly pay for additional classroom staff only. Director pay is entered separately above.",
 "staffWeeklyHours": "Paid hours per week for each additional full-time-equivalent staff member. Monthly pay uses 52 weeks divided by 12 months.",
 "rent": "Monthly rent for a commercial facility, if applicable.",
 "utilities": "Monthly utility expenses paid by the program. Leave at $0 if not entering a separate amount; home utility allocation is not calculated.",
 "insurance": "Monthly business or child care insurance premium. Leave at $0 until you know the amount.",
 "overnightNights": "Total overnight stays billed in a month. Starts at zero; do not enter an overnight stay unless the program actually offers it.",
 "overnightFee": "Amount charged for each overnight stay. Overnight revenue is included, but extra overnight staffing costs are not calculated automatically.",
 "revenue": "Projected monthly full-time tuition, part-time tuition, and optional overnight fees added together. Meal-program reimbursements are excluded.",
 "expenses": "Projected monthly director salary, additional staff wages, commercial rent, utilities and insurance only. Other costs are excluded.",
 "surplus": "Projected revenue minus the listed expenses. Positive surplus is not necessarily take-home profit because taxes and other costs are excluded.",
 "tuitionRequired": "The full-time monthly fee that would cover the listed expenses at your current enrollment, with part-time and overnight fees held constant. It does not add a profit target.",
 "available": "The check includes older children and infants, both full-time and part-time, as if attending together. Family care infant limits and special capacity conditions apply. In a preschool center infant and older-child groups require separate qualified coverage.",
 "breakdown": "A detailed view of the same monthly expenses already included in the total. The lines are not extra charges.",
 "staffPayroll": "Monthly wages for additional classroom staff, excluding the director. FTE × paid hours per week × hourly pay × 52/12.",
 "overnight": "Only use overnight revenue if you can provide safe, authorized staffing. Overnight care may require additional personnel whose cost is not separately included here.",
 "fulltime": "The full-time group uses the county starting rate until you enter your own monthly tuition.",
 "parttime": "Part-time begins at 75% of the full-time monthly rate, and can be changed independently.",
 "staffAbsent": "The director counts as the first staff member in this exercise. When the only available person steps away, the available count becomes zero."
};
function helpTip(key,label){
 const explanation=BUDGET_HELP[key];
 if(!explanation)return "";
 // Hover displays the visual explanation. Keyboard focus and touch also work without a click-to-toggle control.
 return '<span class="budget-info" tabindex="0" role="note" aria-label="Help for '+esc(label)+': '+esc(explanation)+'"><span class="budget-info-icon" aria-hidden="true">i</span><span class="budget-info-popup" aria-hidden="true">'+esc(explanation)+'</span></span>';
}
function helpHeading(key,label){
 return '<div class="budget-field-heading"><label for="budget-'+esc(key)+'">'+esc(label)+'</label>'+helpTip(key,label)+'</div>';
}
function resultHeading(key,label){
 return '<div class="budget-result-heading"><span>'+esc(label)+'</span>'+helpTip(key,label)+'</div>';
}
function programControl(){
 return '<div class="budget-compact-field budget-program-selector">'+helpHeading("programType","Program type")+
  '<select id="budget-programType" data-budget-key="programType">'+PROGRAM_TYPES.map(([id,label])=>'<option value="'+esc(id)+'"'+(programType()===id?' selected':'')+'>'+esc(label)+'</option>').join("")+'</select></div>';
}
function unavailabilityControl(){
 const options=[["none","No one unavailable (0)"],["restroom","Restroom break (1)"],["sick","Sick call (1)"],["emergency","Emergency assistance (1)"],["two","Two staff unavailable (2)"]];
 return '<div class="budget-compact-field">'+helpHeading("staffUnavailable","Staff temporarily unavailable")+'<select id="budget-staffUnavailable" data-budget-key="staffUnavailable">'+
  options.map(([id,label])=>'<option value="'+esc(id)+'"'+(state.values.staffUnavailable===id?' selected':'')+'>'+esc(label)+'</option>').join("")+'</select></div>';
}
function availabilityText(c){
 if(c.daytimeChildren===0)return 'No children entered. Director assumed available for care.';
 let msg=c.availablePeople+' supervising staff available for '+c.daytimeChildren+' children ('+c.infants+' infants). ';
 if(c.aboveCapacity)msg+='LICENSE MIX OR CAPACITY WARNING: These counts do not fit the selected family child care license. Adding employees does not fix a licensing capacity or infant-limit violation. ';
 if(c.coverageGap>0)msg+='STAFFING GAP: At least '+c.planningFloor+' supervising adults are modeled; only '+c.availablePeople+' are currently available. ';
 else msg+='No numerical coverage gap under the selected planning model. ';
 if(c.rule.needsSpecial)msg+=(c.type==="preschool"?'Infant care requires an authorized center component with separately qualified supervision. ':'Extra home capacity requires qualifying school-age children, infant limits and documented parent notification. ');
 return msg;
}
function field(key,label,step=1){
 return '<div class="budget-compact-field">'+helpHeading(key,label)+'<input id="budget-'+esc(key)+'" type="number" data-budget-key="'+key+'" inputmode="decimal" min="0" max="1000000" step="'+step+'" value="'+esc(state.values[key])+'"></div>';
}
function breakdown(c){
 const line=(name,n,key)=>'<div><dt>'+esc(name)+'</dt><dd>'+cash(n)+helpTip(key,name)+'</dd></div>';
 return '<details class="budget-breakdown"><summary title="'+esc(BUDGET_HELP.breakdown)+'">Monthly expense breakdown</summary><dl>'+
  line("Classroom staff",c.staffPayroll,"staffPayroll")+line("Director salary",c.director,"directorSalary")+line("Rent",c.rent,"rent")+
  line("Utilities",c.utilities,"utilities")+line("Insurance",c.insurance,"insurance")+'</dl></details>';
}
function view(){
 const c=calculate(),county=state.values.county||"San Bernardino";
 return '<section class="budget-compact" id="cwc-budget" aria-label="Tuition and expenses calculator">'+
 '<div class="budget-mobile-strip" aria-label="Live monthly summary">'+
 '<span>Revenue<strong id="b-mobile-income">'+cash(c.revenue)+'</strong></span>'+
 '<span>Expenses<strong id="b-mobile-expenses">'+cash(c.expenses)+'</strong></span>'+
 '<span>Surplus<strong id="b-mobile-profit">'+cash(c.surplus)+'</strong></span></div>'+
 '<div class="budget-compact-editor">'+
 '<div class="budget-compact-heading"><h3>Will the center support your goals?</h3><p>Select your program type and county. Infant and older-child tuition and staffing update as enrollment changes.</p></div>'+
 '<div class="budget-program-county-row">'+programControl()+
 '<div class="budget-compact-field budget-county-selector">'+helpHeading("county","California county")+'<select id="budget-county" data-budget-key="county">'+COUNTIES.map(name=>'<option value="'+esc(name)+'"'+(name===county?' selected':'')+'>'+esc(name)+' County</option>').join("")+'</select></div></div>'+
 '<p id="budget-county-source" class="budget-county-source">'+countyRateNote(county)+'</p>'+
 '<div class="budget-group-label"><strong>Children (over age 2)</strong></div>'+
 '<div class="budget-enrollment-pair">'+
 '<div class="budget-enrollment-group"><div class="budget-enrollment-heading"><h4>Full-time</h4>'+helpTip("fulltime","Full-time children")+'</div>'+field("students","Children")+field("tuition","Monthly tuition ($)",25)+'</div>'+
 '<div class="budget-enrollment-group"><div class="budget-enrollment-heading"><h4>Part-time</h4>'+helpTip("parttime","Part-time children")+'</div>'+field("partStudents","Children")+field("partTuition","Monthly tuition ($)",25)+'</div></div>'+
 '<div class="budget-group-label"><strong>Infants (under age 2)</strong></div>'+
 '<div class="budget-enrollment-pair budget-infants-pair">'+
 '<div class="budget-enrollment-group"><h4>Full-time infants</h4>'+field("infantFull","Infants")+field("infantTuition","Monthly infant tuition ($)",25)+'</div>'+
 '<div class="budget-enrollment-group"><h4>Part-time infants</h4>'+field("infantPart","Infants")+field("infantPartTuition","Monthly infant tuition ($)",25)+'</div></div>'+
 '<div class="budget-director-first">'+field("directorSalary","Director monthly salary ($)",100)+'</div>'+
 '<div class="budget-compact-fields">'+
 field("staffCount","Additional classroom staff (FTE, excluding director)",.25)+
 unavailabilityControl()+
 field("staffHourly","Hourly staff pay ($)",.5)+
 field("staffWeeklyHours","Paid hours per staff / week")+
 field("rent","Commercial facility rent ($/month)",50)+
 field("utilities","Monthly utilities ($)",25)+
 field("insurance","Monthly insurance ($)",25)+
 '</div>'+
 '<details class="budget-compact-extra"><summary title="'+esc(BUDGET_HELP.overnight)+'">Optional overnight revenue'+(val("overnightNights")?" (included in totals)":"")+'</summary>'+
 '<div class="budget-compact-fields">'+field("overnightNights","Overnight stays / month")+field("overnightFee","Fee per stay ($)",5)+'</div>'+
 '<p class="budget-smallprint">If overnight care requires additional paid staff, increase your staffing estimate accordingly. This simplified calculator does not automatically add night shifts.</p></details>'+
 '<div class="budget-compact-footer"><button type="button" class="btn outline" data-budget-reset="1">Restore example figures</button>'+
 '<p>Food and meal-program costs and reimbursements are excluded. This is an illustrative budget, not a licensing determination.</p></div></div>'+
 '<aside class="budget-compact-live" aria-label="Live monthly financial results"><div class="kicker">Monthly results</div>'+
 '<div class="budget-compact-numbergrid" aria-live="polite">'+
 '<div>'+resultHeading("revenue","Revenue")+'<strong id="b-income">'+cash(c.revenue)+'</strong></div>'+
 '<div>'+resultHeading("expenses","Expenses including director pay")+'<strong id="b-expenses">'+cash(c.expenses)+'</strong></div>'+
 '<div class="budget-surplus">'+resultHeading("surplus","Surplus / shortfall")+'<strong id="b-profit">'+cash(c.surplus)+'</strong></div>'+
 '<div class="budget-goal-result">'+resultHeading("tuitionRequired","Break-even full-time tuition")+'<strong id="b-tuition">'+(c.tuitionRequired==null?"Add full-time children":cash(c.tuitionRequired)+"/child")+'</strong></div></div>'+
 '<div class="budget-availability-block"><div class="budget-result-heading"><span>Staff availability</span>'+helpTip("available","Staff availability")+'</div><p id="b-staff-availability" class="budget-staff-availability'+(c.coverageGap>0||c.aboveCapacity||c.rule.needsSpecial?' budget-staff-alert':'')+'" role="status">'+availabilityText(c)+'</p><p id="b-program-rule" class="budget-smallprint">'+esc(c.rule.rule)+'</p></div>'+
 '<div id="b-verdict" class="budget-compact-verdict">'+(c.surplus<0?"Current numbers show an operating shortfall.":"Current numbers show an operating surplus.")+'</div>'+
 '<div id="b-breakdown">'+breakdown(c)+'</div>'+
 '<p class="budget-smallprint">Break-even tuition includes director salary but no extra profit target. Infants and older children are counted together for family homes; center infant and preschool staffing are modeled as separate groups. Licensing qualifications, the actual mix of children, and shift coverage still require verification. Payroll taxes, benefits, meals, and unlisted costs are not modeled.</p>'+
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
 const availability=document.getElementById("b-staff-availability");
 if(availability){availability.textContent=availabilityText(c);availability.classList.toggle("budget-staff-alert",c.coverageGap>0||c.aboveCapacity||c.rule.needsSpecial);}
 const banner=document.getElementById("b-verdict");
 if(banner)banner.textContent=c.surplus<0?"Current numbers show an operating shortfall.":"Current numbers show an operating surplus.";
 const source=document.getElementById("budget-county-source");if(source)source.innerHTML=countyRateNote(state.values.county);
 const rule=document.getElementById("b-program-rule");if(rule)rule.textContent=c.rule.rule;
 const el=document.getElementById("b-breakdown");
 if(el){const open=!!el.querySelector("details")?.open;el.innerHTML=breakdown(c);const details=el.querySelector("details");if(details)details.open=open;}
}
function updateField(input){
 const key=input.dataset.budgetKey;
 if(!Object.prototype.hasOwnProperty.call(DEFAULTS,key))return;
 const isPriceKey=key==="county"||key==="programType";
 if(isPriceKey){
  if(key==="county")state.values.county=String(input.value);
  if(key==="programType")state.values.programType=PROGRAM_TYPES.some(([id])=>id===input.value)?input.value:"small";
  const rates=countyRates(state.values.county,programType());
  state.values.tuition=rates.child;
  state.values.infantTuition=rates.infant;
  state.tuitionManual=false;state.infantManual=false;
  for(const [name,value] of [["tuition",rates.child],["infantTuition",rates.infant]]){
   const el=document.querySelector?.('[data-budget-key="'+name+'"]');if(el)el.value=value;
  }
 }else if(key==="staffUnavailable"){
  state.values.staffUnavailable=String(input.value);
 }else{
  state.values[key]=clamp(input.value);
 }
 if(key==="tuition")state.tuitionManual=true;
 if(key==="infantTuition")state.infantManual=true;
 if(key==="partTuition")state.partLinked=false;
 if(key==="infantPartTuition")state.infantPartLinked=false;
 if((key==="tuition"||isPriceKey)&&state.partLinked){
  state.values.partTuition=rate75(state.values.tuition);
  const el=document.querySelector?.('[data-budget-key="partTuition"]');if(el)el.value=state.values.partTuition;
 }
 if((key==="infantTuition"||isPriceKey)&&state.infantPartLinked){
  state.values.infantPartTuition=rate75(state.values.infantTuition);
  const el=document.querySelector?.('[data-budget-key="infantPartTuition"]');if(el)el.value=state.values.infantPartTuition;
 }
 if(["programType","students","partStudents","infantFull","infantPart"].includes(key))setSuggestedStaff();
 state.touched=true;persist();update();
 // Re-render only for program/county changes to update the source annotation and headings.
 if(isPriceKey){
  const root=document.getElementById("cwc-budget");
  if(root)root.outerHTML=view();
 }
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
 state={values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false,infantPartLinked:true,infantManual:false};persist();
 const node=document.getElementById("cwc-budget");
 if(node)node.outerHTML=view();
 document.dispatchEvent(new Event("cwc-budget-changed"));
});
function reset(){state={values:{...DEFAULTS},touched:false,partLinked:true,tuitionManual:false,infantPartLinked:true,infantManual:false};persist();}
function goalHeader(){return "";} // Old callers can safely omit this preamble.
function loadBenchmarks(){return undefined;}
function countyRate(){return countyRateFor(state.values.county);}
window.CWC_BUDGET={view,goalHeader,calculate,update,touched:()=>state.touched,reset,loadBenchmarks,countyRate};
})();