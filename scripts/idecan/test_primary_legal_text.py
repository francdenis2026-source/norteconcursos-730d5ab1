import unittest
from primary_legal_text import decode_html,LegalText,extract_articles
class Test(unittest.TestCase):
 def test_utf16_bom_prevents_false_missing_article(self):
  raw='<p>Art. 41. Aos crimes não se aplica a regra antiga.</p>'.encode('utf-16');text,enc=decode_html(raw);p=LegalText();p.feed(text);self.assertIn('41',extract_articles(p.text()));self.assertNotIn('\x00',p.text());self.assertEqual(enc,'utf-16')
 def test_transport_padding_only_after_complete_html(self):
  data='<html><p>Art. 41. Regra atual.</p></html>'.encode('utf-16')+b' '*1559
  text,encoding=decode_html(data);self.assertIn('Art. 41.',text);self.assertIn('transport',encoding)
  with self.assertRaises(UnicodeDecodeError):decode_html('<html>norma truncada'.encode('utf-16')+b' ')
 def test_old_struck_text_is_not_current_authority(self):
  p=LegalText();p.feed('<p><strike>Art. 3º. benefício isolado</strike></p><p>Art. 3º. concorrência dolosa.</p>');self.assertNotIn('benefício',p.text());self.assertIn('dolosa',extract_articles(p.text())['3'][0])
 def test_inline_reference_does_not_replace_article(self):
  text='Art. 92. A referência é ao art. 121-A.\nArt. 121-A. Tipo efetivo.\nArt. 122. Outro.';self.assertEqual(extract_articles(text)['121-A'],['Art. 121-A. Tipo efetivo.'])
 def test_header_newlines_and_ordinal_before_suffix(self):
  articles=extract_articles('Art. 3º-A. Sistema.\nArt.\n399. Instrução.\nArtigo 62. Convenção.');self.assertEqual(set(articles),{'3-A','399','62'})
 def test_encoding_with_embedded_nul_rejected(self):
  with self.assertRaises(ValueError):decode_html(b'<p>\x00unreadable</p>')
 def test_multiple_constitution_parts_are_not_silently_merged(self):
  self.assertEqual(len(extract_articles('Art. 5º. Constituição.\nArt. 5º. ADCT.')['5']),2)
if __name__=='__main__':unittest.main()
