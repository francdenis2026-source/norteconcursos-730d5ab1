"""Confere official_answer do fgv_questions.json contra os gabaritos oficiais em PDF (layout com múltiplos cargos/tipos)."""
import re, sys, json, unicodedata

def norm(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    s = re.sub(r'[^A-Za-z0-9 ]', ' ', s)
    return re.sub(r'\s+', ' ', s).strip().upper()

def parse_combined_gabarito(pdf_path):
    """Retorna {(career_norm, tipo_n): {q_num: letra|'*'}}"""
    import subprocess
    text = subprocess.run(['pdftotext', '-layout', pdf_path, '-'], capture_output=True, text=True).stdout
    blocks = {}
    current_career = None
    current_tipo = None
    nums = []
    letters = []
    lines = text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        m = re.match(r'^\s*(.+?)\s*[-–]\s*TIPO\s*(\d+)\s*(\(.*\))?\s*$', line.strip(), re.I)
        if m:
            if current_career and nums and letters and len(nums) == len(letters):
                blocks[(norm(current_career), int(current_tipo))] = dict(zip(nums, letters))
            current_career = m.group(1) + (' ' + m.group(3) if m.group(3) else '')
            current_tipo = m.group(2)
            nums, letters = [], []
            i += 1
            continue
        # linha de numeros
        if current_career is not None:
            nm = re.findall(r'\b(\d{1,3})\b', line)
            # linha de letras/asterisco (proxima apos numeros, mesma contagem)
            if nm and all(1 <= int(x) <= 150 for x in nm):
                # proxima linha deve ser letras
                if i + 1 < len(lines):
                    lm = [tok[0] for tok in re.findall(r'([A-E]\*{1,2}|[A-E]|\*)', lines[i+1])]
                    if len(lm) == len(nm):
                        nums.extend(int(x) for x in nm)
                        letters.extend(lm)
                        i += 2
                        continue
        i += 1
    if current_career and nums and letters and len(nums) == len(letters):
        blocks[(norm(current_career), int(current_tipo))] = dict(zip(nums, letters))
    return blocks

def find_career_block(blocks, career_name_hint, tipo=1):
    hint = norm(career_name_hint)
    hint_tokens = set(hint.replace('–', '-').split())
    best = None
    best_score = 0
    for (career, t), ans in blocks.items():
        if t != tipo:
            continue
        ctoks = set(career.replace('–', '-').split())
        score = len(hint_tokens & ctoks)
        if score > best_score:
            best_score = score
            best = (career, t, ans)
    return best

if __name__ == '__main__':
    pdf = sys.argv[1]
    blocks = parse_combined_gabarito(pdf)
    for k, v in blocks.items():
        print(k, len(v), 'questoes')
