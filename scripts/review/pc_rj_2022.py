# PC-RJ 2022 (Delegado, Cebraspe): importa e classifica as 100 questões. Uso: python -X utf8 pc_rj_2022.py [--dry]
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import parse_ceb_mc as C
import pc_import_lib as L

D = os.environ["TEMP"] + "/provas/ceb/"
B = "https://cdn.cebraspe.org.br/concursos/pc_rj_21_delegado/arquivos/"
E = dict(key="rj_del22", contest="Polícia Civil do Estado do Rio de Janeiro", role="Delegado de Polícia", role_type="Delegado", state="RJ", year=2022, board="Cebraspe",
         prova_url=B + "662_PCRJ_001_01.PDF", gab_url=B + "GAB_DEFINITIVO_662_PCRJ_001_01.PDF",
         notes="Caderno oficial (XIII Concurso, Delegado de Polícia 3ª Classe) aplicado em 13/03/2022; publicado pela banca.")

PL = "https://www.planalto.gov.br/ccivil_03/"
LAW = dict(
    CP=("Código Penal – texto compilado", PL + "decreto-lei/del2848compilado.htm"),
    CPP=("Código de Processo Penal – texto compilado", PL + "decreto-lei/del3689compilado.htm"),
    CF=("Constituição Federal", PL + "constituicao/constituicao.htm"),
    ORG=("Lei 12.850/2013 – Organizações criminosas", PL + "_ato2011-2014/2013/lei/l12850.htm"),
    DROG=("Lei 11.343/2006 – Drogas", PL + "_ato2004-2006/2006/lei/l11343.htm"),
    ARMAS=("Lei 10.826/2003 – Estatuto do Desarmamento", PL + "leis/2003/l10.826.htm"),
    MP=("Lei 11.340/2006 – Maria da Penha", PL + "_ato2004-2006/2006/lei/l11340.htm"),
    L14133=("Lei 14.133/2021 – Licitações", PL + "_ato2019-2022/2021/lei/l14133.htm"),
    CC=("Código Civil – texto compilado", PL + "leis/2002/l10406compilada.htm"),
    CDC=("Código de Defesa do Consumidor", PL + "leis/l8078compilado.htm"),
    LGPD=("Lei 13.709/2018 – LGPD", PL + "_ato2015-2018/2018/lei/l13709.htm"),
    ECA=("Estatuto da Criança e do Adolescente", PL + "leis/l8069.htm"),
    LINDB=("LINDB – texto compilado", PL + "decreto-lei/del4657compilado.htm"),
    MS=("Lei 12.016/2009 – Mandado de segurança", PL + "_ato2007-2010/2009/lei/l12016.htm"),
    LEL=("Lei 13.874/2019 – Liberdade Econômica", PL + "_ato2019-2022/2019/lei/l13874.htm"),
    IMPR=("Lei 8.429/1992 – Improbidade (texto compilado)", PL + "leis/l8429compilada.htm"),
    IDOSO=("Estatuto da Pessoa Idosa", PL + "leis/2003/l10.741.htm"),
    LAI=("Lei 12.527/2011 – Acesso à informação", PL + "_ato2011-2014/2011/lei/l12527.htm"),
)
SUBJ = {}
for n in range(1, 21): SUBJ[n] = "Direito Penal"
for n in (2, 10, 11, 12, 13, 19): SUBJ[n] = "Legislação Penal Especial"
for n in range(21, 41): SUBJ[n] = "Direito Processual Penal"
for n in (24, 26, 29, 30, 32): SUBJ[n] = "Legislação Penal Especial"
for n in range(41, 61): SUBJ[n] = "Direito Administrativo"
for n in range(61, 81): SUBJ[n] = "Direito Constitucional"
for n in (76, 77, 79): SUBJ[n] = "Direito Processual Penal"
for n in range(81, 91): SUBJ[n] = "Direito Civil"
SUBJ[84] = "Direito da Criança e do Adolescente"; SUBJ[89] = "Direito do Consumidor"
for n in range(91, 101): SUBJ[n] = "Medicina Legal"
BASIS = {1: "CP", 2: "ARMAS", 3: "CP", 4: "CP", 5: "CP", 7: "CP", 8: "CP", 9: "CP", 12: "MP", 13: "ORG", 14: "CP", 15: "CP", 16: "CP", 17: "CP", 18: "IDOSO",
         20: "CP", 21: "CPP", 22: "CPP", 23: "CPP", 24: "DROG", 25: "CPP", 26: "ORG", 28: "CPP", 29: "ORG", 30: "ORG", 31: "CPP", 32: "ORG", 34: "CPP", 36: "CPP",
         37: "CPP", 38: "CPP", 41: "LAI", 42: "IMPR", 47: "MS", 52: "L14133", 53: "L14133", 56: "LEL", 58: "LINDB", 62: "CF", 63: "CF", 64: "CF", 65: "CF", 66: "CF",
         67: "CF", 68: "CF", 69: "CF", 70: "CF", 71: "CF", 72: "CF", 73: "CF", 74: "CF", 75: "CF", 77: "CF", 78: "CF", 80: "CF", 81: "LGPD", 82: "CC", 83: "CC",
         84: "ECA", 85: "CC", 86: "CC", 87: "CC", 88: "CC", 89: "CDC", 90: "CC", 93: "CPP"}
