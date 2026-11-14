(function DirectorDeskApp(){
"use strict";
const D=window.CWC_V92_DATA;
const L=window.CWC_V94_LESSONS||{modules:{},glossary:{}};
const R=window.CWC_V96_REFERENCES||{sources:{},stages:{},lab:{}};
if(!D){document.body.innerHTML="<p>The scenario data could not be loaded.</p>";return;}
const KEY="cwc-v92-directors-day-state";
const pages=["overview","chapters","cases","staff","evidence","assessment","facilitator"];
const navLabels={overview:"Program overview",chapters:"Learning chapters",cases:"Applied simulations",staff:"Staffing Lab",evidence:"Evidence Journal",assessment:"Competency assessment",facilitator:"Facilitator review"};
const navIcons={overview:"⌂",chapters:"◫",cases:"◈",staff:"♟",evidence:"▤",assessment:"◉",facilitator:"▣"};
function initial(){return {page:"overview",caseId:"pickup",variants:{pickup:"afternoon",hospital:"midday",staff:"open"},caseWork:{},evidence:{},evidenceReviewed:false,staffing:{plan:"minimum",disruption:"break",wage:23,attendance:12,qualifiedTeachers:1,window:"during",support:"routine"},assessment:{diagnostic:{},capstone:{},transfer:"",name:"",submitted:false,facilitatorScore:null,facilitatorNote:"",reviewer:""},menu:false,introSeen:{},sequence:{staffCompleted:false,staffTouched:false},orderSeed:Math.floor(Math.random()*2147483647)};}
function restore(){try{const raw=JSON.parse(localStorage.getItem(KEY)||"null");if(!raw||typeof raw!=="object")return initial();const z=initial();return {...z,...raw,variants:{...z.variants,...raw.variants},caseWork:raw.caseWork||{},orderSeed:Number.isFinite(raw.orderSeed)?raw.orderSeed:z.orderSeed,introSeen:raw.introSeen||{},sequence:{...z.sequence,...raw.sequence},evidence:raw.evidence||{},staffing:{...z.staffing,...raw.staffing},assessment:{...z.assessment,...raw.assessment,diagnostic:raw.assessment?.diagnostic||{},capstone:raw.assessment?.capstone||{}}};}catch(e){return initial();}}
let state=restore();
try{const direct=new URLSearchParams(window.location.search);const requested=direct.get("case");if(requested&&D.cases.some(c=>c.id===requested)){state.caseId=requested;state.page="cases";}const page=direct.get("page");if(page&&pages.includes(page))state.page=page;}catch(e){}
const $=sel=>document.querySelector(sel);
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){const n=$("#storageNote");if(n)n.textContent="Local progress could not be saved on this device.";}}
function termHtml(raw){
 const source=esc(raw);
 const words=Object.keys(L.glossary||{}).sort((a,b)=>b.length-a.length);
 if(!words.length)return source;
 const pattern=String.raw`\b(${words.join("|")})\b`;
 const re=new RegExp(pattern,"gi");
 return source.replace(re,(matched)=>{
   const key=words.find(w=>w.toLowerCase()===matched.toLowerCase());
   const info=L.glossary[key]||"";
   return '<span class="term-wrap"><button type="button" class="term-button" data-action="term" aria-expanded="false" aria-label="'+esc(matched)+', show definition" title="'+esc(info)+'">'+esc(matched)+'<span aria-hidden="true"> ⓘ</span></button><span class="term-definition" role="note">'+esc(info)+'</span></span>';
 });
}
function moduleKey(){if(state.page==="cases")return "case:"+state.caseId;return state.page;}
function continueJourney(){
 if(state.page==="cases"&&work(state.caseId).step<getCase(state.caseId).stages.length)return;
 if(state.page==="cases"){
  if(state.caseId==="pickup"){state.caseId="hospital";return go("cases");}
  if(state.caseId==="hospital"){state.caseId="staff";return go("cases");}
  return go("staff");
 }
 if(state.page==="staff"){if(!state.sequence.staffTouched)return;state.sequence.staffCompleted=true;save();return go("evidence");}
 if(state.page==="evidence"){if(!state.evidenceReviewed)return;return go("assessment");}
 if(state.page==="assessment")return go("facilitator");
 return go("chapters");
}
function journeyButton(){
 if(state.page==="cases"){
  const text=state.caseId==="pickup"?"Continue to the medical emergency case →":state.caseId==="hospital"?"Continue to the staffing case →":"Continue to the Staffing Lab →";
  return hButton("journey-next",text,"primary");
 }
 if(state.page==="staff")return hButton("journey-next","Continue to the Evidence Journal →","primary",state.sequence?.staffTouched?"":"disabled");
 if(state.page==="evidence")return hButton("journey-next","Continue to the competency assessment →","primary");
 return "";
}

function introductoryLesson(key){
 const info=L.modules?.[key];
 if(!info)return "<div class='note'>The lesson for this activity is unavailable.</div>";
 return '<section class="panel module-lesson" aria-label="Learning lesson"><span class="eyebrow">'+esc(info.kicker)+'</span><h2>'+esc(info.title)+'</h2><div class="lesson-text">'+info.paragraphs.map(p=>'<p>'+termHtml(p)+'</p>').join("")+'</div><div class="learning-check"><h3>What you will practice</h3><ul>'+info.focus.map(p=>'<li>'+termHtml(p)+'</li>').join("")+'</ul></div><div class="lesson-question"><strong>Before you decide</strong><p>'+termHtml(info.question)+'</p></div><p class="tiny muted">Select underlined terms to see their definitions. These explanations add context without simplifying away professional concepts.</p><div class="actions">'+hButton("complete-lesson","Continue to "+(key.startsWith("case:")?"the case":key==="staff"?"the staffing lab":key==="evidence"?"the evidence journal":key==="facilitator"?"facilitator review":"the assessment")+" →","primary")+'</div></section>';
}

function realCaseAfterword(c){
 const info=L.modules?.["case:"+c.id]?.afterword;
 if(!info)return "";
 return '<section class="afterword" aria-label="Origin of this training scenario"><div class="afterword-kicker">AFTER THE SCENARIO · THE REAL-WORLD FOUNDATION</div><h3>'+esc(info.label)+'</h3><div class="afterword-paragraphs">'+(info.paragraphs||[info.text]).map(p=>"<p>"+termHtml(p)+"</p>").join("")+'</div>'+(info.question?'<div class="afterword-question"><strong>Now that you know what happened</strong><p>'+termHtml(info.question)+'</p></div>':'')+'<p class="tiny muted">Names and identifying locations have been withheld; fictional branches are identified above and are not findings about actual people.</p></section>';
}

