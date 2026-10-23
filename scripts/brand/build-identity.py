"""Export the approved Norte shield into a coherent, scalable identity kit.
Requires Pillow, fonttools, vtracer, CairoSVG and skia-pathops. See docs/identidade-norte.md.
"""
import argparse, base64, json, math, re, shutil, subprocess, zipfile
from pathlib import Path
from xml.etree import ElementTree as ET
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
import vtracer
import cairosvg
import pathops
from fontTools.svgLib.path import parse_path
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/media/brand/norte-identity'
OUT.mkdir(parents=True, exist_ok=True)
parser = argparse.ArgumentParser()
parser.add_argument('--premium', type=Path, required=True)
parser.add_argument('--flat', type=Path, required=True)
parser.add_argument('--font', type=Path, required=True)
args = parser.parse_args()
NAVY, GOLD, PAPER = '#14212A', '#C6AD76', '#F3EEE2'
NS = '{http://www.w3.org/2000/svg}'

def svg(body, w, h, label='Norte Concursos'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{label}">{body}</svg>'
def write(name, content):
    (OUT/name).write_text(content)
def render(source, target, size=None):
    width = size or int(ET.parse(source).getroot().attrib['width'])
    cairosvg.svg2png(url=str(source),write_to=str(target),output_width=width)
def trace(source, target, flat=False):
    vtracer.convert_image_to_svg_py(str(source), str(target), colormode='color', hierarchical='stacked',mode='spline', filter_speckle=8 if flat else 16,color_precision=2 if flat else 3, layer_difference=64 if flat else 32,corner_threshold=70,length_threshold=3,max_iterations=10,splice_threshold=45,path_precision=2)
    tree=ET.parse(target).getroot()
    parts=[]
    for e in tree:
        attrs=' '.join(f'{k}="{v}"' for k,v in e.attrib.items())
        parts.append(f'<path {attrs}/>')
    return ''.join(parts)

# Preserve the generated originals. Downsampling/palette conversion creates deterministic icon exports.
for source,name in [(args.premium,'emblema-premium.png'),(args.flat,'emblema-flat.png')]:
    if source.resolve() != (OUT/name).resolve(): shutil.copyfile(source,OUT/name)
source=Image.open(args.premium).convert('RGBA')
source.resize((768,768),Image.Resampling.LANCZOS).save(OUT/'emblema-premium.webp',quality=91,method=6)
premium=f'<image href="data:image/png;base64,{base64.b64encode((OUT/"emblema-premium.png").read_bytes()).decode()}" width="512" height="512"/>'
write('emblema-premium.svg',svg(premium,512,512))
flat=Image.open(args.flat).convert('RGBA').resize((512,512),Image.Resampling.LANCZOS)
pixels=[]
for r,g,b,a in flat.getdata():
    color=(198,173,118) if r>90 and g>65 and r>b*1.1 else (20,33,42)
    pixels.append((*color,255 if a>=128 else 0))
flat.putdata(pixels)
flat.save(OUT/'_flat-trace.png')
mark=trace(OUT/'_flat-trace.png',OUT/'_flat.svg',True)
write('emblema.svg',svg(mark,512,512))
# One shared outlined wordmark: no external fonts needed in exported logos or the application.
font=TTFont(args.font)
if 'fvar' in font: font=instantiateVariableFont(font,{'wght':800,'wdth':100},inplace=False)
glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); units=font['head'].unitsPerEm

def line(text,size,target_width,x,y):
    raw=[]; advances=[]
    for ch in text:
        glyph=glyphs[cmap[ord(ch)]]
        pen=SVGPathPen(glyphs); glyph.draw(pen)
        raw.append(pen.getCommands()); advances.append(glyph.width)
    scale=size/units
    tracking=(target_width-sum(advances)*scale)/max(1,len(text)-1)
    parts=[]; cursor=x
    for path,advance in zip(raw,advances):
        parts.append(f'<path d="{path}" transform="translate({cursor:.3f} {y}) scale({scale:.7f} {-scale:.7f})"/>')
        cursor+=advance*scale+tracking
    return ''.join(parts)
word_norte=line('NORTE',108,418,1,90)
word_concursos=line('CONCURSOS',56,418,1,155)
word_data={'viewBox':'0 0 420 170','norte':[dict(e.attrib) for e in ET.fromstring('<g>'+word_norte+'</g>')],'concursos':[dict(e.attrib) for e in ET.fromstring('<g>'+word_concursos+'</g>')]}
(ROOT/'src/assets/brand/norte-wordmark.json').write_text(json.dumps(word_data,separators=(',',':')))
# JSON contains only generated, local SVG paths, never user HTML.
for theme,ink,accent in [('claro',NAVY,'#947335'),('escuro',PAPER,GOLD)]:
    words=f'<g fill="{ink}">{word_norte}</g><g fill="{accent}">{word_concursos}</g>'
    horizontal=f'<g transform="translate(10 10) scale(.5859375)">{mark}</g><g transform="translate(350 47) scale(1.42)">{words}</g>'
    write(f'logo-horizontal-{theme}.svg',svg(horizontal,1000,320))
    vertical=f'<g transform="translate(0 0)">{mark}</g><g transform="translate(46 510)">{words}</g>'
    write(f'logo-vertical-{theme}.svg',svg(vertical,512,700))
    write(f'nome-{theme}.svg',svg(words,420,170))
    for kind in ['horizontal','vertical']:
        render(OUT/f'logo-{kind}-{theme}.svg',OUT/f'logo-{kind}-{theme}.png',2000 if kind=='horizontal' else 1024)