OK = "Resposta conferida com a lei vigente em 13/10/2026 e com o gabarito definitivo."
SPECIAL = {
    11: ("archive", "Desatualizada: a chave aponta crime do Estatuto do Torcedor, revogado pela Lei Geral do Esporte (Lei 14.597/2023). Arquivada por não refletir a lei vigente."),
    35: ("archive", "Desatualizada: a chave segue o rito antigo de arquivamento (provocar o procurador-geral). O art. 28 do CPP (Lei 13.964/2019, em vigor após a ADI 6298) mudou o procedimento."),
    59: ("archive", "Desatualizada: a questão se apoia na Lei 10.520/2002 (pregão), revogada pela Lei 14.133/2021 (efeitos plenos desde 30/12/2023)."),
    10: ("block", "Retida: há divergência recente nos tribunais superiores sobre importação de sementes de Cannabis; falta conferir a posição atual do STJ antes de ativar."),
    19: ("block", "Retida: a chave (atipicidade) depende de entendimento do STJ sobre o consentimento da vítima na medida protetiva; conferir a jurisprudência atual."),
    39: ("block", "Retida: a chave (A) diverge da leitura do art. 322 do CPP (delegado só concede fiança até 4 anos de pena máxima; aqui são 5). Conferir com a banca antes de ativar."),
    40: ("block", "Retida: a chave (B) diverge da leitura do art. 322 do CPP (tentativa com pena máxima ainda acima de 4 anos). Conferir com a banca antes de ativar."),
    48: ("block", "Retida: depende de doutrina e de norma estadual (TCE-RJ) que não foram conferidas em fonte oficial."),
    79: ("block", "Retida: a chave é anterior à Lei 14.365/2022, que alterou o art. 7º, XIV e §§ do Estatuto da Advocacia (acesso do advogado); pode estar superada."),
}
dec = {}
for n in range(1, 101):
    a, note = SPECIAL.get(n, ("activate", OK))
    d = dict(action=a, note=note, subject=SUBJ[n])
    if n in BASIS and a == "activate":
        d["basis"] = [LAW[BASIS[n]]]
    dec[n] = d
dec[72]["note"] = "Chave alterada pela banca (ADI 5.003): definitivo E. " + OK
if __name__ == "__main__":
    items = C.parse_ceb_mc(D + "rj_prova.pdf")
    gab = C.gab_blocks_generic(D + "rj_gab.pdf")
    for it in items:
        it["subject"] = SUBJ[it["n"]]
    for k, (t, u) in {v[1]: v for v in LAW.values()}.items():
        if "--dry" in sys.argv and not L.url_ok(k):
            print("LINK QUEBRADO", t, k)
    L.run(E, items, gab, dec, dry="--dry" in sys.argv)
