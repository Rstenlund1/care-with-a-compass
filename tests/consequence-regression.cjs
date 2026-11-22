const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/../consequence-lab.html','utf8');
let script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
script=script.slice(0,script.lastIndexOf('\nrender();'));
const store=new Map();const sandbox={window:{location:{search:''},__cwcInitialInfants:0},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},document:{body:{classList:{add(){}}}},Date,Math,console};vm.createContext(sandbox);vm.runInContext(script,sandbox);
let count=0;function test(name,fn){try{fn();count++;console.log('PASS',name)}catch(e){console.error('FAIL',name,e.message);process.exitCode=1}}
function setup(id,type='preschool',children=12,staff=2,infants=0){sandbox.window.__cwcInitialInfants=infants;vm.runInContext(`prepare(${JSON.stringify(type)},${children},${staff});session.order=[${JSON.stringify(id)}];session.index=0;beginCase()`,sandbox);return vm.runInContext('session.case',sandbox)}
function applyChoice(s,step,needle){s.step=step;const options=vm.runInContext('stage(session.case).opts',sandbox);const o=options.find(x=>x.t.includes(needle));assert(o,`missing ${needle} in ${s.id} step ${step}: ${options.map(x=>x.t).join(' / ')}`);sandbox.__choice=o;vm.runInContext('apply(session.case,__choice)',sandbox);delete sandbox.__choice;return s}
for(const [id,step,phrase] of [
 ['bus',0,'Send the only supervising teacher'],['parent',0,'leave the child unattended'],['monitor',0,'Place the volunteer on the bus'],['monitor',0,'interior mirror'],['nose',1,'adjacent room'],['nose',1,'unverified aide'],['nose',7,'Leave the child in an office alone'],['directorPickup',1,'Leave the children unattended'],['hospitalHandoff',1,'Send the caregiver while leaving coverage unresolved']
])test(`abandonment ${id}/${step} ${phrase}`,()=>{let s=setup(id);if(id==='nose'&&step===7)s.parent='unreachable';applyChoice(s,step,phrase);assert.equal(s.failed,true)});
for(const [id,step,phrase] of [['directorPickup',3,'Show the footage publicly'],['hospitalHandoff',3,'Rewrite the original report']])test(`non-supervision ${id}`,()=>{let s=setup(id,'preschool',18,1);applyChoice(s,step,phrase);assert.equal(s.failed,false)});
test('sole provider staffingGap does not empty classroom',()=>{let s=setup('staffingGap','familySmall',6,1);assert.equal(s.staff,1);applyChoice(s,0,'Verify actual qualified coverage');assert(s.children>0)});
test('12 children / 2 adults: a covered noncritical response remains valid',()=>{let s=setup('nose');applyChoice(s,0,'Lean the child forward');assert.equal(s.failed,false)});
for(const id of ['nose','arm','fight','ill','bus','bruise','parent','monitor','directorPickup','hospitalHandoff','staffingGap'])test('12-step optimal playthrough '+id,()=>{
 let s=setup(id,'preschool',18,2);
 for(let step=0;step<12;step++){
  s.step=step;
  let opts=vm.runInContext('stage(session.case).opts',sandbox);
  let o=opts.find(x=>x.g===3);assert(o,`no optimal option at ${id}/${step}`);
  sandbox.__choice=o;vm.runInContext('apply(session.case,__choice)',sandbox);delete sandbox.__choice;
  assert.equal(s.failed,false,`unexpected failure at ${id}/${step}: ${s.failureReason}`);
 }
 assert.equal(s.score,36);
});
console.log(`${count} JavaScript engine regression tests passed`);
