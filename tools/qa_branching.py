#!/usr/bin/env python3
"""Current branching data integrity and browser-bundle parity checks."""
from pathlib import Path
import json,subprocess
root=Path(__file__).resolve().parents[1]
b=json.loads((root/'data/branching.json').read_text(encoding='utf-8'))
assert set(b['labs'])==set('123456')
assert set(b['capstone'])==set('123')
seen=set();total=0
for chapter,variants in b['labs'].items():
 assert set(variants)==set('0123')
 for branch in variants.values():
  assert len(branch['options'])==4
  assert sorted(x['level'] for x in branch['options'])==[0,0,1,2]
  assert branch['lead'] not in seen
  seen.add(branch['lead']);total+=1
for variants in b['capstone'].values():
 assert set(variants)==set('0123')
 for branch in variants.values():
  assert len(branch['choices'])==4
  assert sorted(x[2] for x in branch['choices'])==[0,0,1,2]
  assert branch['lead'] not in seen
  seen.add(branch['lead']);total+=1
assert total==36
js=(root/'js/branching.js').read_text(encoding='utf-8')
assert json.loads(js.split('=',1)[1].strip().rstrip(';'))==b
assert subprocess.run(['node','--check',str(root/'js/branching.js')],capture_output=True).returncode==0
print('PASS: 36 unique branch scenes, 144 scored options, JSON/JS parity')
