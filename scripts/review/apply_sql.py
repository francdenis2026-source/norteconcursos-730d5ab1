import subprocess, sys, os

EXE = r"C:\Users\familia\AppData\Roaming\npm\node_modules\supabase\node_modules\@supabase\cli-windows-x64\bin\supabase.exe"
f = sys.argv[1]
pw = os.environ["PGPW"]
url = f"postgresql://postgres.gkwphadbveiyjcwiiizw:{pw}@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"


def real(s):
    return any(l.strip() and not l.strip().startswith("--") for l in s.splitlines())


def strip_comments(s):
    lines = s.splitlines()
    while lines and (not lines[0].strip() or lines[0].strip().startswith("--")):
        lines.pop(0)
    return "\n".join(lines).strip()


stmts = [strip_comments(s) for s in open(f, encoding="utf-8").read().split("-- @@") if real(s)]
ok = 0
for i, s in enumerate(stmts, 1):
    r = subprocess.run([EXE, "db", "query", "--db-url", url, s], capture_output=True, text=True, encoding="utf-8")
    out = (r.stdout + r.stderr).replace(pw, "***")
    if r.returncode != 0 or '"_tag":"Error"' in out or "ERROR" in out:
        print(f"FALHOU stmt {i}/{len(stmts)}: {s[:120]!r}\n{out[-700:]}")
        sys.exit(1)
    ok += 1
print(f"{ok}/{len(stmts)} instruções aplicadas")
