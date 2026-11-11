from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'data/questions.json').read_text(encoding='utf-8'))
assert isinstance(data.get('questions'),list)
ids=[q['id'] for q in data['questions']]
assert len(ids)==len(set(ids)), 'Duplicate question IDs'
(root/'js/data.js').write_text('window.LWM_DATA='+json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('</',r'<\/')+';\n',encoding='utf-8')
print('Updated js/data.js:',len(ids),'questions')
