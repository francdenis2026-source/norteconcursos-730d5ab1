import re,glob,json,sys,collections
def parse_values(t,i):
    """parseia 'values (..),(..)...' a partir de i; devolve lista de tuplas (lista de strings crus) e novo i"""
    rows=[];n=len(t)
    while i<n:
        while i<n and t[i] in ' \n\r\t,': i+=1
        if i>=n or t[i]!='(': break
        i+=1;depth=1;cur=[];buf=[];
        while i<n and depth>0:
            ch=t[i]
            if ch=="'":
                j=i+1
                while j<n:
                    if t[j]=="'" and j+1<n and t[j+1]=="'": j+=2;continue
                    if t[j]=="'": break
                    j+=1
                buf.append(t[i:j+1]);i=j+1;continue
            if ch=='$':
                m=re.match(r'\$([A-Za-z0-9_]*)\$',t[i:i+40])
                if m:
                    tag=m.group(0);j=t.find(tag,i+len(tag))
                    if j<0: return rows,n
                    buf.append(t[i:j+len(tag)]);i=j+len(tag);continue
            if ch=='(':depth+=1
            elif ch==')':
                depth-=1
                if depth==0: cur.append(''.join(buf).strip());i+=1;break
            if ch==',' and depth==1: cur.append(''.join(buf).strip());buf=[];i+=1;continue
            buf.append(ch);i+=1
        rows.append(cur)
    return rows,i
def lit(s):
    s=s.strip()
    m=re.match(r"^'(.*)'(::\w+)?$",s,re.S)
    if m: return m.group(1).replace("''","'")
    m=re.match(r"^\$([A-Za-z0-9_]*)\$(.*)\$\1\$(::\w+)?$",s,re.S)
    if m: return m.group(2)
    return s
def scan(path):
    t=open(path,encoding='utf-8',errors='ignore').read()
    out=[]
    for m in re.finditer(r'insert\s+into\s+(?:public\.)?(\w+)\s*\(([^)]*)\)\s*(?:overriding[^v]*)?values',t,re.I):
        tab=m.group(1);cols=[c.strip() for c in m.group(2).split(',')]
        if tab not in('official_exam_questions','board_exam_questions','curated_question_catalog'): continue
        rows,_=parse_values(t,m.end())
        for r in rows:
            if len(r)!=len(cols): continue
            d={c:lit(v) for c,v in zip(cols,r)}
            out.append((tab,d))
    return out
if __name__=='__main__':
    allr=[]
    for f in glob.glob('supabase/**/*.sql',recursive=True):
        try: allr+= [(f,)+x for x in scan(f)]
        except Exception as e: print('erro',f,e,file=sys.stderr)
    print(len(allr))
    json.dump([{'f':f,'tab':t,**{k:v for k,v in d.items() if k in('contest_name','exam_year','exam_board','board','subject','discipline','stem','question_text','item_number','career_name','official_answer','content_status')}} for f,t,d in allr],open('/tmp/allrows.json','w'),ensure_ascii=False)
