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

**Habitants et sonnerie**
- Annuaire des habitants et bureaux de chaque site (nom, logement, téléphone), géré depuis le tableau de bord.
- « Sonner » depuis le formulaire d'entrée : le gardien envoie à l'habitant un lien par WhatsApp ou SMS (ou l'appelle).
- L'habitant répond « Laisser entrer » ou « Refuser » sur ce lien, sans compte ; la réponse s'affiche en direct au poste et l'entrée est marquée « accepté par l'habitant ».
- Le lien est secret, ne sert qu'une fois et expire au bout de 30 minutes. Le numéro de l'habitant n'y figure pas.

**Version ordinateur**
- Connecté à un compte, le poste de garde n'est plus une maquette de téléphone : sur ordinateur, registre, formulaire et rondes s'affichent côte à côte ; sur téléphone, l'application occupe tout l'écran.

**Comptes**
- Le gérant crée sa société (e-mail ou numéro de téléphone + mot de passe) et son premier site.
- Il invite ses gardiens avec un code ou un lien `…/#rejoindre-CODE` à envoyer par WhatsApp.
- Le gardien n'a pas besoin d'e-mail : son numéro +243 lui sert d'identifiant.
- Mon compte : nom, changement de mot de passe, mot de passe oublié (comptes e-mail), sites et points de ronde, code d'invitation, équipe (retirer un gardien), déconnexion.

## Trois façons de l'ouvrir

| Mode | Comment | Données |
|---|---|---|
| Démo | page d'accueil | exemples, dans le navigateur |
| Test | bouton « Passer en mode test » ou `…/#test` | registre vide, dans le navigateur |
| Compte | « Créer ma société » ou « Se connecter » | Firebase, partagées en direct entre gardiens et gérant, gardées hors ligne |

## Fichiers

- `mokengeli.html` : l'application (une seule page).
- `cloud.js` : comptes et base partagée (Firebase Auth + Firestore), chargé uniquement sur la version hébergée.
- `firestore.rules` : règles de sécurité (chaque société ne voit que ses données ; un gardien ne peut ni supprimer ni modifier la liste de surveillance).
- `build.js` : génère `site/` pour l'hébergement.
- `site/` : ce qui est mis en ligne sur Netlify.

## Mettre à jour

```bash
node build.js
netlify deploy --prod --no-build --dir site
firebase deploy --only firestore:rules
```

Projet Firebase : `mokengeli-15ffi` (connexion par e-mail/mot de passe activée dans Authentication).
