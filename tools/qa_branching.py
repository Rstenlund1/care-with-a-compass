#!/usr/bin/env python3
"""Structural regression tests for all 32 consequence-based follow-up scenes."""
from pathlib import Path
import json, re, collections, subprocess
root=Path(__file__).resolve().parents[1]
b=json.loads((root/'data/branching.json').read_text(encoding='utf-8'))
app=(root/'js/app.js').read_text(encoding='utf-8')
assert b['schemaVersion']=='7.2.0'
assert set(b['labs'])=={'1','2','3','4','5'}
assert set(b['capstone'])=={'1','2','3'}
leads=[]
seen=set()
for ch,variants in b['labs'].items():
 assert set(variants)=={'0','1','2','3'},('lab paths missing',ch)
 for prior,branch in variants.items():
  where=f'Lab {ch} choice {prior}'
  assert len(branch['lead'])>=70 and len(branch['prompt'])>=20,where
  assert len(branch['options'])==4,where
  levels=sorted(x['level'] for x in branch['options'])
  assert levels==[0,0,1,2],(where,levels)
  assert all(len(x['text'])>=65 and len(x['why'])>=45 for x in branch['options']),where
  assert len(branch['takeaway'])>60,where
  assert branch['lead'] not in seen,(where,'reused scenario text')
  seen.add(branch['lead'])
  leads.append(branch['lead'])
for step,variants in b['capstone'].items():
 assert set(variants)=={'0','1','2','3'},('capstone paths missing',step)
 for prior,branch in variants.items():
  where=f'Capstone {step} previous choice {prior}'
  assert len(branch['head'])>=12 and len(branch['lead'])>=70 and len(branch['question'])>=20,where
  assert len(branch['choices'])==4,where
  assert sorted(x[2] for x in branch['choices'])==[0,0,1,2],where
  assert all(len(x[0])>=65 and len(x[1])>=45 for x in branch['choices']),where
  assert branch['lead'] not in seen,(where,'reused scenario')
  seen.add(branch['lead'])
  leads.append(branch['lead'])
assert len(leads)==32
assert 'function labFollow(ch,st)' in app
assert 'labFollow(ch,st)' in app
assert 'function capstoneStage(i,c)' in app
assert 'capstoneStage(i,c)' in app
assert 'capstoneScore(i,c)' in app
assert 'capstoneJourney(c)' in app
assert 'v72-72q' in app and 'v71-72q' not in app
js=(root/'js/branching.js').read_text(encoding='utf-8')
assert js.startswith('window.COMPASS_BRANCHING=')
assert json.loads(js[len('window.COMPASS_BRANCHING='):].strip().rstrip(';'))==b,'Branch source diverged from generated JS'
html=(root/'Care_with_a_Compass_Standalone_Offline.html').read_text(encoding='utf-8')
assert 'window.COMPASS_BRANCHING=' in html and 'const BRANCHING=window.COMPASS_BRANCHING' in html
assert html.count('data:image/webp;base64,')==14
assert '<script src=' not in html
for p in (root/'js/app.js',root/'js/branching.js',root/'js/data.js'):
 res=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
 assert res.returncode==0,(str(p),res.stderr)
print('PASS: 32 unique dynamic branches, 128 evaluated options, grade labels, stable offline bundle')
