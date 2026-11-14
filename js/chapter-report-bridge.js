/* Embedded-course bridge: learner-controlled chapter submission, never automatic. */
(function(global){
"use strict";
if(global.parent===global)return;
const STORAGE="care-with-a-compass-supervisor-v72-72q";
function read(){
 try{return JSON.parse(localStorage.getItem(STORAGE)||sessionStorage.getItem(STORAGE)||"null")||{};}catch(e){return {};}
}
function summary(ch){
 const s=read();
 const questions=(global.LWM_DATA?.questions||[]).filter(q=>q.chapter===ch);
 const responses=(s.history?.[ch]||[]),first={},latest={};
 for(const a of responses){if(!(a.id in first))first[a.id]=a;latest[a.id]=a;}
 let firstTryCorrect=0,finalCorrect=0;
 const firstTryGaps=[],outstandingGaps=[];
 for(const q of questions){
  const tag=q.id+" · objective "+(q.objective??"?")+" · "+(q.family||"general");
  if(first[q.id]?.correct===true)firstTryCorrect++;else firstTryGaps.push(tag);
  if(latest[q.id]?.correct===true)finalCorrect++;else outstandingGaps.push(tag);
 }
 return {chapter:ch,title:String(global.LWM_DATA?.lessons?.[ch-1]?.title||"Leadership chapter"),
  totalQuestions:questions.length,uniqueQuestions:Object.keys(latest).length,attempts:responses.length,
  firstTryCorrect,finalCorrect,needsLiveCoaching:!!s.needsWorkshop?.[ch],
  firstTryGaps,outstandingGaps};
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
