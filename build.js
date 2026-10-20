// Construit site/index.html : la page Mokengeli en document HTML complet, prête pour Netlify.
// Utilisation : node build.js
const fs = require('fs');
const path = require('path');

const page = fs.readFileSync(path.join(__dirname, 'mokengeli.html'), 'utf8');
const head = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Mokengeli : registre numérique des visiteurs et des rondes pour les sociétés de gardiennage et les hôtels.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 34'%3E%3Crect x='1' y='1' width='32' height='32' rx='8' fill='%231D46C8'/%3E%3Cpath d='M10 9h14v16H10zM13 9v16' fill='none' stroke='white' stroke-width='2'/%3E%3C/svg%3E">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
`;
fs.mkdirSync(path.join(__dirname, 'site'), {recursive: true});
fs.writeFileSync(path.join(__dirname, 'site', 'index.html'), head + page + '\n</body>\n</html>\n');
console.log('site/index.html généré');
