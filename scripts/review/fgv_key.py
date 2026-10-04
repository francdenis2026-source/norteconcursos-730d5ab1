"""Strict FGV key parsing, independent of PDF libraries."""
import re
import unicodedata


def answer_token(value):
    value = value.strip().upper()
    if value == "*":
        return "X"
    if re.fullmatch(r"[A-E]\*{0,3}", value):
        return value[0]
    raise ValueError(f"Invalid answer token: {value!r}")


def aligned_answers(numbers, answers):
    ns, tokens = numbers.split(), answers.split()
    if not ns or not all(re.fullmatch(r"\d{1,3}", n) for n in ns):
        raise ValueError("Invalid item numbers")
    if len(ns) != len(tokens):
        raise ValueError("Answer columns do not match item columns")
    if len(set(ns)) != len(ns):
        raise ValueError("Duplicate item numbers")
    return {int(n): answer_token(a) for n, a in zip(ns, tokens)}


def _fold(value):
    value = value.lower().replace("–", "-").replace("—", "-")
    return " ".join("".join(c for c in unicodedata.normalize("NFD", value)
                            if not unicodedata.combining(c)).split())


def section_answers(lines, role, exam_type=1, shift=None):
    lines = [line.strip() for line in lines if line.strip()]
    on, result = False, {}
    for i, line in enumerate(lines):
        header = re.search(r"\s*-\s*TIPO\s*(\d+)\b", line, re.I)
        if header:
            label = line[:header.start()].strip()
            on = (_fold(label) == _fold(role) and int(header.group(1)) == exam_type
                  and (shift is None or _fold(shift) in _fold(line[header.end():])))
            continue
        if on and re.fullmatch(r"\d+(?:\s+\d+)+", line):
            if i + 1 == len(lines):
                raise ValueError("Missing answer row")
            block = aligned_answers(line, lines[i + 1])
            if result.keys() & block.keys():
                raise ValueError("Repeated exam section: specify the shift")
            result.update(block)
    if not result:
        raise ValueError("Exact exam section not found")
    return result
