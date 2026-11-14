/* Embedded-course bridge: learner-controlled chapter submission, never automatic. */
(function(global){
"use strict";
if(global.parent===global)return;
const STORAGE="care-with-a-compass-supervisor-v72-72q";
function read(){
 try{return JSON.parse(localStorage.getItem(STORAGE)||sessionStorage.getItem(STORAGE)||"null")||{};}catch(e){return {};}
}
function responseDescription(question,code){
 const parts=String(code??"").split("|").map(x=>x.trim()).filter(Boolean);
 if(!parts.length)return "No selection saved";
 return parts.map(letter=>{
  const index=letter.toUpperCase().charCodeAt(0)-65;
  return letter+". "+String(question.choices?.[index]||"[selection unavailable]");
 }).join(" | ");
}
function summary(ch){
 const state=read();
 const questions=(global.LWM_DATA?.questions||[]).filter(q=>q.chapter===ch);
 const responses=(state.history?.[ch]||[]);
 const first={},latest={},counts={};
 for(const answer of responses){
  if(!(answer.id in first))first[answer.id]=answer;
  latest[answer.id]=answer;
  counts[answer.id]=(counts[answer.id]||0)+1;
 }
 let firstTryCorrect=0,finalCorrect=0;
 const firstTryGaps=[],outstandingGaps=[],missedQuestions=[],questionResults=[];
 for(const q of questions){
  const earliest=first[q.id],last=latest[q.id];
  const tag=q.id+" · objective "+(q.objective??"?")+" · "+(q.family||"general");
  if(earliest?.correct===true)firstTryCorrect++;else firstTryGaps.push(tag);
  if(last?.correct===true)finalCorrect++;else outstandingGaps.push(tag);
  const outcome={id:q.id,objective:q.objective,question:q.scenario,
   firstAnswer:responseDescription(q,earliest?.option),
   preferredAnswer:responseDescription(q,q.answer),
   latestAnswer:responseDescription(q,last?.option),
   firstCorrect:earliest?.correct===true,finalCorrect:last?.correct===true,
   attempts:counts[q.id]||0};
  questionResults.push({
   id:q.id,objective:q.objective,first:earliest?.correct===true?"met":"needs review",
   latest:last?.correct===true?"met":"needs review",attempts:counts[q.id]||0,
   firstChoice:String(earliest?.option??"none"),latestChoice:String(last?.option??"none")});
  if(earliest?.correct!==true||last?.correct!==true){
   const selected=String(earliest?.option||"").split("|")[0];
   outcome.feedbackForFirstAnswer=q.feedback?.[selected]?.text||q.rationale||"";
   outcome.whyPreferred=q.rationale||"";
   outcome.recovered=earliest?.correct!==true&&last?.correct===true;
   missedQuestions.push(outcome);
  }
 }
 return {chapter:ch,title:String(global.LWM_DATA?.lessons?.[ch-1]?.title||"Leadership chapter"),
  totalQuestions:questions.length,uniqueQuestions:Object.keys(latest).length,attempts:responses.length,
  firstTryCorrect,finalCorrect,needsLiveCoaching:!!state.needsWorkshop?.[ch],
  firstTryGaps,outstandingGaps,missedQuestions,questionResults};
}
function notifyProgress(){
 const state=read();
 try{
  global.parent.postMessage({app:"care-with-a-compass",kind:"chapter-progress",
   done:Array.isArray(state.done)?state.done.filter(ch=>Number.isInteger(ch)&&ch>=1&&ch<=5):[],
   capstone:!!state.capstone?.completed},global.location.origin);
 }catch(e){}
}
global.addEventListener("message",e=>{
 if(e.origin!==global.location.origin||e.source!==global.parent)return;
 const message=e.data;
 if(message?.app!=="care-with-a-compass"||message.kind!=="chapter-submit-status")return;
 const ch=Number(message.chapter);
 if(Number.isInteger(ch)&&ch>=1&&ch<=5){
  global.chapterResultStatus?.(ch,message.status);
 }
});
global.CWC_CHAPTER_REPORT={summary,notifyProgress};
global.addEventListener("load",notifyProgress);
notifyProgress();
})(window);
