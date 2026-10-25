"""Download pinned public weights at build time, never on a user's request."""
import hashlib
import os
from pathlib import Path
import urllib.request

ROOT = Path(os.environ.get("KOKORO_MODEL_DIR", "models"))
RELEASE = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/"
FILES = {
    "model.onnx": ("https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/1939ad2a8e416c0acfeecc08a694d14ef25f2231/onnx/model_quantized.onnx", "fbae9257e1e05ffc727e951ef9b9c98418e6d79f1c9b6b13bd59f5c9028a1478"),
    "voices.bin": ("voices-v1.0.bin", "bca610b8308e8d99f32e6fe4197e7ec01679264efed0cac9140fe9c29f1fbf7d"),
}


def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    for filename, (asset, expected) in FILES.items():
        path = ROOT / filename
        if path.exists() and hashlib.sha256(path.read_bytes()).hexdigest() == expected:
            continue
        temp = path.with_suffix(".download")
        request = urllib.request.Request(asset if asset.startswith("https://") else RELEASE + asset, headers={"User-Agent": "norte-kokoro-build/1"})
        checksum = hashlib.sha256()
        try:
            with urllib.request.urlopen(request, timeout=120) as response, temp.open("wb") as output:
                while block := response.read(1024 * 1024):
                    checksum.update(block)
                    output.write(block)
            if checksum.hexdigest() != expected:
                raise RuntimeError("Model checksum mismatch: " + asset)
            temp.replace(path)
        finally:
            temp.unlink(missing_ok=True)
        print("Verified", filename, flush=True)


if __name__ == "__main__":
    main()
