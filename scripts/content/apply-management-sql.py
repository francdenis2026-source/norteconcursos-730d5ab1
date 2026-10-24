"""Execute an explicitly selected review SQL file through the authorized Management API.
The access-token binding is read from the environment and never logged or saved.
"""
import pathlib,json,sys,os,urllib.request,hashlib,datetime
path=pathlib.Path(sys.argv[1]);sql=path.read_text();assert '--apply' in sys.argv
assert path.suffix=='.sql' and 'materials-normative-' in str(path),'Use the concrete reviewed material SQL artifact'
req=urllib.request.Request('https://api.supabase.com/v1/projects/gkwphadbveiyjcwiiizw/database/query',headers={'Authorization':'Bearer '+os.environ['SUPABASE_ACCESS_TOKEN'],'Content-Type':'application/json'},data=json.dumps({'query':sql,'read_only':False}).encode())
try:
 with urllib.request.urlopen(req,timeout=55) as r:result=json.load(r);status=r.status
except urllib.error.HTTPError as e:raise SystemExit('Supabase HTTP '+str(e.code)+': '+e.read().decode()[:1800])
report=dict(at=datetime.datetime.now(datetime.timezone.utc).isoformat(),file=path.name,sql_sha256=hashlib.sha256(sql.encode()).hexdigest(),http_status=status,result=result)
if len(sys.argv)>3:pathlib.Path(sys.argv[3]).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False))
