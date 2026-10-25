"""Check actual export contracts: transparent vector voids, valid icon sizes and Android safe area."""
from pathlib import Path
from io import BytesIO
import json, math, struct, zipfile
from xml.etree import ElementTree as ET
from PIL import Image
import cairosvg
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'public/media/brand/norte-identity'
manifest=json.loads((ROOT/'public/manifest.webmanifest').read_text())
for icon in manifest['icons']:
    image=Image.open(ROOT/'public'/icon['src'].lstrip('/'))
    size=int(icon['sizes'].split('x')[0]);assert image.size==(size,size)
    if icon['purpose']=='maskable':
        for y in range(size):
            for x in range(size):
                if image.getpixel((x,y))[:3]!=(20,33,42):
                    assert math.hypot(x-(size-1)/2,y-(size-1)/2)<=size*.4+1, 'shield outside Android safe zone'
print('PASS manifest PNG sizes and maskable circular safe area')
assert Image.open(ROOT/'public/icons/apple-touch-norte-180.png').size==(180,180)
ico=(ROOT/'public/favicon.ico').read_bytes()
assert struct.unpack_from('<HH',ico)==(0,1)
count=struct.unpack_from('<H',ico,4)[0]
assert {ico[6+16*i] for i in range(count)} >= {16,32,48}
print('PASS Apple icon and multiresolution ICO')
# Masks can look correct in browsers but become solid shields in print renderers.
flat=Image.open(OUT/'emblema.png').convert('RGBA')
mono=Image.open(BytesIO(cairosvg.svg2png(url=str(OUT/'emblema-monocromatico.svg')))).convert('RGBA')
differences=0
for a,b in zip(flat.getdata(),mono.getdata()):
    expected=a[3]>128 and a[0]>90 and a[1]>65 and a[0]>a[2]*1.1
    if expected != (b[3]>128):differences+=1
assert differences<512*512*.025, 'monochrome skull/pistol voids lost in print conversion'
print('PASS monochrome vector holes survive actual raster/print rendering')
for name in ['emblema.svg','logo-horizontal-claro.svg','logo-horizontal-escuro.svg','brasao-institucional-preto.svg']:
    data=(OUT/name).read_text();ET.fromstring(data)
    assert '<image' not in data and '<script' not in data and '<text' not in data
for theme in ['claro','escuro']:
    image=Image.open(OUT/f'logo-horizontal-{theme}.png')
    assert image.size==(2000,640) and image.getchannel('A').getextrema()==(0,255)
print('PASS outlined vector signatures and 2000px transparent PNG exports')
with zipfile.ZipFile(OUT/'kit-norte-concursos.zip') as archive:
    assert archive.testzip() is None
    for name in ['logo-premium.png','brasao-institucional-preto.svg','logo-horizontal-escuro.svg','manual-identidade.pdf','OFL-Archivo.txt','icones/favicon.ico']:
        assert 'Norte-Concursos/'+name in archive.namelist()
print('PASS delivery ZIP, guide, three identity variants and font license')