function hideDefinitions(){
 document.querySelectorAll(".term-button[aria-expanded='true']").forEach(btn=>{
  btn.setAttribute("aria-expanded","false");
  // Visibility is managed by hover/focus CSS and aria-expanded.
 });
}
function sourceHtml(topic,stageIndex){
 const keys=Number.isInteger(stageIndex)?(R.stages?.[topic]?.[stageIndex]||[]):(R.lab?.[topic]||[]);
 if(!keys.length)return "";
 const links=keys.map(key=>{
  const r=R.sources?.[key];if(!r)return "";
  return '<li><a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.label)+'</a><span class="source-kind">'+esc(r.kind)+'</span><p>'+esc(r.note)+'</p></li>';
 }).filter(Boolean).join("");
 return '<details class="scenario-sources" open><summary>Why this decision? Laws, standards, and sources</summary><ul>'+links+'</ul><p class="tiny muted">Sources explain the governing requirements or professional rationale. A recommended practice is not automatically a legal mandate; check current rules for the program’s license type.</p></details>';
}
function inlineTerms(raw){
 const source=esc(raw);
 const words=Object.keys(L.glossary||{}).sort((a,b)=>b.length-a.length);
 if(!words.length)return source;
 const re=new RegExp("\\b("+words.join("|")+")\\b","gi");
 return source.replace(re,(matched)=>{
   const key=words.find(w=>w.toLowerCase()===matched.toLowerCase());
   const definition=L.glossary[key]||"";
   return '<span class="hover-term" title="'+esc(definition)+'" aria-label="'+esc(matched)+': '+esc(definition)+'">'+esc(matched)+'<span class="hover-definition" role="note">'+esc(definition)+'</span></span>';
 });
}
function orderedOptions(options,key){
 let hash=(state.orderSeed||1)>>>0;
 for(const c of String(key))hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
 const arr=options.slice();
 for(let i=arr.length-1;i>0;i--){hash=(Math.imul(hash,1664525)+1013904223)>>>0;const j=hash%(i+1);[arr[i],arr[j]]=[arr[j],arr[i]];}
 return arr;
}
function getCase(id){return D.cases.find(c=>c.id===id)||D.cases[0];}
function work(id){return state.caseWork[id]||(state.caseWork[id]={step:0,chosen:[]});}
function optionFor(stage,id){return stage.options.find(o=>o.id===id);}
function doneCount(){return D.cases.filter(c=>work(c.id).step>=c.stages.length).length;}
function courseProgress(){try{const key="care-with-a-compass-supervisor-v72-72q",raw=localStorage.getItem(key)||sessionStorage.getItem(key);if(!raw)return {done:0,capstone:false};const s=JSON.parse(raw);return {done:Array.isArray(s.done)?s.done.filter(n=>Number.isInteger(n)&&n>=1&&n<=5).length:0,capstone:!!s.capstone?.completed};}catch(e){return {done:0,capstone:false};}}
function courseReady(){return courseProgress().capstone;}
function allCasesDone(){return D.cases.every(c=>work(c.id).step>=c.stages.length);}
function staffReady(){return allCasesDone();}
function staffingDone(){return !!state.sequence?.staffCompleted||state.evidenceReviewed||state.assessment.submitted;}
function nextRequired(){
 if(!courseReady())return {page:"chapters"};
 for(const c of D.cases)if(work(c.id).step<c.stages.length)return {page:"cases",caseId:c.id};
 if(!staffingDone())return {page:"staff"};
 if(!state.evidenceReviewed)return {page:"evidence"};
 if(!state.assessment.submitted)return {page:"assessment"};
 return {page:"facilitator"};
}
function canOpen(page){
 // All sidebar sections are available for review; the guided Continue path
 // still uses nextRequired() to resume actual unfinished work.
 return pages.includes(page);
}
function canOpenCase(id){
 return D.cases.some(c=>c.id===id);
}
function resumeLinear(){
 const next=nextRequired();
 if(next.caseId)state.caseId=next.caseId;
 return go(next.page);
}
function hButton(action,label,kind="secondary",extra=""){return `<button type="button" data-action="${esc(action)}" class="btn ${kind}" ${extra}>${label}</button>`;}
function label(title,body){return `<div class="kicker">${esc(title)}</div>${body}`;}
function nav(){return pages.map(p=>`<button data-action="nav" data-page="${p}" class="navbtn ${state.page===p?"active":""}" aria-current="${state.page===p?"page":"false"}"><span class="navicon" aria-hidden="true">${navIcons[p]}</span><span>${esc(navLabels[p])}</span></button>`).join("");}
function iconCard(value,name,small=""){return `<div class="metric"><strong>${esc(value)}</strong><span>${esc(name)}</span>${small?`<small>${esc(small)}</small>`:""}</div>`;}
function overview(){
 const chapters=courseProgress();
 const cards=D.cases.map(c=>{const w=work(c.id),n=w.step>=c.stages.length?"Complete":w.chosen.length?`Stage ${Math.min(w.step+1,c.stages.length)} of ${c.stages.length}`:"Not started";return `<article class="case-tile"><div class="case-tag">${esc(c.tag)}</div><h3>${esc(c.title)}</h3><p>${esc(c.subtitle)}</p><div class="tile-end"><span>${n}</span><span class="tiny muted">Part of applied training</span></div></article>`;}).join("");
 return `<section class="hero"><div class="hero-copy"><span class="eyebrow light">Version 9.7.0 · One guided leadership program</span><h2>One facility. One ordinary day.<br><em>A dozen consequences.</em></h2><p>One leadership program combines five foundational chapters, consequential simulations, staffing and evidence labs, and a facilitator-reviewed competency assessment for aspiring supervisors and directors.</p><div class="hero-actions">${hButton("start-training",courseReady()||chapters.done>0?"Continue Training →":"Start Training →","primary-light")}</div></div><div class="hero-mark" aria-hidden="true"><span>09</span><small>director<br>edition</small></div></section>
 <div class="program-roadmap"><div class="roadmap-step"><span class="roadmap-no">01</span><div><h3>Learn the leadership foundations</h3><p>Five chapters, 72 applied questions, 36 follow-ups, and the original four-stage capstone. ${chapters.done} of 5 chapters completed.</p><span class="roadmap-desc">Part of the guided learning journey</span></div></div><div class="roadmap-step"><span class="roadmap-no">02</span><div><h3>Manage real consequences</h3><p>Explore three long-form cases, staffing resilience, and evidence evaluation.</p><span class="roadmap-desc">Applied cases follow the foundation lessons</span></div></div><div class="roadmap-step"><span class="roadmap-no">03</span><div><h3>Demonstrate the learning</h3><p>Complete diagnostics, a new cascading capstone, and a facilitator-reviewed workplace plan.</p><span class="roadmap-desc">Human-scored pilot assessment and feedback</span></div></div></div><section class="training-rationale" aria-labelledby="training-rationale-title"><div class="rationale-eyebrow">Why supervisory preparation matters · EDACE 830</div><h2 id="training-rationale-title">Experience is not the same as preparation.</h2><p>California's Child Development Permit pathways recognize education and professional experience, and some require administration or adult-supervision coursework. Those qualifications are important, but they do not automatically demonstrate the judgment needed when child safety, staff supervision, family concerns, and licensing obligations collide.</p><p>Drawing on Katz's (1974) technical, human, and conceptual leadership skills, and on adult learning through application and reflection, <em>Care with a Compass</em> moves beyond knowing what a leader should do. Learners evaluate evidence, make consequential choices, confront unexpected developments, and consider how to transfer those lessons to their own programs.</p><p class="rationale-bottom"><strong>The goal is not simply to find the right answer. It is to make a responsible decision, then know how to lead when the next problem begins.</strong></p></section>
 <div class="section-top"><div><div class="kicker">01 · Scenario studio</div><h2>The director does not get to reset the day.</h2></div><p>Each response changes the recorded conditions, evidence trail, and next development.</p></div>
 <div class="case-grid">${cards}</div>
 <div class="feature-grid"><article class="feature-card"><span class="feature-glyph">♟</span><h3>Staffing resilience</h3><p>Test relief staffing, overlapping shifts, and the real cost of predictable disruptions.</p><span class="roadmap-desc">Included in the guided training</span></article><article class="feature-card"><span class="feature-glyph">▤</span><h3>Evidence before assumption</h3><p>Separate directly observed events, recordings, allegations, inferences, and predictions.</p><span class="roadmap-desc">Included in the guided training</span></article><article class="feature-card"><span class="feature-glyph">◉</span><h3>Demonstrate judgment</h3><p>Try a separately scored assessment with a facilitator-reviewed transfer plan.</p><span class="roadmap-desc">Included in the guided training</span></article></div>
 <div class="note"><strong>How to explore.</strong> Use the sidebar to preview any section in any order. The single Start/Continue Training button still follows the intended learning sequence, and browsing ahead does not automatically complete earlier activities. This remains a prototype, not a state licensing or validated certification course.</div>`;
}
function chaptersView(){
 const p=courseProgress();
 return `<div class="section-top"><div><div class="kicker">01 · Learning chapters</div><h2>Five chapters. One leadership foundation.</h2><p>Technical, human, and conceptual leadership skills, taught through the original applied question bank, branching follow-ups, guided recovery, chapter labs, and reflection.</p></div><span class="pill neutral">${p.done}/5 completed</span></div>
 <div class="note"><strong>Your earlier progress is preserved.</strong> This is the same curriculum, now part of the single supervisor/director learning program. Continue where you last stopped.</div>
 <div class="chapter-embed-wrap"><iframe id="chaptersFrame" class="chapter-frame" src="chapters.html?embedded=1" loading="eager" title="Five learning chapters for new supervisors and directors"></iframe></div>`;
}
function caseConditions(c,w){
 const out={safety:"Under review",coverage:"Under review",family:"Under review",evidence:"Not yet reviewed",finance:"Not reviewed"};
 w.chosen.forEach((id,i)=>{const o=optionFor(c.stages[i],id);if(o?.updates)Object.assign(out,o.updates);});
 return out;
}
function caseTrail(c,w){if(!w.chosen.length)return `<p class="muted">The decision trail begins when you choose an action.</p>`;
 return `<ol class="trail">${w.chosen.map((id,i)=>{const s=c.stages[i],o=optionFor(s,id);return `<li><span class="trail-dot ${o.critical?"alert":o.quality===2?"good":"caution"}"></span><div><small>Stage ${i+1}: ${esc(s.title)}</small><strong>${esc(o.text)}</strong><p>${esc(o.consequence)}</p>${o.critical?'<span class="flag">Critical safety concern</span>':""}</div></li>`}).join("")}</ol>`;
}
function signalsPanel(c,w){const conditions=caseConditions(c,w);return `<aside class="signals"><h3>Facility condition</h3>${Object.entries(conditions).filter(([k,v])=>!["Not reviewed","Not yet reviewed"].includes(v)).map(([k,v])=>`<div class="signal"><span>${esc(k[0].toUpperCase()+k.slice(1))}</span><strong>${esc(v)}</strong></div>`).join("")}<p class="tiny muted">Conditions describe case facts and consequences, not invented numerical risk scores.</p></aside>`;}
function selectedVariant(c){return c.variants.find(v=>v.id===state.variants[c.id])||c.variants[0];}
function casesView(){
 const c=getCase(state.caseId),w=work(c.id),finished=w.step>=c.stages.length,variant=selectedVariant(c);
 if(!state.introSeen["case:"+c.id])return `<div class="section-top"><div><div class="kicker">Supervisor applied case · Lesson first</div><h2>${esc(c.title)}</h2><p>${esc(c.subtitle)}</p></div></div>${introductoryLesson("case:"+c.id)}`;
 const casePosition=D.cases.findIndex(x=>x.id===c.id)+1;
 const variantInput=`<div class="case-select"><label for="variantSelect">Starting conditions</label><select id="variantSelect" data-change="variant-select">${c.variants.map(v=>`<option value="${v.id}" ${v.id===variant.id?"selected":""}>${esc(v.label)}</option>`).join("")}</select></div>`;
 const header=`<div class="section-top"><div><div class="kicker">Applied case ${casePosition} of ${D.cases.length} · Director's Day</div><h2>${esc(c.title)}</h2><p>${esc(c.subtitle)}</p></div><span class="pill neutral">${c.minutes} min · ${c.stages.length} stages</span></div>${!finished&&w.step===0&&!w.chosen.length?`<div class="toolbar">${variantInput}</div>`:""}`;
 if(finished) {
  const full=w.chosen.reduce((n,id,i)=>n+(optionFor(c.stages[i],id).quality===2?1:0),0);
  const critical=w.chosen.filter((id,i)=>optionFor(c.stages[i],id).critical).length;
  const safe=full===c.stages.length&&critical===0;
  return `${header}<div class="layout-main"><div class="panel"><span class="eyebrow">After-action review</span><h3>${safe?"You acted, but the next day still matters.":"Your earlier choices remain part of the case."}</h3><p>You made ${w.chosen.length} connected decisions, ${full} of which represented the strongest modeled response. ${critical?`${critical} choice(s) triggered critical safety concerns that a later good choice cannot erase.`:"No choices triggered a designated critical safety concern."}</p><div class="status-banner ${critical?"bad":"good"}">${critical?"The response needs targeted safety remediation.":"Review the operational changes before declaring the incident resolved."}</div><h4>Your decision trail</h4>${caseTrail(c,w)}<div class="callout"><strong>Transfer question</strong><p>What would you change before the next shift starts? Identify a qualified owner, a resource, and an observable way to verify the correction.</p></div><details class="optional-review"><summary>Optional: review or replay this case</summary><div class="actions">${hButton("reset-case","Replay this case","outline")} ${hButton("export-case","Download decision trail","outline")} ${hButton("review-lesson","Review the lesson","outline")}</div></details></div>${realCaseAfterword(c)}<div class="actions journey-next">${journeyButton()}</div></div>${signalsPanel(c,w)}</div>`;
 }
 const s=c.stages[w.step],selectedId=w.chosen[w.step],selected=selectedId?optionFor(s,selectedId):null,prev=w.step?optionFor(c.stages[w.step-1],w.chosen[w.step-1]):null;
 const branch=s.branchLead?.[prev?.id]||"";
 const priorCritical=w.chosen.some((id,i)=>optionFor(c.stages[i],id)?.critical);
 const scenarioText=w.step===0?variant.start:s.lead;
 const options=orderedOptions(s.options,c.id+":"+w.step).map((o,i)=>`<button type="button" class="answer ${selectedId===o.id?"selected":""}" data-action="case-answer" data-option="${o.id}" ${selected?"disabled":""}><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${inlineTerms(o.text)}</span></button>`).join("");
 return `${header}<div class="layout-main"><div class="panel"><div class="progress-heading"><span>DECISION ${w.step+1} OF ${c.stages.length}</span><strong>${Math.round((w.step/c.stages.length)*100)}% explored</strong></div><div class="progress-track"><span style="width:${(w.step/c.stages.length)*100}%"></span></div><div class="stage-eyebrow">Your next decision</div><h3>${esc(s.title)}</h3><p class="scenario-lead">${termHtml(scenarioText)}</p>${branch?`<div class="branch-note"><strong>Because of your previous decision:</strong> ${esc(branch)}</div>`:""}${priorCritical?'<p class="safety-warning">An earlier critical safety concern remains in the record, even if later choices are stronger.</p>':""}<h4>${termHtml(s.question)}</h4><div class="answers">${options}</div>${selected?`<div class="feedback ${selected.critical?"unsafe":selected.quality===2?"strong":"partial"}"><strong>${selected.critical?"Critical safety concern":selected.quality===2?"Defensible response":selected.quality===1?"Partly defensible":"Response needs correction"}</strong><p>${termHtml(selected.feedback)}</p><div class="consequence"><span>WHAT HAPPENS NEXT</span><p>${termHtml(selected.consequence)}</p></div>${sourceHtml(c.id,w.step)}</div><div class="actions">${hButton("case-next",w.step===c.stages.length-1?"Open after-action review →":"Continue the incident →","primary")}</div>`:""}</div><div><div class="sticky">${signalsPanel(c,w)}<div class="sidepanel"><h3>Incident timeline</h3>${caseTrail(c,w)}</div></div></div></div>`;
}
function staffModel(){
 const s=state.staffing;
 const attendance=Math.max(1,Math.min(36,Math.round(Number(s.attendance)||12)));
 const scheduled=Math.max(1,Math.min(4,Math.round(Number(s.qualifiedTeachers)||1)));
 const floor=Math.ceil(attendance/12);
 const extra={minimum:0,overlap:1,relief:1,combined:2}[s.plan]??0;
 const overlapActive=s.window!=="outside";
 const backup=extra-(overlapActive?0:((s.plan==="overlap"||s.plan==="combined")?1:0));
 const lost={break:1,sick:1,double:2,emergency:2}[s.disruption]??1;
 const available=Math.max(0,scheduled+backup-lost);
 const gap=Math.max(0,floor-available);
 const hours={minimum:0,overlap:3,relief:6,combined:9}[s.plan]??0;
 const wage=Math.max(18,Math.min(45,Number(s.wage)||23));
 const cost=hours*wage;
 return {attendance,scheduled,floor,backup,lost,available,gap,ok:gap===0,cost,weekCost:cost*5,monthCost:cost*22,extraPerChild:cost/attendance,enhanced:s.support==="enhanced",overlapActive};
}
function staffView(){
 const m=staffModel(),s=state.staffing;
 const plans=[["minimum","Minimum-only schedule","No reserved qualified relief"],["overlap","Overlapping shifts","One relief teacher during planned overlap"],["relief","Qualified relief employee","One eligible relief teacher available"],["combined","Overlap and relief","Two during overlap; one outside it"]];
 const shocks=[["break","Routine restroom break (1 unavailable)"],["sick","Unexpected sick call (1 unavailable)"],["double","Two competing interruptions (2 unavailable)"],["emergency","Emergency transport plus absence (2 unavailable)"]];
 return `<div class="section-top"><div><div class="kicker">03 · Staffing, finance, and continuity</div><h2>When the staffing plan can't bend.</h2><p>Explore how attendance, real employee presence, funding, and predictable interruptions affect supervisory decisions.</p></div></div>
 <div class="actions lesson-revisit">${hButton("review-lesson","Review the staffing lesson","outline")}</div>
 <div class="layout-main">
 <section class="panel staff-panel">
 <div class="kicker">Applied operations laboratory</div><h3>Build a coverage plan, then stress-test it.</h3>
 <p class="muted">The worked example assumes a licensed California preschool center using a simplified 1:12 teacher-child floor. Other age groups, Title 5 arrangements, room configurations, and individualized support needs require separate analysis. This model does not certify compliance.</p>
 <div class="staff-section"><h4>1. Who is actually present?</h4>
 <div class="staff-controls">
 <div><label for="staffAttendance">Children attending: <strong>${m.attendance}</strong></label><input id="staffAttendance" type="range" min="6" max="36" step="1" value="${m.attendance}" data-change="staff-attendance"></div>
 <div><label for="staffTeachers">Qualified teachers scheduled onsite: <strong>${m.scheduled}</strong></label><input id="staffTeachers" type="range" min="1" max="4" step="1" value="${m.scheduled}" data-change="staff-teachers"></div>
 </div><div class="staff-summary"><strong>Illustrative teacher floor: ${m.floor}</strong><span>Based only on ${m.attendance} preschool children ÷ 12, rounded up. Each person counted must be eligible, physically available, and supervising appropriately.</span></div></div>
 <div class="staff-section"><h4>2. How will you handle interruptions?</h4>
 <div class="staff-controls">
 <div><label for="staffPlan">Reserve staffing design</label><select id="staffPlan" data-change="staff-plan">${plans.map(([id,name,note])=>`<option value="${id}" ${s.plan===id?"selected":""}>${name}: ${note}</option>`).join("")}</select></div>
 <div><label for="staffShock">Incident that removes staff from coverage</label><select id="staffShock" data-change="staff-shock">${shocks.map(([id,label])=>`<option value="${id}" ${s.disruption===id?"selected":""}>${label}</option>`).join("")}</select></div>
 <div><label for="staffWindow">When does the incident occur?</label><select id="staffWindow" data-change="staff-window"><option value="during" ${s.window!=="outside"?"selected":""}>During scheduled overlap</option><option value="outside" ${s.window==="outside"?"selected":""}>Outside the overlap window</option></select></div>
 <div><label for="staffSupport">Individualized supervision considerations</label><select id="staffSupport" data-change="staff-support"><option value="routine" ${s.support!=="enhanced"?"selected":""}>Routine group needs</option><option value="enhanced" ${s.support==="enhanced"?"selected":""}>Child needs intensive individualized support</option></select></div>
 </div></div>
 <div class="staff-section"><h4>3. Budget for the relief arrangement</h4><label for="staffWage">Illustrative fully loaded cost per staff-hour: <strong>$${s.wage}</strong></label><input id="staffWage" type="range" min="18" max="45" step="1" value="${s.wage}" data-change="staff-wage">
 <div class="lab-results"><div><span>Additional daily labor</span><strong>$${m.cost}</strong></div><div><span>Five-day estimate</span><strong>$${m.weekCost}</strong></div><div><span>22-day estimate</span><strong>$${m.monthCost.toLocaleString()}</strong></div></div>
 <p class="tiny muted">Assumed additional paid hours: minimum 0, overlapping 3, relief 6, combined 9 per day. These are examples, not actual quoted labor budgets or staffing schedules. Added daily expense per attending child: $${m.extraPerChild.toFixed(2)}.</p></div>
 <div class="staff-section"><h4>4. Evaluate the decision</h4>
 <div class="coverage-summary" aria-live="polite">
 <div><span>Scheduled teachers</span><strong>${m.scheduled}</strong></div>
 <div><span>Qualified reserve available now</span><strong>+${m.backup}</strong></div>
 <div><span>Unavailable due to incident</span><strong>−${m.lost}</strong></div>
 <div><span>Available for group coverage</span><strong>${m.available}</strong></div>
 <div><span>Illustrative floor for attendance</span><strong>${m.floor}</strong></div>
 </div>
 <div class="status-banner ${m.ok?"good":"bad"}">${m.ok?"The modeled numerical teacher floor is met after this interruption.":"Coverage gap: the model is short "+m.gap+" qualified teacher"+(m.gap===1?"":"s")+" after the interruption. Do not proceed as though staffing is adequate."}</div>
 ${m.enhanced?`<div class="staff-support-warning"><strong>Individualized support consideration.</strong> ${termHtml("Minimum ratio")} compliance alone cannot establish whether this child receives appropriate supervision, accommodations, or communication support. Review the actual child-specific plan and available staffing.</div>`:""}
 <p><strong>Director's next action:</strong> ${m.ok?"Verify classroom assignments, actual supervision, staff qualifications, and ability to maintain coverage throughout the day.":"Obtain suitable qualified relief, change arrangements where permitted, or reduce attendance and operations until the program can provide required supervision."}</p>
 ${sourceHtml("staff")}
 <div class="actions journey-next">${journeyButton()}</div></div></section>
 <aside class="sidepanel"><h3>Leadership skills in action</h3>
 <p><strong>${termHtml("Technical skill")}:</strong> Determine who is qualified, onsite, and counted toward actual classroom supervision.</p>
 <p><strong>${termHtml("Human skill")}:</strong> Recognize that employees cannot postpone illness or restroom needs on command.</p>
 <p><strong>${termHtml("Conceptual skill")}:</strong> Connect employee schedules, enrollment, family needs, and the operating budget.</p>
 <div class="callout"><strong>A policy cannot create an employee.</strong><p>When coverage does not exist, repeating the rule or asking staff to work harder will not solve the underlying resources problem.</p></div>
 <p class="tiny muted">Think about an ordinary day in your own program. How many times can the schedule tolerate an unexpected absence without forcing a supervisor to improvise?</p></aside></div>`;
}
const clsOptions=[["","Choose classification"],["observed","Directly observed"],["recorded","Recorded evidence"],["alleged","Reported allegation"],["inference","Inference"],["forecast","Prediction"]];
function evidenceView(){
 let answered=D.evidence.filter(x=>state.evidence[x.id]).length,correct=D.evidence.filter(x=>state.evidence[x.id]===x.answer).length;
 return `<div class="section-top"><div><div class="kicker">04 · Fact before conclusion</div><h2>The evidence journal.</h2><p>A well-managed incident separates what was seen, what was recorded, what someone alleges, and what the director predicts.</p></div><span class="pill neutral">${answered} of ${D.evidence.length} classified</span></div><div class="actions lesson-revisit">${hButton("review-lesson","Review the evidence lesson","outline")}</div><div class="panel"><div class="evidence-list">${D.evidence.map((e,i)=>`<div class="evidence-item"><div><small>ITEM ${String(i+1).padStart(2,"0")}</small><p>${termHtml(e.text)}</p></div><div><label for="ev${e.id}">Source classification</label><select id="ev${e.id}" data-change="evidence" data-id="${e.id}" ${state.evidenceReviewed?"disabled":""}>${clsOptions.map(([v,t])=>`<option value="${v}" ${state.evidence[e.id]===v?"selected":""}>${esc(t)}</option>`).join("")}</select>${state.evidenceReviewed?`<div class="evidence-feedback ${state.evidence[e.id]===e.answer?"good":"bad"}"><strong>${state.evidence[e.id]===e.answer?"Supported classification":"Reconsider this classification"}</strong><p>${termHtml(e.why)}</p></div>`:""}</div></div>`).join("")}</div><div class="actions">${state.evidenceReviewed?`${journeyButton()}`:hButton("review-evidence","Review classifications →","primary",answered<D.evidence.length?"disabled":"")}</div>${state.evidenceReviewed?`<div class="status-banner ${correct===D.evidence.length?"good":"neutral"}">${correct} of ${D.evidence.length} classifications match the information provided. An allegation can still create a reasonable-suspicion reporting duty; a classification is not a substitute for safeguarding judgment.</div>${sourceHtml("evidence")}<details class="optional-review"><summary>Optional: repeat the evidence exercise</summary>${hButton("reset-evidence","Practice again","outline")}</details>`:""}</div>`;
}
function diagCount(){return D.assessment.diag.filter(d=>state.assessment.diagnostic[d.id]?.skill&&state.assessment.diagnostic[d.id]?.cause).length;}
function assessmentStage(index,answers){
 const base=D.assessment.stages[index];
 if(!base||index===0)return base;
 const previous=D.assessment.stages[index-1];
 const decision=answers?.[previous.title];
 const branch=base.branches?.[decision];
 if(!branch)return base;
 return {...base,lead:branch.lead,options:base.options.map(o=>({...o,text:branch.optionText?.[o.id]||o.text}))};
}
function assessScores(){
 const a=state.assessment;
 let skillCorrect=0,causeCorrect=0;
 D.assessment.diag.forEach(d=>{if(a.diagnostic[d.id]?.skill===d.skill)skillCorrect++;if(a.diagnostic[d.id]?.cause===d.cause)causeCorrect++;});
 const partA=(skillCorrect+causeCorrect)*2;
 let partB=0,critical=0;
 D.assessment.stages.forEach((s,i)=>{const scenario=assessmentStage(i,a.capstone),o=optionFor(scenario,a.capstone[s.title]);if(o){partB+=o.quality===2?s.points:o.quality===1?Math.round(s.points/2):0;if(o.critical)critical++;}});
 const manual=a.facilitatorScore===null?null:Number(a.facilitatorScore),total=partA+partB+(manual||0),gates=skillCorrect>=4&&causeCorrect>=4&&critical===0,pass=a.submitted&&manual!==null&&total>=90&&gates;
 return {skillCorrect,causeCorrect,partA,partB,critical,manual,total,gates,pass};
}
function assessmentReady(){const a=state.assessment;return diagCount()===D.assessment.diag.length&&D.assessment.stages.every((s,i)=>!!optionFor(assessmentStage(i,a.capstone),a.capstone[s.title]))&&a.transfer.trim().length>=40;}
function assessmentView(){
 const a=state.assessment,r=assessScores();
 if(a.submitted)return `<div class="section-top"><div><div class="kicker">05 · Pilot assessment</div><h2>Your decisions have been recorded.</h2><p>The assessment is a demonstration of the proposed scoring process, not an accredited certification.</p></div></div><div class="panel"><h3>Assessment breakdown</h3><div class="score-grid">${iconCard(r.partA+"/20","Diagnostic vignettes")}${iconCard(r.partB+"/70","Cascading capstone")}${iconCard(r.manual===null?"Pending":r.manual+"/10","Facilitator transfer review")}${iconCard(r.manual===null?"Pending":r.total+"/100","Total")}</div><div class="gate-grid"><div><strong>${r.skillCorrect}/5</strong><span>Management-skills classification</span></div><div><strong>${r.causeCorrect}/5</strong><span>Training vs. structural analysis</span></div><div><strong>${r.critical}</strong><span>Critical safety indicators missed</span></div></div><div class="status-banner ${r.manual===null?"neutral":r.pass?"good":"bad"}">${r.manual===null?"Transfer reflection awaits facilitator review; no competency status has been assigned.":r.pass?"All three proposed mastery gates are satisfied in this local demonstration.":"One or more proposed mastery gates are not satisfied; remediation and equivalent reassessment would be required."}</div><div class="actions">${hButton("go-facilitator","Continue to facilitator review →","primary")}</div></div><div class="panel"><h3>Capstone decision audit</h3>${D.assessment.stages.map((s,i)=>{const active=assessmentStage(i,a.capstone),o=optionFor(active,a.capstone[s.title]);const points=o.quality===2?s.points:o.quality===1?Math.round(s.points/2):0;return `<div class="audit-row"><div><strong>${esc(s.title)}</strong><p class="tiny muted"><strong>Conditions faced:</strong> ${termHtml(active.lead)}</p><p>${termHtml(o.feedback)}</p>${sourceHtml("assessment",i)}</div><span>${points}/${s.points} ${o.critical?" · Safety gate failed":""}</span></div>`}).join("")}</div>`;
 const diag=D.assessment.diag.map((d,i)=>`<div class="question-card"><span class="eyebrow">DIAGNOSTIC ${i+1} OF 5</span><p><strong>${esc(d.story)}</strong></p><div class="question-grid"><div><label for="skill${d.id}">Primary management skill</label><select id="skill${d.id}" data-change="diagnostic-skill" data-id="${d.id}"><option value="">Choose</option>${[["technical","Technical"],["human","Human"],["conceptual","Conceptual"]].map(([v,t])=>`<option value="${v}" ${a.diagnostic[d.id]?.skill===v?"selected":""}>${t}</option>`).join("")}</select></div><div><label for="cause${d.id}">Primary intervention needed</label><select id="cause${d.id}" data-change="diagnostic-cause" data-id="${d.id}"><option value="">Choose</option>${[["training","Training"],["policy","Policy correction"],["resources","Qualified staffing or other resources"]].map(([v,t])=>`<option value="${v}" ${a.diagnostic[d.id]?.cause===v?"selected":""}>${t}</option>`).join("")}</select></div></div></div>`).join("");
 const stageIndex=D.assessment.stages.findIndex((s,i)=>!optionFor(assessmentStage(i,a.capstone),a.capstone[s.title]));
 const completeStages=stageIndex<0?D.assessment.stages.length:stageIndex;
 const history=D.assessment.stages.slice(0,completeStages).map((s,i)=>{
  const variant=assessmentStage(i,a.capstone),o=optionFor(variant,a.capstone[s.title]);
  return `<div class="capstone-history-item"><div><strong>Stage ${i+1} · ${esc(s.title)}</strong><p>${esc(o?.text||"")}</p></div>${hButton("revise-capstone","Revise this stage","small",`data-stage="${i}"`)}</div>`;
 }).join("");
 const past=completeStages>0?`<details class="capstone-history"><summary>Review or revise earlier decisions (${completeStages})</summary>${history}</details>`:"";
 let cap;
 if(stageIndex>=0){
  const stage=assessmentStage(stageIndex,a.capstone);
  const previous=stageIndex>0?optionFor(assessmentStage(stageIndex-1,a.capstone),a.capstone[D.assessment.stages[stageIndex-1].title]):null;
  const options=orderedOptions(stage.options,"assessment:"+stageIndex+":"+(stageIndex?String(a.capstone[D.assessment.stages[stageIndex-1].title]):"entry")).map((o,j)=>`<label class="radio-line"><input type="radio" name="cap-${stageIndex}" value="${o.id}" data-change="capstone" data-stage="${esc(stage.title)}"><span>${String.fromCharCode(65+j)}. ${inlineTerms(o.text)}</span></label>`).join("");
  cap=`<div class="capstone-sequence" id="capstone-active"><span class="eyebrow">CONSEQUENCE PATH · STAGE ${stageIndex+1} OF ${D.assessment.stages.length} · ${stage.points} POINTS</span>${previous?`<div class="capstone-consequence"><strong>What happened next</strong><p>${esc(previous.consequence)}</p></div>`:""}<h4>${esc(stage.title)}</h4><p>${termHtml(stage.lead)}</p><p><strong>Choose your next response. Your decision will change the situation that follows.</strong></p><div class="radio-stack">${options}</div></div>${past}`;
 }else{
  const last=assessmentStage(D.assessment.stages.length-1,a.capstone),o=optionFor(last,a.capstone[last.title]);
  cap=`<div class="capstone-sequence" id="capstone-active"><span class="eyebrow">ALL FIVE STAGES COMPLETED</span><h4>Your decision trail is ready for submission</h4><p>${esc(o?.consequence||"")}</p><p>Review your choices below. Scoring and critical safety indicators remain hidden until submission. You may revise a stage, which will reset the later stages because their conditions depend on that decision.</p></div>${past}`;
 }
 return `<div class="section-top"><div><div class="kicker">05 · Competency demonstration</div><h2>Can you handle an unfamiliar case?</h2><p>The learning chapters teach. This practice assessment asks learners to apply judgment to a separate scenario.</p></div><span class="pill neutral">90/100 + two additional gates</span></div><div class="actions lesson-revisit">${hButton("review-lesson","Review the assessment lesson","outline")}</div><div class="note"><strong>Assessment integrity:</strong> This is a locally scored pilot prototype. A real cohort would require equivalent reassessment forms, specialist review of answer keys, trained second readers, and controlled assessment administration.</div><section class="panel"><h3>Part A · Diagnostic reasoning</h3><p>Five cases, two separate judgments each, 20 points total. At least four correct judgments are required for each objective.</p>${diag}</section><section class="panel"><h3>Part B · Cascading capstone</h3><p>Five connected responsibilities, 70 points. Each choice changes the next situation and its available responses. Scoring and critical safety gates remain hidden until submission.</p>${cap}</section><section class="panel"><h3>Part C · Workplace transfer plan</h3><p>Describe one realistic workplace change, the resource or barrier involved, and observable evidence that implementation occurred. A facilitator must award 0–10 points.</p><label for="assessName">Participant name (optional; avoid using child or family names)</label><input id="assessName" data-change="assess-name" value="${esc(a.name)}" maxlength="80" placeholder="Name or anonymous participant code"><label for="assessTransfer">Your 30-day plan (at least 40 characters)</label><textarea id="assessTransfer" data-change="assess-transfer" rows="5" placeholder="In my workplace I would ...">${esc(a.transfer)}</textarea><div class="actions">${hButton("submit-assessment","Submit and continue to facilitator review →","primary",assessmentReady()?"":"disabled")}</div><p class="muted tiny">Changing a selection automatically saves locally. Nothing is uploaded to a server by this application.</p></section>`;
}
function facilitatorView(){
 const a=state.assessment,r=assessScores();
 if(!a.submitted)return `<div class="section-top"><div><div class="kicker">07 · Facilitator review</div><h2>How the facilitator evaluates transfer.</h2><p>This is a read-only preview of the human-scored component. A completed assessment is required before scoring or exporting a learner record.</p></div></div><div class="panel"><h3>Transfer-plan scoring rubric</h3><p>${termHtml("The 30-day workplace transfer plan is worth 10 points and requires a human facilitator assessment rather than automatic software grading.")}</p><div class="rubric">${[["0–2","No actionable change or specific evidence"],["3–5","Action identified but obstacles or verification are weak"],["6–8","Feasible action, obstacle, and reasonable observable evidence"],["9–10","Specific ownership, feasible resources, measurable evidence, and follow-up"]].map(([score,desc])=>`<div><strong>${score}</strong><span>${desc}</span></div>`).join("")}</div><div class="callout"><strong>Three proposed mastery requirements</strong><p>At least 90/100 overall, at least four of five correct diagnostic judgments for each of two objectives, and no unresolved critical safety errors. Learner responses and facilitator feedback appear here after assessment submission.</p></div><p class="tiny muted">Previewing this page does not submit an assessment, assign a score, or award competency recognition.</p></div>`;
 return `<div class="section-top"><div><div class="kicker">06 · Facilitator workspace</div><h2>Score the transfer, not just the clicks.</h2><p>Review open-ended work, identify missed critical indicators, and export a locally generated record.</p></div></div><div class="layout-main"><section class="panel"><h3>Submitted learner response</h3><p><strong>Participant:</strong> ${esc(a.name||"Anonymous local participant")}</p><div class="callout"><strong>30-day implementation plan</strong><p class="prewrap">${esc(a.transfer)}</p></div><h4>Facilitator's anchored rubric</h4><div class="rubric">${[["0–2","No actionable change or specific evidence"],["3–5","Action identified but obstacles or verification are weak"],["6–8","Feasible action, obstacle, and reasonable observable evidence"],["9–10","Specific ownership, feasible resources, measurable evidence, and follow-up"]].map(([score,desc])=>`<div><strong>${score}</strong><span>${desc}</span></div>`).join("")}</div><label for="reviewer">Facilitator initials or review code (optional)</label><input id="reviewer" maxlength="80" value="${esc(a.reviewer||"")}" placeholder="Reviewer code"><label for="transferScore">Transfer-plan score (0–10)</label><input id="transferScore" type="number" min="0" max="10" step="1" value="${a.facilitatorScore===null?"":a.facilitatorScore}" placeholder="Enter score"><label for="reviewNote">Feedback and remediation notes</label><textarea id="reviewNote" rows="4" placeholder="Explain how the plan meets the rubric or needs further work.">${esc(a.facilitatorNote||"")}</textarea><div class="actions">${hButton("save-review","Save facilitator assessment","primary")}</div><div class="note tiny">This screen has no authentication and cannot verify that an independent facilitator actually reviewed the work. It is a demonstration of a human-scored workflow, not an official credentialing system.</div></section><aside class="sidepanel"><h3>Assessment gates</h3><div class="score-list"><div>Part A <strong>${r.partA}/20</strong></div><div>Part B <strong>${r.partB}/70</strong></div><div>Part C <strong>${r.manual===null?"Not reviewed":r.manual+"/10"}</strong></div><div>Total <strong>${r.manual===null?"Pending":r.total+"/100"}</strong></div></div><div class="separator"></div><p>Objective 1: <strong>${r.skillCorrect}/5</strong> (requires 4/5)</p><p>Objective 4: <strong>${r.causeCorrect}/5</strong> (requires 4/5)</p><p>Missed critical safety indicators: <strong>${r.critical}</strong> (requires zero)</p><div class="status-banner ${r.manual===null?"neutral":r.pass?"good":"bad"}">${r.manual===null?"Awaiting scored transfer plan":r.pass?"All pilot gates satisfied":"Remediation / reassessment needed"}</div><h4>Export this record</h4><div class="vertical-actions">${hButton("export-json","Download JSON report")}${hButton("export-csv","Download CSV summary")}${hButton("print","Print this page")}</div><p class="muted tiny">Exports are generated on this device. No learner or family data is sent to a provider, and there is no multi-learner dashboard or cloud synchronization.</p></aside></div>`;
}
function render(){
 const app=$("#app"),views={overview,chapters:chaptersView,cases:casesView,staff:staffView,evidence:evidenceView,assessment:assessmentView,facilitator:facilitatorView};
 const key=moduleKey(),content=state.page!=="cases"&&L.modules?.[key]&&!state.introSeen[key]?introductoryLesson(key):views[state.page]();
 app.innerHTML=`<div class="layout"><aside class="sidebar"><a class="brand" href="index.html"><span class="brand-emblem">✦</span><span>CARE WITH<br><strong>A COMPASS</strong></span></a><div class="sidebar-sub">Supervisor and Director Leadership</div><span class="version">COMPLETE PROGRAM · v9.7.0</span><nav aria-label="Unified program navigation">${nav()}</nav><div class="sidebar-bottom"><p>Leadership is what happens after the first correct answer.</p><span class="sidebar-current">Browse any section, or use Continue Training for the guided sequence. Progress stays saved in this browser.</span><small id="storageNote">Progress saves only in this browser.</small></div></aside><div class="workspace"><header class="topbar"><div><span class="top-eyebrow">KANSAS STATE UNIVERSITY · EDACE 830</span><h1>${esc(navLabels[state.page])}</h1></div><div class="topbar-right"><div class="utility-actions" role="group" aria-label="Training controls"><button type="button" class="utility-button" data-action="home" aria-label="Home, retain my training progress"><span aria-hidden="true">⌂</span> Home</button><button type="button" class="utility-button utility-reset" data-action="start-over" aria-label="Start Over, reset all training progress after confirmation"><span aria-hidden="true">↻</span> Start Over</button></div></div></header><main id="main" tabindex="-1">${content}</main><footer><span>Care with a Compass · Supervisor Leadership Program · v9.7.0</span><span>Fictional instructional composites · Specialist review required before pilot use</span></footer></div></div>`;
 document.title="Care with a Compass | Supervisor Leadership Program v9.7.0";
}
function returnHome(){go("overview");}
function startOverTraining(){
 if(!window.confirm("Start the ENTIRE training over? This will permanently clear your saved chapter answers, reflections, completed case decisions, lab progress, assessment responses, and facilitator review from this browser. Continue?"))return;
 try {
  for(const store of [localStorage,sessionStorage]){
   store.removeItem(KEY);
   store.removeItem("care-with-a-compass-supervisor-v72-72q");
  }
 }catch(err){window.alert("Could not clear your saved progress in this browser. Your training has not been restarted.");return;}
 state=initial();
 render();
 window.scrollTo({top:0,behavior:"auto"});
}
function go(page){if(!canOpen(page))return;if(page==="cases"&&!canOpenCase(state.caseId))state.caseId=D.cases[0].id;state.page=page;save();render();window.scrollTo({top:0,behavior:"auto"});}
function download(name,body,type){const blob=new Blob([body],{type}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function report(){
 const a=state.assessment,r=assessScores();
 return {application:"Care with a Compass",version:"9.7.0",generatedAt:new Date().toISOString(),participant:a.name||"Anonymous local participant",scores:{diagnostic:r.partA,capstone:r.partB,transfer:r.manual,total:r.manual===null?null:r.total},mastery:{objective1:r.skillCorrect,objective4:r.causeCorrect,criticalSafetyErrors:r.critical,provisionalStatus:r.manual===null?"facilitator review pending":r.pass?"all pilot gates met":"remediation required"},responses:{diagnostic:a.diagnostic,capstone:a.capstone,transferPlan:a.transfer},facilitator:{reviewer:a.reviewer,notes:a.facilitatorNote},warning:"Local practice demonstration only; not an accredited or verified competency certificate."};
}
function csv(x){return '"'+String(x??"").replace(/"/g,'""')+'"';}
document.addEventListener("click",e=>{
 const btn=e.target.closest("button[data-action]");if(!btn)return;
 const action=btn.dataset.action;
 if(action==="term"){const wasOpen=btn.getAttribute("aria-expanded")==="true";hideDefinitions();if(!wasOpen)btn.setAttribute("aria-expanded","true");return;}
 if(action==="complete-lesson"){const key=moduleKey();if(!L.modules?.[key])return;state.introSeen[key]=true;save();return render();}
 if(action==="start-training")return resumeLinear();
 if(action==="home")return returnHome();
 if(action==="start-over")return startOverTraining();
 if(action==="journey-next")return continueJourney();
 if(action==="review-lesson"){const key=moduleKey();delete state.introSeen[key];save();return render();}
 if(action==="nav")return go(btn.dataset.page);
 if(action==="enter-cases")return go("cases");
 if(action==="go-chapters")return go("chapters");
 if(action==="go-staff")return go("staff");
 if(action==="go-evidence")return go("evidence");
 if(action==="go-assessment")return go("assessment");
 if(action==="go-facilitator")return go("facilitator");
 if(action==="open-case"){if(!canOpenCase(btn.dataset.id))return;state.caseId=btn.dataset.id;return go("cases");}
 if(action==="case-answer"){
  const c=getCase(state.caseId),w=work(c.id);if(w.step>=c.stages.length||w.chosen[w.step])return;
  if(!optionFor(c.stages[w.step],btn.dataset.option))return;
  w.chosen[w.step]=btn.dataset.option;save();return render();
 }
 if(action==="case-next"){const c=getCase(state.caseId),w=work(c.id);if(!w.chosen[w.step])return;w.step=Math.min(w.step+1,c.stages.length);save();return render();}
 if(action==="reset-case"){if(!window.confirm("Restart this scenario and clear its local decision trail?"))return;state.caseWork[state.caseId]={step:0,chosen:[]};save();return render();}
 if(action==="review-evidence"){if(D.evidence.some(x=>!state.evidence[x.id]))return;state.evidenceReviewed=true;save();return render();}
 if(action==="reset-evidence"){state.evidence={};state.evidenceReviewed=false;save();return render();}
 if(action==="export-case"){const c=getCase(state.caseId),w=work(c.id);if(w.step<c.stages.length)return;const record={application:"Care with a Compass",version:D.version,caseTitle:c.title,startingConditions:selectedVariant(c).label,generatedAt:new Date().toISOString(),decisionTrail:w.chosen.map((id,i)=>{const o=optionFor(c.stages[i],id);return {stage:c.stages[i].title,decision:o.text,feedback:o.feedback,consequence:o.consequence,criticalSafetyConcern:o.critical}}),facilityConditions:caseConditions(c,w),notice:"Fictional local practice; not a professional competency certificate."};return download("CWC_v970_"+c.id+"_Decision_Trail.json",JSON.stringify(record,null,2),"application/json;charset=utf-8");}
 if(action==="revise-capstone"){const idx=Number(btn.dataset.stage);if(!Number.isInteger(idx)||idx<0||idx>=D.assessment.stages.length||state.assessment.submitted)return;for(let j=idx;j<D.assessment.stages.length;j++)delete state.assessment.capstone[D.assessment.stages[j].title];save();render();document.getElementById("capstone-active")?.scrollIntoView({block:"start",behavior:"auto"});return;}
 if(action==="submit-assessment"){if(!assessmentReady())return;state.assessment.submitted=true;state.assessment.facilitatorScore=null;save();return go("facilitator");}
 if(action==="reset-assessment"){if(!window.confirm("Clear this local practice assessment, including facilitator feedback?"))return;state.assessment=initial().assessment;save();return render();}
 if(action==="save-review"){
  const input=$("#transferScore"),score=input?.value.trim(),note=$("#reviewNote")?.value||"",reviewer=$("#reviewer")?.value||"";
  if(!/^(10|[0-9])$/.test(score||"")){window.alert("Enter a whole-number transfer score between 0 and 10.");return;}
  state.assessment.facilitatorScore=Number(score);state.assessment.facilitatorNote=note;state.assessment.reviewer=reviewer;save();return render();
 }
 if(action==="export-json"){if(!state.assessment.submitted)return;return download("Care_with_a_Compass_v970_Assessment_Report.json",JSON.stringify(report(),null,2),"application/json;charset=utf-8");}
 if(action==="export-csv"){if(!state.assessment.submitted)return;const r=report(),s=r.scores,m=r.mastery;const fields=["version","participant","diagnostic","capstone","transfer","total","objective1","objective4","criticalSafetyErrors","status","reviewer"];const values=[r.version,r.participant,s.diagnostic,s.capstone,s.transfer,s.total,m.objective1,m.objective4,m.criticalSafetyErrors,m.provisionalStatus,r.facilitator.reviewer];return download("Care_with_a_Compass_v970_Assessment_Summary.csv",fields.map(csv).join(",")+"\n"+values.map(csv).join(",")+"\n","text/csv;charset=utf-8");}
 if(action==="print")return window.print();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")hideDefinitions();});
 document.addEventListener("change",e=>{
 const el=e.target,type=el.dataset.change;if(!type)return;
 if(type==="variant-select"){if(state.variants[state.caseId]!==el.value&&work(state.caseId).chosen.length&&!window.confirm("Switching starting conditions restarts this scenario. Continue?"))return render();state.variants[state.caseId]=el.value;state.caseWork[state.caseId]={step:0,chosen:[]};}
 else if(type==="staff-plan"){state.staffing.plan=el.value;state.sequence.staffTouched=true;}
 else if(type==="staff-shock"){state.staffing.disruption=el.value;state.sequence.staffTouched=true;}
 else if(type==="staff-wage"){state.staffing.wage=Math.max(18,Math.min(45,Number(el.value)||23));state.sequence.staffTouched=true;}
 else if(type==="staff-attendance"){state.staffing.attendance=Math.max(6,Math.min(36,Number(el.value)||12));state.sequence.staffTouched=true;}
 else if(type==="staff-teachers"){state.staffing.qualifiedTeachers=Math.max(1,Math.min(4,Number(el.value)||1));state.sequence.staffTouched=true;}
 else if(type==="staff-window"){state.staffing.window=el.value;state.sequence.staffTouched=true;}
 else if(type==="staff-support"){state.staffing.support=el.value;state.sequence.staffTouched=true;}
 else if(type==="evidence"){if(!state.evidenceReviewed)state.evidence[el.dataset.id]=el.value;}
 else if(type==="diagnostic-skill"||type==="diagnostic-cause"){state.assessment.diagnostic[el.dataset.id]??={};state.assessment.diagnostic[el.dataset.id][type==="diagnostic-skill"?"skill":"cause"]=el.value;}
 else if(type==="capstone"){
   const idx=D.assessment.stages.findIndex(s=>s.title===el.dataset.stage);
   const selected=assessmentStage(idx,state.assessment.capstone);
   if(idx<0||!selected.options.some(o=>o.id===el.value))return;
   state.assessment.capstone[el.dataset.stage]=el.value;
   for(let j=idx+1;j<D.assessment.stages.length;j++)delete state.assessment.capstone[D.assessment.stages[j].title];
   save();render();document.getElementById("capstone-active")?.scrollIntoView({block:"start",behavior:"auto"});return;
  }
 else if(type==="assess-name"){state.assessment.name=el.value;}
 else return;
 save();render();
});
document.addEventListener("input",e=>{
 if(e.target?.dataset?.change==="assess-transfer"){state.assessment.transfer=e.target.value;save();const button=$('button[data-action="submit-assessment"]');if(button)button.disabled=!assessmentReady();}
});
window.addEventListener("message",e=>{const frame=document.getElementById("chaptersFrame");if(!frame||e.source!==frame.contentWindow)return;const data=e.data;if(data?.app==="care-with-a-compass"&&data.kind==="course-height"&&Number.isFinite(Number(data.height))){frame.style.height=Math.max(650,Math.min(25000,Number(data.height)+25))+"px";}});
if(!canOpen(state.page))state.page="overview";
 if(state.page==="cases"&&!canOpenCase(state.caseId))state.caseId=D.cases[0].id;
 render();
})();
