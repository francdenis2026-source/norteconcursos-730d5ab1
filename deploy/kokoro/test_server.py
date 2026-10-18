"""API contract tests with a fake engine; run real synthesis separately."""
import io
from pathlib import Path
import tempfile
import unittest
import wave
from unittest.mock import patch
import numpy as np
from fastapi import HTTPException
import server


class FakeEngine:
    def __init__(self):
        self.parts = []
    def create(self, text, **_kwargs):
        self.parts.append(text)
        return np.zeros(240, dtype=np.float32), 24000


class SpeechTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.engine = FakeEngine()
        self.settings = patch.multiple(server, engine=self.engine, CACHE_DIR=Path(self.directory.name))
        self.settings.start()
    def tearDown(self):
        self.settings.stop()
        self.directory.cleanup()
    def test_chunking_bounds_long_words_and_preserves_text(self):
        for text in ['Uma questão de português, com alternativas e comentários.', 'a' * 130]:
            parts = list(server.chunks(text))
            self.assertTrue(all(0 < len(part) <= 20 for part in parts))
            self.assertEqual(''.join(parts).replace(' ', ''), text.replace(' ', ''))
    def test_wav_and_cache_avoid_repeat_inference(self):
        request = server.SpeechRequest(input='Leia esta questão e suas alternativas com atenção.')
        first = server.speech(request)
        with wave.open(io.BytesIO(first.body)) as wav:
            self.assertEqual((wav.getnchannels(), wav.getframerate(), wav.getsampwidth()), (1, 24000, 2))
        count = len(self.engine.parts)
        self.assertEqual(first.body, server.speech(request).body)
        self.assertEqual(count, len(self.engine.parts))
    def test_busy_service_does_not_queue_inference(self):
        server.lock.acquire()
        try:
            with self.assertRaises(HTTPException) as error:
                server.speech(server.SpeechRequest(input='Teste'))
            self.assertEqual(error.exception.status_code, 503)
            self.assertEqual(self.engine.parts, [])
        finally:
            server.lock.release()
    def test_unsupported_voice_and_empty_text_are_rejected(self):
        for values in [dict(input='Teste', voice='invalid'), dict(input='   '), dict(input='Teste', response_format='mp3')]:
            with self.assertRaises(HTTPException):
                server.speech(server.SpeechRequest(**values))
    def test_failed_inference_releases_lock(self):
        with patch.object(self.engine, 'create', side_effect=RuntimeError('failure')):
            with self.assertRaises(RuntimeError):server.speech(server.SpeechRequest(input='Teste'))
        self.assertFalse(server.lock.locked())
    def test_cache_is_bounded(self):
        for index in range(4):(server.CACHE_DIR / f'{index}.wav').write_bytes(bytes(10))
        with patch.object(server, 'MAX_CACHE_BYTES', 20):server.trim_cache()
        self.assertLessEqual(sum(p.stat().st_size for p in server.CACHE_DIR.glob('*.wav')), 20)


if __name__ == '__main__':unittest.main()
