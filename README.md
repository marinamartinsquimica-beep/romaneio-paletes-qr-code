# Romaneio Paletes - Local

Versão local com visual profissional, PWA, uso em celular, funcionamento offline e aviso automático de nova versão.

## Arquivos principais
- index.html
- inicio.html
- manifest.json
- service-worker.js
- version.json
- export-utils.js
- icon-192.png
- icon-512.png

## Atualização automática
Quando publicar nova versão, aumente a versão em `version.json`, em `APP_VERSION` no `index.html` e troque o `CACHE_NAME` no `service-worker.js`.
