#!/usr/bin/env python3
"""Build the offline JS wrapper from the authoritative branch JSON."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
branch=json.loads((root/'data/branching.json').read_text(encoding='utf-8'))
assert branch['schemaVersion']=='7.2.0'
assert len(branch['labs'])==5 and all(len(x)==4 for x in branch['labs'].values())
assert len(branch['capstone'])==3 and all(len(x)==4 for x in branch['capstone'].values())
js='window.COMPASS_BRANCHING='+json.dumps(branch,ensure_ascii=False,separators=(',',':')).replace('</',r'<\/')+';\n'
(root/'js/branching.js').write_text(js,encoding='utf-8')
print('Built js/branching.js with 32 unique follow-up scenes')
