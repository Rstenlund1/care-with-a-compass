'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/../consequence-lab.html','utf8');
let script=html.match(/<script>([\s\S]*?)<\/script>/)[1];script=script.slice(0,script.lastIndexOf('\nrender();'));
const ctx={window:{location:{search:''},__cwcInitialInfants:0},localStorage:{getItem(){return null},setItem(){}},document:{body:{classList:{add(){}}}},Math,Date,console};
vm.createContext(ctx);vm.runInContext(script,ctx);vm.runInContext('render=()=>{}',ctx);
const ids=vm.runInContext('CASES.map(c=>c.id)',ctx),variants=vm.runInContext('VARIANTS',ctx),steps=vm.runInContext('SIX_STAGES',ctx);
const configs=[['preschool',18,2,0],['preschool',12,2,0],['toddler',12,2,0],['school',28,2,0],['familySmall',6,1,0],['familySmall',8,1,2],['familyLarge',12,2,3],['familyLarge',14,2,3]];
function begin(id,type,kids,staff,infants){ctx.window.__cwcInitialInfants=infants;ctx.__id=id;vm.runInContext('prepare('+JSON.stringify(type)+','+kids+','+staff+');session.order=[__id];session.index=0;beginCase()',ctx);return vm.runInContext('session.case',ctx);}
function stage(){return vm.runInContext('stage(session.case)',ctx)}
function choose(o){ctx.__o=o;vm.runInContext('apply(session.case,__o)',ctx);delete ctx.__o}
let full=0,answers=0;
for(const id of ids)for(const [type,kids,staff,infants] of configs)for(const [variant,reveal] of variants[id]){
 const s=begin(id,type,kids,staff,infants);s.variant=variant;s.reveal=reveal;
 for(const step of steps){
  assert.equal(s.step,step,id+' wrong step');let sc=stage();
  assert(sc.title&&sc.body&&sc.opts.length===5,id+' missing choices');
  assert.equal(new Set(sc.opts.map(o=>o.t)).size,5,id+' duplicate answers');
  const saved=JSON.stringify(s);
  for(const o of sc.opts){
   assert(Number.isInteger(o.g)&&o.g>=0&&o.g<=3&&o.w);
   choose(o);answers++;
   assert(!(o.g>=2&&s.failed),id+' good answer caused critical failure');
   Object.keys(s).forEach(k=>delete s[k]);Object.assign(s,JSON.parse(saved));
  }
  const best=sc.opts.find(o=>o.g===3);assert(best,id+' no correct answer');
  choose(best);assert(!s.failed,id+' best answer failed');
  s.log.push({step,grade:best.g});s.answered=true;vm.runInContext('advance()',ctx);
 }
 let report=vm.runInContext('session.reports[0]',ctx);
 assert(report&&report.log.length===6&&report.score===18,id+' invalid report');full++;
}
assert.equal(ids.length,12);
let s=begin('staffingGap','preschool',18,2,0),sc=stage();
for(const fragment of ['Take in only a few more children','Admit children based solely on the posted roster']){
 const o=sc.opts.find(x=>x.t.includes(fragment));assert(o,fragment);
 assert.equal(o.g,0,fragment+' must score zero');const saved=JSON.stringify(s);choose(o);
 assert.equal(s.failed,true);assert.equal(s.failureReason,'Children were admitted without required qualified coverage.');
 Object.keys(s).forEach(k=>delete s[k]);Object.assign(s,JSON.parse(saved));
}
const app=fs.readFileSync(__dirname+'/../js/v92-app.js','utf8');
assert(app.includes('consequence-lab.html?v=10.9.1&embedded=1'),'course embeds old lab');
assert(app.includes('r.log.length===6'),'course still checks 12 decisions');
const csv=fs.readFileSync(__dirname+'/../SCENARIO_ANSWER_ATLAS_v10.9.1.csv','utf8');
assert.equal(csv.trim().split(/\r?\n/).length,721,'atlas does not have 720 records');
console.log('PASS: '+ids.length+' cases, '+full+' optimal runs, '+answers+' answer checks, scoring fix and integration wiring');
