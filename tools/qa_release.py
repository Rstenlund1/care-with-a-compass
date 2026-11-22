#!/usr/bin/env python3
"""Current 6-chapter release data integrity and source parity checks."""
from pathlib import Path
import json,subprocess,sys,re
root=Path(__file__).resolve().parents[1]
d=json.loads((root/'data/questions.json').read_text(encoding='utf-8'))
q=d['questions']
assert len(q)==84 and len(d['lessons'])==6 and len(d['lensCases'])>=8
assert len({x['id'] for x in q})==84
for x in q:
 labels={chr(65+j) for j in range(len(x['choices']))}
 assert len(labels)==5 and set(x['feedback'])==labels,x['id']
 gold=set(x.get('answerSet',[])) if x.get('multi') else {x['answer']}
 assert gold<=labels
 for k in labels:
  assert (x['feedback'][k]['type']=='preferred')==(k in gold),(x['id'],k)
  assert x['feedback'][k]['text'].strip()
 assert all(k in d['sourceMap'] for k in x['refs'])
js=(root/'js/data.js').read_text(encoding='utf-8')
assert json.loads(js.split('=',1)[1].strip().rstrip(';'))==d
for file in ['js/app.js','js/data.js','js/branching.js','js/v92-app.js','js/learner-services.js']:
 r=subprocess.run(['node','--check',str(root/file)],capture_output=True,text=True)
 assert r.returncode==0,(file,r.stderr)
html=(root/'consequence-lab.html').read_text(encoding='utf-8')
script=re.search(r'<script>(.*?)</script>',html,re.S).group(1)
r=subprocess.run(['node','--check','-'],input=script,capture_output=True,text=True)
assert r.returncode==0,r.stderr
assert len(list((root/'images').glob('*.webp')))==14
r=subprocess.run([sys.executable,str(root/'tools/qa_branching.py')],capture_output=True,text=True)
assert r.returncode==0,r.stderr
print('PASS: 84 questions, 6 chapters, >=8 lenses, 36 branch scenes, feedback alignment, source parity and JS syntax')
