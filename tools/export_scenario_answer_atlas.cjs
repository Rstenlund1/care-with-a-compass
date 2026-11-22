'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'consequence-lab.html'),'utf8');
let script=html.match(/<script>([\s\S]*?)<\/script>/)[1];script=script.slice(0,script.lastIndexOf('\nrender();'));
const ctx={window:{location:{search:''},__cwcInitialInfants:0},localStorage:{getItem(){return null},setItem(){}},document:{body:{classList:{add(){}}}},Math,Date,console};
vm.createContext(ctx);vm.runInContext(script,ctx);vm.runInContext('render=()=>{}',ctx);
const ids=vm.runInContext('CASES.map(c=>c.id)',ctx),steps=vm.runInContext('SIX_STAGES',ctx),sources=vm.runInContext('SOURCE',ctx);
const rows=[['Facility mode','Scenario ID','Decision','Heading','Scenario prompt','Answer score (0–3)','Answer text','Explanation','Critical rule','Source URL','Observed critical failure','Engine failure reason']];
function csv(v){let s=String(v??'');return /[\r\n",]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
for(const [type,kids,staff,infants] of [['preschool',18,2,0],['familySmall',6,1,0]])for(const id of ids){
 ctx.window.__cwcInitialInfants=infants;ctx.__id=id;
 vm.runInContext('prepare('+JSON.stringify(type)+','+kids+','+staff+');session.order=[__id];session.index=0;beginCase()',ctx);
 const s=vm.runInContext('session.case',ctx);
 for(const step of steps){
  if(s.step!==step)throw Error(id+' wrong decision');
  const sc=vm.runInContext('stage(session.case)',ctx);
  for(const o of sc.opts){
   const saved=JSON.stringify(s);ctx.__o=o;vm.runInContext('apply(session.case,__o)',ctx);delete ctx.__o;
   const failed=!!s.failed,reason=s.failureReason||'';
   Object.keys(s).forEach(k=>delete s[k]);Object.assign(s,JSON.parse(saved));
   const rule=failed&&reason==='Children were admitted without required qualified coverage.'?'Explicit critical reason: '+reason:o.e?.criticalReason?'Explicit critical reason: '+o.e.criticalReason:o.e?.abandonment?'Explicit supervision abandonment':o.e?.staffDelta?'Actual post-departure coverage evaluated':o.g===0?'Unsafe decision, not by itself an automatic critical failure':'Not a critical failure trigger';
   rows.push([type,id,vm.runInContext('decisionNumber(session.case)',ctx),sc.title,sc.body,o.g,o.t,o.w,rule,sources[sc.src].u,failed?'YES':'NO',reason]);
  }
  const best=sc.opts.find(o=>o.g===3);ctx.__o=best;vm.runInContext('apply(session.case,__o)',ctx);delete ctx.__o;
  s.answered=true;vm.runInContext('advance()',ctx);
 }
}
fs.writeFileSync(path.join(root,'SCENARIO_ANSWER_ATLAS_v10.9.1.csv'),rows.map(r=>r.map(csv).join(',')).join('\r\n')+'\r\n');
console.log('PASS: exported '+(rows.length-1)+' answer evaluations');
