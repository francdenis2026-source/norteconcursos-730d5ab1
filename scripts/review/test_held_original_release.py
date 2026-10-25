import copy
import importlib.util
import json
from pathlib import Path
import unittest

spec=importlib.util.spec_from_file_location('release',Path(__file__).with_name('release-held-language-originals.py'))
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
PACK=Path(__file__).resolve().parents[2]/'docs/reviews/cespe2016-held-official-conference-01-2026-10-17.json'

class HeldOriginalTests(unittest.TestCase):
    def test_consecutive_numbers_and_answers_cannot_drift(self):
        text='Item '+ ' '.join(map(str,range(1,21)))+'\nGabarito C C E E C C C E E C C E E E C C E E E X'
        keys=m.parse_key_rows(text,20,20)
        self.assertEqual({n:keys[n]for n in [1,10,13,14,20]},{1:'C',10:'C',13:'E',14:'E',20:'X'})
        with self.assertRaises(ValueError):m.parse_key_rows(text.replace('19 20','19 19'),20,20)

    def test_duplicate_number_row_is_rejected(self):
        row=' '.join(map(str,range(1,21)))+' '+' '.join(['C']*20)
        with self.assertRaisesRegex(ValueError,'Ambiguous'):m.parse_key_rows(row+'\n'+row,20,20)

    def test_grouped_subitems_keep_parent_identity_and_ignore_vertical_heading(self):
        rows=['E E C C E E E E C E C C E C C C C E E C',
              'E C C C E C E C E C E C C C E E E C C C',
              'C E E E C C C C C E C C C E C C E E E C',
              'E C E E E C E C C C E E E E E C E E E E',
              'C C C E C C E E E C E E E E C E C C E C']
        text='FISCAL DE TRIBUTOS ESTADUAIS\n'+' '.join(map(str,range(1,21)))+'\n'
        for n,row in enumerate(rows,1):text+=('I\nT\nE\nN\nS\n'if n==5 else '')+str(n)+' '+row+'\n'
        text+='CONHECIMENTOS ESPECÍFICOS'
        keys=m.parse_grouped_key(text)
        self.assertEqual([keys[1,n]for n in range(1,6)],['E','E','C','E','C'])
        self.assertEqual([keys[2,n]for n in range(1,6)],['E','C','E','C','C'])
        self.assertEqual(len(keys),10)

    def test_legal_and_grouped_items_cannot_enter_bounded_release(self):
        for index in [26,27,59,66]:
            pack=json.loads(PACK.read_text())
            d=next(d for d in pack['decisions']if d['source_item_index_zero_based']==index)
            d['publication_approved']=True
            with self.assertRaisesRegex(ValueError,'bounded'):m.verify(pack)

    def test_refinement_preserves_original_and_does_not_approve_unavailable_key(self):
        pack=json.loads(PACK.read_text());d=next(d for d in pack['decisions']if d['source_item_index_zero_based']==28)
        old=dict(payload=dict(raw_text='Immutable historical original',answer_candidate='C',individual_review=dict(publication_approved=False)))
        before=copy.deepcopy(old);want=m.desired_payload(old,d,pack)
        self.assertEqual(old,before);self.assertEqual(want['raw_text'],old['payload']['raw_text'])
        self.assertEqual(want['answer_candidate'],'C');self.assertNotIn('publication',want)
        self.assertFalse(want['individual_review']['answer_verified']);self.assertFalse(want['individual_review']['publication_approved'])
        self.assertTrue(want['individual_review']['remaining_blockers'])

if __name__=='__main__':unittest.main()
