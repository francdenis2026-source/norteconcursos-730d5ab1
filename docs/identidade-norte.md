# Identidade Norte Concursos

Arquivos finais e guia: `public/media/brand/norte-identity`. O componente `NorteBrand`, o favicon, os ícones Apple/Android e o manifesto usam a mesma família de escudo, caveira e pistola. A assinatura tipográfica usa contornos Archivo, incluindo o nome no HTML acessível do componente.

## Reprodução dos arquivos

Use um ambiente Python separado e instale `scripts/brand/requirements.txt`. Baixe `Archivo[wdth,wght].ttf` e `OFL.txt` do diretório `ofl/archivo` do repositório Google Fonts, mantendo ambos juntos. O gerador fixa os eixos em peso 800 e largura 100.

```sh
python scripts/brand/build-identity.py \
  --premium public/media/brand/norte-identity/emblema-premium.png \
  --flat public/media/brand/norte-identity/emblema-flat.png \
  --font /caminho/Archivo.ttf
python scripts/brand/package-identity.py
```

O primeiro comando deriva SVGs, contornos tipográficos, PNGs, ICO e ícones de app dos originais gerados. A conversão de paleta do símbolo elimina tons intermediários para preservar contraste em favicons. O segundo monta a prancha, o PDF e o ZIP de entrega. As assinaturas digitais e o brasão institucional são vetoriais, sem imagens externas nem scripts; o SVG premium incorpora o PNG metálico original e contornos tipográficos; os PNGs de logos mantêm transparência. A máscara do ícone Android mantém todo o símbolo dentro da área segura circular, sem cortar a ponta do escudo.

Os arquivos antigos de ícones continuam disponíveis com o símbolo novo para manifestos já instalados. O manifesto atual aponta para novos nomes, e as referências HTML ao favicon têm versão, evitando prender o monograma antigo em cache. O service worker inclui os novos arquivos no shell offline.

Os distintivos de marca da homepage, planos e janelas de acesso usam o novo escudo, com versão premium no modo escuro. As ilustrações de fundo e os relógios permanecem independentes da assinatura de marca. O Open Graph e o Twitter usam a imagem pública `https://norteconcursos.xyz/media/brand/norte-identity/compartilhamento.png` (1200 × 630), gerada também pelo script de empacotamento. Serviços de compartilhamento podem manter a prévia anterior em seu próprio cache.