# Resolve painter order into a single compound outline; the voids are real vector holes,
# not a luminance mask (which some print renderers incorrectly interpret as an opaque shield).
mono_path=pathops.Path()
for el in ET.fromstring(svg(mark,512,512)):
    path=pathops.Path()
    numbers=[float(v) for v in re.findall(r'-?\d+(?:\.\d+)?',el.attrib.get('transform',''))]
    dx,dy=(numbers+[0,0])[:2]
    parse_path(el.attrib['d'],TransformPen(path.getPen(),(1,0,0,1,dx,dy)))
    color=el.attrib.get('fill',NAVY)
    r,g,b=tuple(int(color[i:i+2],16) for i in [1,3,5])
    operation=pathops.PathOp.UNION if r>90 and g>65 and r>b*1.1 else pathops.PathOp.DIFFERENCE
    mono_path=pathops.op(mono_path,path,operation)
pen=SVGPathPen(None);mono_path.draw(pen)
mono_outline=pen.getCommands()
for name,ink in [('monocromatico',NAVY),('negativo',PAPER)]:
    write(f'emblema-{name}.svg',svg(f'<path d="{mono_outline}" fill="{ink}"/>',512,512))
# Institutional crest: all lettering is outlined along the arcs (no font dependency).
def arc_line(text, size, radius, bottom=False):
    scale=size/units
    advances=[glyphs[cmap[ord(ch)]].width*scale for ch in text]
    tracking=1.1
    total=sum(advances)+tracking*(len(text)-1)
    cursor=-total/2
    parts=[]
    for ch,advance in zip(text,advances):
        center=cursor+advance/2
        angle=math.pi/2-center/radius if bottom else -math.pi/2+center/radius
        rotation=math.degrees(angle)-90 if bottom else math.degrees(angle)+90
        pen=SVGPathPen(glyphs);glyphs[cmap[ord(ch)]].draw(pen)
        x,y=310+radius*math.cos(angle),330+radius*math.sin(angle)
        parts.append(f'<path d="{pen.getCommands()}" transform="translate({x:.3f} {y:.3f}) rotate({rotation:.3f}) translate({-advance/2:.3f} 0) scale({scale:.7f} {-scale:.7f})"/>')
        cursor+=advance+tracking
    return ''.join(parts)
legend=arc_line('NORTE CONCURSOS',34,270)+arc_line('POLÍCIA · CARREIRAS · SEGURANÇA',19,277,True)
for name,ink in [('preto','#15191B'),('dourado',GOLD),('branco',PAPER)]:
    ink_mark=f'<path d="{mono_outline}" fill="{ink}"/>'
    crest=f'<g transform="translate(60 92) scale(.9765625)">{ink_mark}</g><g fill="{ink}">{legend}</g>'
    write(f'brasao-institucional-{name}.svg',svg(crest,620,640))
    render(OUT/f'brasao-institucional-{name}.svg',OUT/f'brasao-institucional-{name}.png')
# The satin-gold premium signature uses the same outlined typography and master shield.
premium_type=f'<defs><linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#E8D5A4"/><stop offset=".48" stop-color="#C5AA6D"/><stop offset="1" stop-color="#8F703C"/></linearGradient></defs><g transform="translate(0 2)" fill="#51452D">{word_norte}{word_concursos}</g><g fill="url(#metal)">{word_norte}{word_concursos}</g>'
write('logo-premium.svg',svg(f'<g>{premium}</g><g transform="translate(46 510)">{premium_type}</g>',512,700))
render(OUT/'logo-premium.svg',OUT/'logo-premium.png',1024)
# The small-size SVG is the same symbol as the app and website, not a different monogram.
shutil.copyfile(OUT/'emblema.svg',ROOT/'public/favicon.svg')
shutil.copyfile(OUT/'logo-horizontal-claro.svg',ROOT/'public/norte-logo.svg')
render(OUT/'emblema.svg',OUT/'emblema.png')
emblem=Image.open(OUT/'emblema.png').convert('RGBA')
icons=ROOT/'public/icons'; icons.mkdir(exist_ok=True)
for size in [16,32,48]: emblem.resize((size,size),Image.Resampling.LANCZOS).save(icons/f'favicon-{size}.png')
emblem.resize((64,64),Image.Resampling.LANCZOS).save(ROOT/'public/favicon.ico',sizes=[(16,16),(32,32),(48,48),(64,64)])

def app_icon(size,ratio,name):
    alpha=emblem.getchannel('A'); points=[]
    for y in range(emblem.height):
        for x in range(emblem.width):
            if alpha.getpixel((x,y))>64: points.append(math.hypot(x-256,y-256))
    scale=(size*ratio)/max(points)
    edge=round(512*scale)
    art=emblem.resize((edge,edge),Image.Resampling.LANCZOS)
    canvas=Image.new('RGBA',(size,size),NAVY);canvas.alpha_composite(art,((size-edge)//2,(size-edge)//2))
    canvas.convert('RGB').save(icons/name,optimize=True)
for size in [192,256,512]: app_icon(size,.44,f'norte-{size}.png')
app_icon(512,.38,'norte-maskable-512.png')
app_icon(180,.40,'apple-touch-norte-180.png')
for old,new in [('icon-256.png','norte-256.png'),('icon-512.png','norte-512.png'),('icon-512-maskable.png','norte-maskable-512.png'),('apple-touch-180.png','apple-touch-norte-180.png')]:shutil.copyfile(icons/new,icons/old)
shutil.copyfile(args.font.parent/'OFL-Archivo.txt',OUT/'OFL-Archivo.txt')
for path in OUT.glob('_*'):path.unlink()
print('Identity exports ready:',OUT)
