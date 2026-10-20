# Mokengeli

Registre numérique des visiteurs et des rondes pour les sociétés de gardiennage, les immeubles et les hôtels en RDC. Il remplace le cahier de passage tenu à la main au poste de garde.

**Démo en ligne : https://mokengeli-demo.netlify.app**

## Ce que fait l'application

**Au poste de garde (téléphone du gardien)**
- Enregistrement d'un visiteur en moins de 30 secondes : nom, pièce d'identité, motif, personne visitée, plaque du véhicule.
- Photo de la pièce d'identité (lecture automatique simulée dans la démo).
- Fiche de police pour les hôtels : chambre, nuitées, nationalité, provenance.
- Sorties en un geste et rondes par scan de QR code à chaque point de passage.
- Fonctionne sans réseau : les saisies attendent sur le téléphone et partent au retour de la connexion.
- Alerte immédiate si le visiteur figure sur la liste de surveillance.

**Pour le gérant (tableau de bord)**
- Entrées du jour, visiteurs encore sur site, rondes effectuées, alertes.
- État de chaque site, alertes automatiques (poste inactif, ronde en retard).
- Journal des passages avec recherche et export pour Excel.
- Liste de surveillance partagée avec tous les postes.

## Fichiers

- `mokengeli.html` : l'application (une seule page, sans dépendance).
- `build.js` : génère `site/index.html`, la version autonome pour l'hébergement.
- `site/` : ce qui est mis en ligne sur Netlify.

## Mettre à jour la démo

```bash
node build.js
netlify deploy --prod --no-build --dir site
```

Hors de Claude, l'application tourne en mode démo : les données restent dans le navigateur de chaque visiteur. Le partage en direct entre le gardien et le gérant fonctionne dans la version pilote ; pour le rendre disponible partout, il faudra une base de données externe (par exemple Supabase).
