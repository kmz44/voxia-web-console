# Instrucciones para GitHub Pages

## Archivos Listos
Los archivos de producción están preparados en esta carpeta para GitHub Pages.

## Pasos para subir:

1. Ve a https://github.com y crea un nuevo repositorio:
   - Nombre: `voxia-web-console` (o el que prefieras)
   - Público
   - Sin README, .gitignore o licencia

2. Ejecuta estos comandos en esta carpeta:
```bash
git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
git branch -M main
git push -u origin main
```

3. En GitHub, ve a Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

4. Tu URL será: https://TU-USUARIO.github.io/NOMBRE-REPO

## Archivos incluidos:
- index.html (aplicación principal)
- static/ (CSS y JS optimizados)
- manifest.json, favicon.ico
- robots.txt, sitemap.xml