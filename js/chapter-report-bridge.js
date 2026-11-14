/* Bridge for the embedded five-chapter engine: report only at chapter completion. */
(function(global){
"use strict";
if(global.parent===global||typeof global.finishChapter!=="function")return;
const STORAGE="care-with-a-compass-supervisor-v72-72q";
function read(){try{return JSON.parse(localStorage.getItem(STORAGE)||sessionStorage.getItem(STORAGE)||"null")||{};}catch(e){return {};}}
function summary(ch,s){
 const questions=(global.LWM_DATA?.questions||[]).filter(q=>q.chapter===ch);
 const responses=(s.history?.[ch]||[]),first={},latest={};
 for(const a of responses){if(!(a.id in first))first[a.id]=a;latest[a.id]=a;}
 const firstGaps=[],outstanding=[];
 let firstTryCorrect=0,finalCorrect=0;
 for(const q of questions){
  if(first[q.id]?.correct===true)firstTryCorrect++;else firstGaps.push(q.id+" · objective "+(q.objective??"?")+" · "+(q.family||"general"));
  if(latest[q.id]?.correct===true)finalCorrect++;else outstanding.push(q.id+" · objective "+(q.objective??"?")+" · "+(q.family||"general"));
 }
 return {chapter:ch,title:String(global.LWM_DATA?.lessons?.[ch-1]?.title||"Leadership chapter"),
  totalQuestions:questions.length,uniqueQuestions:Object.keys(latest).length,attempts:responses.length,
  firstTryCorrect,finalCorrect,needsLiveCoaching:!!s.needsWorkshop?.[ch],
  firstTryGaps:firstGaps,outstandingGaps:outstanding};
}
const original=global.finishChapter;
global.finishChapter=function(){
 const before=read();const ch=Number(before.chapter)||1;
 const already=Array.isArray(before.done)&&before.done.includes(ch);
 const result=original.apply(this,arguments);
 const after=read();const completed=Array.isArray(after.done)&&after.done.includes(ch);
 if(!already&&completed&&ch>=1&&ch<=5){
  try{global.parent.postMessage({app:"care-with-a-compass",kind:"chapter-complete",payload:summary(ch,after)},global.location.origin);}catch(e){/* course is usable without reporting */}
 }
 return result;
};
})(window);
