#!/usr/bin/env python3
"""Release integrity gate for the question bank, source lists and capstone."""
from pathlib import Path
import json,re,collections,subprocess,sys
root=Path(__file__).resolve().parents[1]
d=json.loads((root/'data/questions.json').read_text(encoding='utf-8'))
q=d['questions']; app=(root/'js/app.js').read_text(encoding='utf-8')
assert len(q)==72,(len(q),'questions rather than 72')
ids=[x['id'] for x in q];assert len(ids)==len(set(ids)), 'Duplicate question IDs'
assert len(d['lessons'])==5 and len(d['lensCases'])==7
for x in q:
 labels=[chr(65+j) for j in range(len(x['choices']))]
 assert len(labels)==5,(x['id'],'expected 5 choices')
 assert set(x['feedback'])==set(labels),(x['id'],'missing feedback')
 gold=x.get('answerSet') if x.get('multi') else [x['answer']]
 assert set(gold)<=set(labels),(x['id'],'invalid key')
 if x.get('multi'):
  assert x['answer']=='|'.join(gold),(x['id'],'multi answer mismatch')
 else:
  assert 'answerSet' not in x,(x['id'],'stale answerSet')
  assert len(gold)==1,(x['id'],'invalid single key')
 for k in gold:
  assert x['feedback'][k]['type']=='preferred',(x['id'],k,'correct action not labelled preferred')
 for k in labels:
  assert bool(k in gold)==(x['feedback'][k]['type']=='preferred'),(x['id'],k,'feedback disagrees with key')
 for k in x.get('acceptable',{}):
  assert k not in gold and x['feedback'][k]['type']=='acceptable',(x['id'],k,'unsafe partial score mapping')
 for k in labels:
  if x['feedback'][k]['type']=='acceptable':
   assert k in x.get('acceptable',{}),(x['id'],k,'missing acceptable entry')
  assert x['feedback'][k]['text'].strip(),(x['id'],k,'empty rationale')
 assert all(k in d['sourceMap'] for k in x['refs']),(x['id'],'bad source ref')
for phrase in ['exceptional needs adjustment','severely disabled','50% increase','50% reimbursement','chs-ca.org']:
 assert phrase.lower() not in d['lessons'][2]['html'].lower(),('retired subsidy text in chapter 3',phrase)
 assert all(phrase.lower() not in ' '.join(s).lower() for s in d['sources']),('retired subsidy source',phrase)
assert all(x[1]=='' for x in d['sources'][:4]),'Academic entries must not be links'
assert 'item.family||item.familyPerspective' not in app,'Broken extra lens keys'
assert 'showLens(this,${6+idx})' in app,'Additional lenses must be interactive'
assert '<strong>60</strong><span>Applied questions</span>' not in app,'Outdated 60 count'
assert 'The academy now contains twelve practice questions' not in app,'Outdated 12 count'
assert '<td>12</td></tr>' not in app,'Stale 12-per-chapter table'
assert all(f'${{chItems({i}).length}}' in app for i in range(1,6)), 'Missing dynamic table count'
assert 'function capstoneScore(i,c)' in app and 'function capstoneStage(i,c)' in app,'Branch scores must derive from chosen scene' 
cap=re.search(r'const FINAL_CHALLENGE=(\[.*?\]);\n',app,re.S)
assert cap,'Capstone source missing'
steps=json.loads(cap.group(1))
assert len(steps)==4
preferred=[]
for step in steps:
 assert len(step['choices'])==4
 levels=[o[2] for o in step['choices']]
 assert sorted(levels)==[0,0,1,2],(step['head'],levels)
 preferred.append(levels.index(2))
 assert all(o[0] and o[1] for o in step['choices'])
 assert 'bridges' in step
assert preferred != [0,1,2,3],f'Too-obvious preferred diagonal {preferred}'
assert 'cannot' in steps[0]['choices'][0][1] or 'second emergency' in steps[0]['choices'][0][1]
assert steps[0]['choices'][0][2]==0,'Unsafe unsupervised closure got passing credit'
for f in ['js/app.js','js/data.js']:
 p=subprocess.run(['node','--check',str(root/f)],capture_output=True,text=True)
 assert p.returncode==0,p.stderr
jss=(root/'js/data.js').read_text(encoding='utf-8')
assert jss.startswith('window.LWM_DATA=')
assert json.loads(jss[len('window.LWM_DATA='):].strip().rstrip(';'))==d,'data.js diverged from JSON source'
assert len(list((root/'images').glob('*.webp')))==14,'Expected image assets'
html=(root/'Care_with_a_Compass_Standalone_Offline.html').read_text(encoding='utf-8')
assert html.count('data:image/webp;base64,')==14,'Standalone images incomplete'
assert '<script src=' not in html and 'js/app.js' not in html,'Standalone accidentally references external scripts'
assert 'const BRANCHING=window.COMPASS_BRANCHING' in html,'Standalone branching logic is stale'
assert 'The academy now contains twelve practice questions' not in html
assert 'Supervising specialized care also means understanding reimbursement.' not in html
branch_test=subprocess.run([sys.executable,str(root/'tools/qa_branching.py')],capture_output=True,text=True)
assert branch_test.returncode==0,branch_test.stderr
print('PASS: 72 questions, 5 lessons, 7 lenses, question feedback alignment, 32 branch scenes, 4 capstone stages, source parity, JavaScript, 14 images, standalone parity')
