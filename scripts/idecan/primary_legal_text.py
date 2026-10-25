"""Conservative HTML extraction for archived primary legal sources, not legal approval."""
from html.parser import HTMLParser
import re

def decode_html(data,content_type=''):
 if data.startswith((b'\xff\xfe',b'\xfe\xff')):
  trimmed=data.rstrip(b' \t\r\n')
  if trimmed!=data:
   try:complete=trimmed.decode('utf-16',errors='strict')
   except UnicodeDecodeError:complete=''
   if complete.rstrip().lower().endswith('</html>'):
    return complete,'utf-16; trailing ASCII transport whitespace removed'
  encoding='utf-16'
 elif data.startswith(b'\xef\xbb\xbf'):encoding='utf-8-sig'
 else:
  m=re.search(br'charset\s*=\s*["\']?([\w-]+)',data[:12000],re.I)
  h=re.search(r'charset\s*=\s*([\w-]+)',content_type,re.I)
  encoding=m.group(1).decode() if m else h.group(1) if h else 'utf-8'
  if encoding.lower() in ['iso-8859-1','latin-1','latin1']:encoding='cp1252'
 text=data.decode(encoding,errors='strict')
 if '\x00' in text:raise ValueError('NUL in decoded HTML: inspect encoding before quoting')
 return text,encoding

class LegalText(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.skip=0;self.parts=[];self.excluded=0
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs);hidden=tag in ['strike','s','del','script','style'] or 'line-through' in attrs.get('style','')
  if tag not in ['br','hr','meta','link','img','input','wbr','source','area','base','embed','param','track','col']:
   self.stack.append((tag,hidden));self.skip+=int(hidden);self.excluded+=int(hidden)
  if tag in ['br','hr','p','div','li','tr'] and not self.skip:self.parts.append('\n')
 def handle_endtag(self,tag):
  if any(t==tag for t,_ in self.stack):
   while self.stack:
    name,hidden=self.stack.pop();self.skip-=int(hidden)
    if name==tag:break
  if tag in ['p','div','li','tr'] and not self.skip:self.parts.append('\n')
 def handle_data(self,data):
  if not self.skip:self.parts.append(data)
 def text(self):return re.sub(r'\n\s*\n','\n',re.sub(r'[ \t\r\f\v]+',' ',''.join(self.parts))).strip()

def extract_articles(text):
 pattern=r'(?m)^[ \t\u00a0]*Art(?:igo|\.)?\s*(\d+)(?:[º°o])?(-[A-Za-z])?(?:[º°o])?(?=[\s.\-–—:])'
 matches=list(re.finditer(pattern,text));out={}
 for i,m in enumerate(matches):
  key=m.group(1)+(m.group(2) or '').upper();out.setdefault(key,[]).append(text[m.start():matches[i+1].start() if i+1<len(matches) else len(text)].strip())
 return out
