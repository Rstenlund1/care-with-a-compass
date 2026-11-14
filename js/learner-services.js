/* Care with a Compass v9.8 · opt-in learner records and Formspree-ready reporting.
   Public website code never contains an email password or private API key. */
(function(global){
"use strict";
const STORAGE="cwc-learner-record-v1";
const VERSION="9.8.0";
const MAX_REPORTS=100;
function baseline(){return {name:"",organization:"",consent:false,sessionId:"",registeredAt:"",completedAt:"",reports:[]};}
function read(){try{const o=JSON.parse(localStorage.getItem(STORAGE)||"null");return o&&typeof o==="object"?{...baseline(),...o,reports:Array.isArray(o.reports)?o.reports.slice(-MAX_REPORTS):[]}:baseline();}catch(e){return baseline();}}
let record=read(),sending=false;
function write(){try{localStorage.setItem(STORAGE,JSON.stringify(record));}catch(e){/* A browser that blocks storage cannot preserve course reports. */}}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function ready(){return record.consent===true&&record.name.trim().length>=2;}
function endpoint(){return String(global.CWC_REPORT_ENDPOINT||"").trim();}
function configured(){return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint());}
function enrollView(){
 return '<div class="learner-onboarding"><section class="learner-onboarding-panel">'
 +'<div class="eyebrow">CARE WITH A COMPASS · THE DIRECTOR\'S DESK</div>'
 +'<h1>Begin your leadership journey.</h1>'
 +'<p class="learner-creator">A training program created by <strong>Richard Lawrence Stenlund</strong></p>'
 +'<p>Introduce yourself before starting. Your name will appear on your completion certificate and on the chapter progress reports your instructor uses for coaching.</p>'
 +'<form id="cwc-learner-form">'
 +'<label for="cwc-name">Full name <span aria-hidden="true">*</span></label>'
 +'<input id="cwc-name" name="cwc-name" required minlength="2" maxlength="80" autocomplete="name" value="'+esc(record.name)+'" placeholder="First and last name">'
 +'<label for="cwc-organization">Company, center or organization (optional)</label>'
 +'<input id="cwc-organization" name="cwc-organization" maxlength="100" value="'+esc(record.organization)+'" placeholder="Leave blank if not applicable">'
 +'<label class="learner-agreement"><input type="checkbox" id="cwc-agree" required '+(record.consent?'checked':'')+'><span>I understand that my name, organization (if provided), chapter performance and final assessment results may be shared with the program instructor through an email reporting provider. I will avoid including private information about children, families or coworkers in my training responses.</span></label>'
 +'<p class="learner-privacy-note">Progress is stored in this browser. This demonstration does not authenticate users or verify identities. No report is transmitted until an instructor-owned email endpoint is configured.</p>'
 +'<div id="cwc-enroll-error" role="alert" class="learner-enroll-error"></div>'
 +'<button type="submit" class="btn primary">Start training →</button>'
 +'</form></section></div>';
}
function enroll(){
 const name=String(document.getElementById("cwc-name")?.value||"").trim().replace(/\s+/g," ").slice(0,80);
 const organization=String(document.getElementById("cwc-organization")?.value||"").trim().slice(0,100);
 const consent=!!document.getElementById("cwc-agree")?.checked;
 const error=document.getElementById("cwc-enroll-error");
 if(name.length<2||!consent){if(error)error.textContent="Enter your name and acknowledge the reporting notice before continuing.";return false;}
 const changed=record.name!==name;
 record.name=name;record.organization=organization;record.consent=true;
 if(!record.sessionId||changed){record.sessionId="cw"+Date.now().toString(36)+Math.random().toString(36).slice(2,9);}
 record.registeredAt=record.registeredAt||new Date().toISOString();
 write();if(configured())void flush();
 return true;
}
function notice(){
 if(!ready())return "";
 const left=record.reports.filter(x=>x.status!=="sent").length;
 return '<div class="learner-status"><strong>Participant:</strong> '+esc(record.name)+(record.organization?" · "+esc(record.organization):"")
 +(configured()?(left?' · '+left+' report(s) awaiting delivery':' · Instructor reporting connected'):' · Email reporting awaits instructor setup')
 +'</div>';
}
function reportText(detail){
 return Object.entries(detail||{}).map(([k,v])=>k+": "+(Array.isArray(v)?v.join("; "):String(v??""))).join("\n").slice(0,14000);
}
function queue(kind,key,title,detail){
 if(!ready()||record.reports.some(r=>r.key===key))return false;
 record.reports.push({kind,key,title:String(title).slice(0,100),detail,createdAt:new Date().toISOString(),status:"pending"});
 record.reports=record.reports.slice(-MAX_REPORTS);write();
 if(configured())void flush();return true;
}
async function flush(){
 if(sending||!ready()||!configured())return;
 sending=true;
 try {
  for(const item of record.reports.filter(x=>x.status!=="sent").slice(0,20)){
   try{
    const response=await fetch(endpoint(),{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({
     subject:"Care with a Compass · "+item.title+" · "+record.name,
     name:record.name,organization:record.organization||"Not specified",
     session_id:record.sessionId,report_type:item.kind,report_date:item.createdAt,
     report_details:reportText(item.detail),version:VERSION
    })});
    if(!response.ok)throw Error("Form reporting service returned "+response.status);
    item.status="sent";item.sentAt=new Date().toISOString();delete item.error;write();
   }catch(e){item.error="Delivery failed; stored locally for a retry.";write();break;}
  }
 }finally{sending=false;}
}
function chapterCompleted(payload){
 const ch=Number(payload?.chapter);
 if(!Number.isInteger(ch)||ch<1||ch>5||!payload||typeof payload!=="object")return false;
 const safe={
  chapter:ch,chapterTitle:String(payload.title||"").slice(0,120),
  uniqueQuestions:Number(payload.uniqueQuestions)||0,totalQuestions:Number(payload.totalQuestions)||0,
  attempts:Number(payload.attempts)||0,
  firstTryCorrect:Number(payload.firstTryCorrect)||0,finalCorrect:Number(payload.finalCorrect)||0,
  needsLiveCoaching:!!payload.needsLiveCoaching,
  firstTryGaps:Array.isArray(payload.firstTryGaps)?payload.firstTryGaps.slice(0,25).map(x=>String(x).slice(0,90)):[],
  outstandingGaps:Array.isArray(payload.outstandingGaps)?payload.outstandingGaps.slice(0,25).map(x=>String(x).slice(0,90)):[]
 };
 return queue("chapter","chapter-"+ch,"Chapter "+ch+" results",safe);
}
function assessmentSubmitted(r){
 const m=r?.mastery||{},s=r?.scores||{};
 return queue("assessment","assessment-submit","Final assessment submitted",{
  scoredBeforeFacilitator:(Number(s.diagnostic)||0)+(Number(s.capstone)||0),
  diagnosticScore:s.diagnostic??"Pending",adaptiveCapstoneScore:s.capstone??"Pending",
  objectiveOneCorrect:m.objective1??"Pending",objectiveFourCorrect:m.objective4??"Pending",
  criticalSafetyErrors:m.criticalSafetyErrors??"Pending",
  workplaceTransfer:"Awaiting facilitator review",
  fullResult:"Available only after independent facilitator review",
  decisionIDs:JSON.stringify(r?.responses?.capstone||{}).slice(0,1500)
 });
}
function facilitatorReviewed(r){
 const s=r?.scores||{},m=r?.mastery||{};
 return queue("facilitator","facilitator-"+Date.now(),"Facilitator review updated",{
  diagnosticScore:s.diagnostic??"Pending",capstoneScore:s.capstone??"Pending",transferScore:s.transfer??"Pending",
  totalScore:s.total??"Pending",objectiveOneCorrect:m.objective1??"Pending",
  objectiveFourCorrect:m.objective4??"Pending",criticalSafetyErrors:m.criticalSafetyErrors??"Pending",
  provisionalResult:m.provisionalStatus||"Pending"
 });
}
function certificateEligible(state,foundationReady,casesDone){
 return ready()&&!!foundationReady&&!!casesDone&&!!state?.sequence?.staffTouched&&!!state?.sequence?.staffCompleted&&!!state?.evidenceReviewed&&!!state?.assessment?.submitted;
}
function certificateAction(state,foundationReady,casesDone){
 return certificateEligible(state,foundationReady,casesDone)
 ?'<button type="button" class="btn primary" data-action="print-completion-certificate">View and print completion certificate</button>':"";
}
function certificatePrint(state,foundationReady,casesDone){
 if(!certificateEligible(state,foundationReady,casesDone))return false;
 if(!record.completedAt){record.completedAt=new Date().toISOString();write();}
 const when=new Date(record.completedAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Care with a Compass · Certificate of Completion</title>'
 +'<style>@page{size:letter landscape;margin:.35in}*{box-sizing:border-box}body{margin:0;background:#fff;font-family:Georgia,serif;color:#281d3c}.certificate{border:10px double #795d91;padding:30px 50px;height:7.6in;text-align:center;display:flex;flex-direction:column;justify-content:space-between;background:#fffdf8}.brand{font:700 14px system-ui;letter-spacing:.22em;color:#76518a}.kicker{font:11px system-ui;letter-spacing:.16em;color:#8b707f}.title{font-size:44px;margin:10px 0}.named{font-size:34px;color:#563272;margin:16px 0;border-bottom:1px solid #d8c7ad;padding-bottom:10px}.body{font-size:17px;line-height:1.7;max-width:660px;margin:auto}.sign{display:flex;justify-content:space-between;gap:40px;margin-top:35px;font-size:15px}.sign span{border-top:1px solid #7b6476;padding-top:7px;min-width:240px}.disclaimer{font:10px/1.5 system-ui;color:#645b65}.print{position:fixed;top:12px;right:20px;padding:10px 18px;border-radius:9px;background:#41285c;color:white;border:0;cursor:pointer}@media print{.print{display:none}}</style></head><body>'
 +'<button class="print" type="button" onclick="window.print()">Print / save as PDF</button>'
 +'<article class="certificate"><div><p class="brand">CARE WITH A COMPASS</p><p class="kicker">THE DIRECTOR&#39;S DESK · SUPERVISORY LEADERSHIP</p></div>'
 +'<div><h1 class="title">Certificate of Completion</h1><div class="kicker">PRESENTED TO</div><div class="named">'+esc(record.name)+'</div>'
 +(record.organization?'<p class="kicker">'+esc(record.organization)+'</p>':'')
 +'<p class="body">For completing the five guided leadership chapters, applied case simulations, staffing and evidence exercises, and the final assessment of <em>Care with a Compass: The Director&#39;s Desk</em>.</p></div>'
 +'<div><div class="sign"><span>'+esc(when)+'<br><small>Date completed</small></span><span>Richard Lawrence Stenlund<br><small>Program creator</small></span></div>'
 +'<p class="disclaimer">This certificate acknowledges completion of an independent educational prototype. It does not establish professional competence, licensing, mandated-reporter certification or accredited continuing-education hours.</p></div>'
 +'</article></body></html>';
 const tab=global.open("","_blank");
 if(!tab){global.alert("Your browser blocked the certificate window. Allow pop-ups for this website and try again.");return false;}
 tab.document.open();tab.document.write(html);tab.document.close();return true;
}
function resetProgress(){record.reports=[];record.completedAt="";record.sessionId="cw"+Date.now().toString(36)+Math.random().toString(36).slice(2,9);write();}
function forgetLearner(){try{localStorage.removeItem(STORAGE);}catch(e){}record=baseline();}
global.CWC_LEARNER={ready,enrollView,enroll,notice,queue,flush,resetProgress,forgetLearner,chapterCompleted,assessmentSubmitted,facilitatorReviewed,certificateEligible,certificateAction,certificatePrint,profile:()=>({...record})};
if(configured()&&ready())global.addEventListener("load",()=>void flush());
})(window);
