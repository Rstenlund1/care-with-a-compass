#!/usr/bin/env python3
"""Regenerate the browser branching bundle from synchronized JSON."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
b=json.loads((root/'data/branching.json').read_text(encoding='utf-8'))
assert len(b['labs'])==6 and all(len(x)==4 for x in b['labs'].values())
assert len(b['capstone'])==3 and all(len(x)==4 for x in b['capstone'].values())
js='window.COMPASS_BRANCHING='+json.dumps(b,ensure_ascii=False,separators=(',',':')).replace('</',r'<\/')+';\n'
(root/'js/branching.js').write_text(js,encoding='utf-8')
print('Built 36 branch scenes')
