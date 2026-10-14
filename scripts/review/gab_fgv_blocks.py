"""Gabarito FGV em blocos de 20 números + 20 letras, vários cargos/tipos no mesmo PDF. gab_for(pdf, cargo_regex, tipo) -> {n: letra|'*'}"""
import re, pymupdf
from fgv_key import answer_token


def gab_for(pdf, cargo_re, tipo=1):
    lines = [l.strip() for p in pymupdf.open(pdf) for l in p.get_text().splitlines() if l.strip()]
    res, on, nums, lets = {}, False, [], []
    for l in lines:
        m = re.match(r"^(.*?)\s*[-–]\s*Tipo\s*(\d)\b", l, re.I)
        if m:
            on = bool(re.search(cargo_re, m.group(1), re.I)) and int(m.group(2)) == tipo
            nums, lets = [], []
            continue
        if not on:
            continue
        if re.fullmatch(r"\d{1,3}", l):
            if lets:
                nums, lets = [], []
            nums.append(int(l))
        elif re.fullmatch(r"[A-E]\*{0,3}|\*", l):
            t = answer_token(l)
            lets.append("*" if t == "X" else t)
            if len(lets) == len(nums):
                res.update(dict(zip(nums, lets)))
                nums, lets = [], []
    return res
