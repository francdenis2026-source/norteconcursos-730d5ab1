import copy
import importlib.util
import json
from pathlib import Path
import unittest
from unittest.mock import patch

spec=importlib.util.spec_from_file_location('release',Path(__file__).with_name('release-verified-stf2008-originals.py'))
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
PACK=Path(__file__).resolve().parents[2]/'docs/reviews/cespe2016-stf2008-original-release-01-2026-10-17.json'


class OriginalReleaseTests(unittest.TestCase):
    def setUp(self):
        self.pack=json.loads(PACK.read_text())

    def test_all_120_final_answers_and_annulments_are_parsed(self):
        lines=[]
        for base in range(1,121,20):
            lines += [str(n)for n in range(base,base+20)] + ['X'if n==105 else 'C'for n in range(base,base+20)]
        result=m.parse_final_key('\n'.join(lines))
        self.assertEqual(len(result),120)
        self.assertEqual(result[105],'X')
        self.assertEqual(result[23],'C')

    def test_annulled_or_different_final_answer_prevents_release(self):
        keys={i['original_item_number']:i['official_answer']for i in self.pack['confirmed_originals']}
        m.validate(self.pack,keys,set())
        with self.assertRaises(ValueError):m.validate(self.pack,dict(keys,**{'unused':'C'})|{4:'X'},{4})
        with self.assertRaises(ValueError):m.validate(self.pack,keys|{4:'C'},set())

    def test_historical_current_affairs_cannot_be_added_to_approved_set(self):
        self.pack['items'][0]['row']['item_number']=8
        with self.assertRaises(ValueError):m.validate(self.pack)

    def test_missing_support_or_changed_original_role_is_blocked(self):
        original=copy.deepcopy(self.pack)
        self.pack['items'][0]['row']['support_text_id']='unknown'
        with self.assertRaises(ValueError):m.validate(self.pack)
        self.pack=original
        self.pack['items'][0]['row']['career_name']='Agente de Polícia Federal'
        with self.assertRaises(ValueError):m.validate(self.pack)

    def test_publication_requires_exact_current_audited_approval(self):
        approved={'individual_review':{'publication_approved':True},'publication':{'id':'public'}}
        m.assert_publication_approval(approved,copy.deepcopy(approved),{'id':'public'})
        for value in [{'individual_review':{'publication_approved':False}},
                      {'individual_review':{'publication_approved':True},'publication':{'id':'different'}}]:
            with self.assertRaises(RuntimeError):m.assert_publication_approval(value,approved,{'id':'public'})

    def test_instruction_restoration_cannot_change_a_published_answer(self):
        previous=[]
        for item in self.pack['items']:
            row=copy.deepcopy(item['row']);row['question_text']=item['official_statement'];previous.append(row)
        previous[0]['official_answer']='C' if previous[0]['official_answer']=='E' else 'E'
        calls=[]
        with patch.object(m,'verify_documents',return_value=({},set())):
            with self.assertRaises(ValueError):
                m.restore_official_instructions(self.pack,previous,lambda *args:calls.append(args),'/tmp/unused-stf-test-report.json')
        self.assertEqual(calls,[])


if __name__=='__main__':unittest.main()
