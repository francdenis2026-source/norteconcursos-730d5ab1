"""Create a self-contained presentation, print exports and downloadable delivery kit."""
from pathlib import Path
import re, shutil, zipfile
import cairosvg
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'public/media/brand/norte-identity'

# Social crawlers require a public raster image with an absolute metadata URL.
from PIL import Image
share=Image.new("RGB", (1200,630), "#14212A")
logo=Image.open(OUT/"logo-premium.png").convert("RGBA")
logo.thumbnail((420,510), Image.Resampling.LANCZOS)
share.paste(logo, ((1200-logo.width)//2,(630-logo.height)//2), logo)
share.save(OUT/"compartilhamento.png", optimize=True)

def nested(name,x,y,w,h):
    raw=(OUT/name).read_text()
    raw=re.sub(r'^<svg[^>]*>',f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="0 0 '+('620 640' if name.startswith('brasao') else '512 700')+'">',raw)
    return raw

board='''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1120" viewBox="0 0 1600 1120">
<rect width="1600" height="1120" fill="#EDEBE4"/>
<rect width="1600" height="100" fill="#14212A"/>
<g font-family="sans-serif"><text x="48" y="46" fill="#F3EEE2" font-size="26" font-weight="bold" letter-spacing="4">NORTE CONCURSOS</text>
<text x="48" y="75" fill="#C6AD76" font-size="13" letter-spacing="2">IDENTIDADE VISUAL · ESCUDO, CAVEIRA E PISTOLA</text>
<rect x="48" y="140" width="480" height="605" rx="20" fill="#F8F7F2"/>
<rect x="560" y="140" width="480" height="605" rx="20" fill="#FFFFFF"/>
<rect x="1072" y="140" width="480" height="605" rx="20" fill="#14212A"/>
'''
board+=nested('logo-premium.svg',113,165,350,479)
board+=nested('brasao-institucional-preto.svg',600,182,400,413)
board+=nested('logo-vertical-escuro.svg',1137,165,350,479)
board+='''<text x="80" y="700" fill="#14212A" font-size="18" font-weight="bold">01 / PREMIUM METÁLICA</text>
<text x="592" y="700" fill="#14212A" font-size="18" font-weight="bold">02 / BRASÃO INSTITUCIONAL</text>
<text x="1104" y="700" fill="#F3EEE2" font-size="18" font-weight="bold">03 / DIGITAL DOURADA</text>
<text x="48" y="810" fill="#14212A" font-size="18" font-weight="bold">FAVICONS E ÍCONES DO APP</text>
'''
# Inline vector thumbnails avoid external references in the printable board.
mark=(OUT/'emblema.svg').read_text()
for x,size,label in [(64,24,'16–32 PX'),(210,48,'48 PX'),(390,88,'APP'),(580,88,'MASKABLE')]:
    if label in ['APP','MASKABLE']:board+=f'<rect x="{x-7}" y="842" width="102" height="102" rx="21" fill="#14212A"/>'
    art=re.sub(r'^<svg[^>]*>',f'<svg x="{x}" y="{850+(88-size)/2}" width="{size}" height="{size}" viewBox="0 0 512 512">',mark)
    board+=art+f'<text x="{x}" y="978" fill="#53616A" font-size="12">{label}</text>'
board+='<text x="832" y="810" fill="#14212A" font-size="18" font-weight="bold">PALETA PRINCIPAL</text>'
for x,color,label in [(832,'#14212A','AZUL GRAFITE'),(1002,'#C6AD76','DOURADO'),(1172,'#F3EEE2','MARFIM'),(1342,'#947335','DOURADO / CLARO')]:
    board+=f'<rect x="{x}" y="850" width="138" height="70" rx="10" fill="{color}" stroke="#D1CEC4"/><text x="{x}" y="948" fill="#14212A" font-size="12">{label}</text><text x="{x}" y="970" fill="#53616A" font-size="12">{color}</text>'
board+='''<path d="M48 1026H1552" stroke="#CCC8BB"/><text x="48" y="1061" fill="#53616A" font-size="13">SVG vetorial · PNG transparente · ICO · ícones Apple e Android · EPS · guia e arquivos de aplicação</text>
</g></svg>'''
(OUT/'prancha-identidade.svg').write_text(board)
cairosvg.svg2png(bytestring=board.encode(),write_to=str(OUT/'prancha-identidade.png'))
cairosvg.svg2pdf(bytestring=board.encode(),write_to=str(OUT/'manual-identidade.pdf'))
for name in ['emblema','brasao-institucional-preto','logo-horizontal-claro']:
    cairosvg.svg2eps(url=str(OUT/f'{name}.svg'),write_to=str(OUT/f'{name}.eps'))
# The ZIP has a single delivery folder and includes every variant plus platform icons.
with zipfile.ZipFile(OUT/'kit-norte-concursos.zip','w',zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
    for path in sorted(OUT.iterdir()):
        if path.suffix!='.zip' and not path.name.startswith('_'):archive.write(path,'Norte-Concursos/'+path.name)
    for path in sorted((ROOT/'public/icons').glob('*.png')):
        if path.name.startswith(('norte-','favicon-','apple-touch-norte')):archive.write(path,'Norte-Concursos/icones/'+path.name)
    archive.write(ROOT/'public/favicon.svg','Norte-Concursos/icones/favicon.svg')
    archive.write(ROOT/'public/favicon.ico','Norte-Concursos/icones/favicon.ico')
print('Presentation, print files and ZIP ready.')
