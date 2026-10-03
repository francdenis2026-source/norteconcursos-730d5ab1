import os
import sys
import pg8000.native

f = sys.argv[1]
sql = open(f, encoding="utf-8").read()

conn = pg8000.native.Connection(
    user="postgres.gkwphadbveiyjcwiiizw",
    password=os.environ["PGPW"],
    host="aws-0-sa-east-1.pooler.supabase.com",
    port=5432,
    database="postgres",
)
try:
    conn.run(sql)
    print(f"OK: {f}")
finally:
    conn.close()
