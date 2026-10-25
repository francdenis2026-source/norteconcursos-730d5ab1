import copy
import importlib.util
import json
from pathlib import Path
import unittest
from unittest.mock import patch

s=importlib.util.spec_from_file_location('al',Path(__file__).with_name('release-al2002-subitems.py'))
m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
PACK=Path(__file__).resolve().parents[2]/'docs/reviews/cespe2016-al2002-subitems-release-01-2026-10-17.json'

class ALSubitemTests(unittest.TestCase):
    def fixture(self):return json.loads(PACK.read_text())
    def verify_fixture(self,p):
        # Isolate identity/key validation from external capture locations.
        key='DEFINITIVOS\nFISCAL DE TRIBUTOS ESTADUAIS\n'+' '.join(map(str,range(1,21)))+'\n'
        for n,pair in enumerate([('E','E'),('E','C'),('C','E'),('E','C'),('C','C')],1):
            key+=str(n)+' '+' '.join([*pair,*(['C']*18)])+'\n'
        key+='CONHECIMENTOS ESPECÍFICOS'
        paper=p['support_body']+'\n'+'\n'.join(d['original_instruction']+' '+d['official_statement']for d in p['decisions'])
        keypath=p['exam']['answer_key']['path'];syllabus=p['pf_syllabus_evidence']['path']
        def text(path):return key if path==keypath else 'Compreensão e interpretação de textos'if path==syllabus else paper
        def data(e):return b'FISCAL_TRIBUTOS.pdf Gab_DEFINITIVO_SEFAZ.pdf'if e==p['exam']['catalog_evidence']else b'%PDF-test'
        with patch.object(m.held,'checked_bytes',side_effect=data),patch.object(m.base,'pdf_text',side_effect=text):return m.verify(p)

    def test_compound_identity_keeps_nine_separate_originals(self):
        p=self.fixture();self.assertEqual(len(self.verify_fixture(p)),10)
        rows=[d['row']for d in p['decisions']if d['publication_approved']]
        self.assertEqual(len({r['external_item_key']for r in rows}),9)
        self.assertTrue(all('item_number'not in r and r['is_original']is False for r in rows))
        wrong_column=self.fixture();wrong_column['decisions'][0]['row']['current_syllabus_topic_id']=m.TOPICS[1]
        with self.assertRaisesRegex(ValueError,'attribution'):self.verify_fixture(wrong_column)
        p['decisions'][0]['original_subitem_number']=2
        with self.assertRaisesRegex(ValueError,'identity'):self.verify_fixture(p)

    def test_final_key_mismatch_is_blocked(self):
        p=self.fixture();p['decisions'][0]['official_answer']='C'
        with self.assertRaisesRegex(ValueError,'final key'):self.verify_fixture(p)

    def test_ambiguous_totality_item_cannot_be_published(self):
        p=self.fixture();d=next(d for d in p['decisions']if d['source_item_index_zero_based']==59);d['publication_approved']=True
        with self.assertRaisesRegex(ValueError,'nine approved'):m.verify(p)

    def test_imported_original_cannot_be_mislabeled_as_authored(self):
        p=self.fixture();p['decisions'][0]['row']['is_original']=True
        with self.assertRaisesRegex(ValueError,'attribution'):self.verify_fixture(p)

    def test_private_refinement_preserves_raw_text_and_holds_ambiguity(self):
        p=self.fixture();d=next(d for d in p['decisions']if d['source_item_index_zero_based']==59)
        old=dict(payload=dict(raw_text='Original immutable text',answer_candidate='C',individual_review=dict(publication_approved=False)))
        before=copy.deepcopy(old);new=m.desired_payload(old,d,p)
        self.assertEqual(old,before);self.assertEqual(new['raw_text'],old['payload']['raw_text'])
        self.assertEqual(new['answer_candidate'],'C');self.assertFalse(new['individual_review']['publication_approved']);self.assertNotIn('publication',new)

    def test_compare_and_set_filters_cover_null_and_authorship(self):
        query=m.row_filters(dict(id='example',is_original=False,law_version_checked_at=None,legal_basis=[],question_text='Texto com + e &'))
        from urllib.parse import parse_qs
        values=parse_qs(query)
        self.assertEqual(values['is_original'],['eq.false']);self.assertEqual(values['law_version_checked_at'],['is.null'])
        self.assertEqual(values['question_text'],['eq.Texto com + e &']);self.assertEqual(values['legal_basis'],['eq.[]'])

if __name__=='__main__':unittest.main()
