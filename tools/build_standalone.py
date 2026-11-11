#!/usr/bin/env python3
"""Bundle HTML/CSS/JS/WebP into a truly standalone offline HTML file."""
from pathlib import Path
import base64,re
root=Path(__file__).resolve().parents[1]
html=(root/'index.html').read_text(encoding='utf-8')
css=(root/'css/styles.css').read_text(encoding='utf-8')
html=html.replace('<link rel="stylesheet" href="css/styles.css">','<style>\n'+css+'\n</style>')
for src in ('js/data.js','js/branching.js','js/app.js'):
 js=(root/src).read_text(encoding='utf-8')
 if src.endswith('/app.js'):
  for image in (root/'images').glob('*.webp'):
   image_path='images/'+image.name
   image_uri='data:image/webp;base64,'+base64.b64encode(image.read_bytes()).decode('ascii')
   assert f'"{image_path}"' in js,image_path
   js=js.replace(f'"{image_path}"',f'"{image_uri}"')
 js=js.replace('</script',r'<\/script')
 tag=f'<script src="{src}"></script>'
 assert tag in html,src
 html=html.replace(tag,'<script>\n'+js+'\n</script>')
assert '<script src=' not in html
assert html.count('data:image/webp;base64,')==14
(root/'Care_with_a_Compass_Standalone_Offline.html').write_text(html,encoding='utf-8')
print('Bundled truly offline HTML',len(html),'characters,',html.count('data:image/webp;base64,'),'WebP images')
