import importlib.util
import json
import pathlib
import tempfile
import unittest
import pymupdf

spec=importlib.util.spec_from_file_location('catalog_multiple',pathlib.Path(__file__).with_name('catalog-multiple-pdfs.py'))
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class CatalogueTests(unittest.TestCase):
    def test_body_sentence_cannot_change_discipline(self):
        self.assertIsNone(module.heading_subject('A integridade física da pessoa'))
        self.assertIsNone(module.heading_subject('Discute o direito constitucional do acusado'))
        self.assertEqual(module.heading_subject('Direito Processual Penal'),'Direito Processual Penal')

    def test_accounting_and_official_writing_are_separate_routes(self):
        self.assertIn('norma_contabil_oficial',module.normative_routes('Contabilidade','Balanço'))
        self.assertIn('redacao_oficial',module.normative_routes('Português','Manual de Redação Oficial'))
        self.assertIn('tribunal_competente',module.normative_routes('Direito Penal','Súmula do STJ'))

    def test_two_columns_preserve_order_without_approving_questions(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=pathlib.Path(tmp); pdf=root/'500 Questoes PolíciaFederal.pdf'
            with pymupdf.open() as doc:
                for _ in range(4):doc.new_page(width=600,height=800)
                page=doc[3]
                page.insert_text((35,100),'CESPE - 2021 - prova esquerda',fontsize=10)
                page.insert_text((35,120),'Enunciado exclusivo esquerdo para revisar.',fontsize=10)
                page.insert_text((335,100),'CESPE - 2021 - prova direita',fontsize=10)
                page.insert_text((335,120),'Enunciado exclusivo direito para revisar.',fontsize=10)
                doc.save(pdf)
            import hashlib
            sha=hashlib.sha256(pdf.read_bytes()).hexdigest()
            cached=root/sha;cached.mkdir()
            with pymupdf.open(pdf) as doc:
                pages=[{'text':p.get_text(sort=True),'images':0} for p in doc]
            (cached/'pages.json').write_text(json.dumps(pages),encoding='utf-8')
            manifest=root/'manifest.json'
            manifest.write_text(json.dumps([{'name':pdf.name,'path':str(pdf),'sha256':sha,'page_count':4,'exists':True}]),encoding='utf-8')
            result=module.catalogue(manifest,root/'out')
            items=json.loads((root/'out'/sha/'boundary-candidates.json').read_text(encoding='utf-8'))
            self.assertEqual(len(items),2)
            self.assertIn('esquerdo',items[0]['raw_text'])
            self.assertNotIn('direito',items[0]['raw_text'])
            self.assertIn('direito',items[1]['raw_text'])
            self.assertEqual([x['column'] for x in items],[1,2])
            self.assertTrue(all(x['content_status']=='under_review' and not x['individual_review_complete'] for x in items))
            self.assertEqual(result[0]['published'],0)


if __name__=='__main__':unittest.main()
