import copy
import hashlib
import importlib.util
from pathlib import Path
import unittest

spec=importlib.util.spec_from_file_location('review',Path(__file__).with_name('apply_378_review.py'))
review=importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)

class ReviewGuards(unittest.TestCase):
    def setUp(self):
        self.row={'question_text':'Enunciado original','official_answer':'E','content_status':'under_review',
                  'legal_basis':[],'law_version_checked_at':None,'current_syllabus_topic_id':None,
                  'context_review_required':False,'review_note':'Nota anterior'}
        self.d={'id':'id','question_md5':hashlib.md5(self.row['question_text'].encode()).hexdigest(),
                'expected_answer':'E','expected_status':'under_review','expected_basis':[],
                'expected_checked_at':None,'expected_current_topic':None,
                'expected_review_note_md5':hashlib.md5(b'Nota anterior').hexdigest(),
                'decision':'verified','syllabus_source':'https://cdn.cebraspe.org.br/edital.pdf',
                'patch':{'legal_basis':[{'title':'CP','url':'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'}],
                         'law_version_checked_at':'2026-10-11T12:00:00+00:00','content_status':'active',
                         'legal_audit_completed':True,'current_syllabus_topic_id':'topic','review_note':'Conferida'}}
    def test_original_is_validated_and_reexecution_is_idempotent(self):
        self.assertEqual(review.validate_decision(self.d,self.row,{'topic'}),'validated')
        updated={**self.row,**self.d['patch']}
        updated['law_version_checked_at']='2026-10-11T12:00:00Z'
        self.assertEqual(review.validate_decision(self.d,updated,{'topic'}),'already_applied')
    def test_never_changes_key_or_text(self):
        for field,value in [('official_answer','C'),('question_text','Outro')]:
            row={**self.row,field:value}
            with self.assertRaises(ValueError):review.validate_decision(self.d,row,{'topic'})
        self.d['patch']['official_answer']='C'
        with self.assertRaises(ValueError):review.validate_decision(self.d,self.row,{'topic'})
    def test_context_and_syllabus_block_publication(self):
        with self.assertRaises(ValueError):review.validate_decision(self.d,{**self.row,'context_review_required':True},{'topic'})
        with self.assertRaises(ValueError):review.validate_decision(self.d,self.row,set())
    def test_lookalike_domain_is_rejected(self):
        self.d['patch']['legal_basis'][0]['url']='https://planalto.gov.br.example.com/lei'
        with self.assertRaises(ValueError):review.validate_decision(self.d,self.row,{'topic'})
    def test_concurrent_review_is_preserved(self):
        with self.assertRaises(ValueError):review.validate_decision(self.d,{**self.row,'review_note':'Nova revisão'},{'topic'})
    def test_null_and_json_rest_guards(self):
        self.assertEqual(review.filter_value(None),'is.null')
        self.assertEqual(review.filter_value(False),'eq.false')
        self.assertEqual(review.filter_value([]),'eq.[]')

if __name__=='__main__':unittest.main()
