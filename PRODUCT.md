# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Une seule page HTML (`mokengeli.html`), sans framework. `cloud.js` ajoute les comptes et la base partagée (Firebase Auth + Firestore, projet `mokengeli-15ffi`) sur la version hébergée. `build.js` génère `site/`, publié par Vercel à chaque push sur `main` (https://mokengeli-demo.vercel.app). Pas de TypeScript ni d'étape de compilation : le contrôle de construction est `node build.js`.

## Users

**Public prioritaire : le gardien au poste de garde**, sur son téléphone. Il remplace le cahier de passage tenu à la main : il enregistre chaque visiteur, note les sorties, fait les rondes en scannant les QR codes et sonne l'habitant avant de laisser entrer. Son téléphone est un **Android d'entrée de gamme**, et le **réseau est faible** : données mobiles coupées, lentes ou chères. Le gardien n'a pas forcément d'e-mail : son numéro +243 lui sert d'identifiant.

Autres publics :
- **Le gérant** de la société de gardiennage, de l'immeuble ou de l'hôtel, sur ordinateur. Il suit ses sites, les alertes, le journal des passages, la liste de surveillance et son équipe.
- **L'habitant** (ou le bureau) visité. Il reçoit un lien par WhatsApp ou SMS et répond « Laisser entrer » ou « Refuser », sans compte.

## Product Purpose

Mokengeli est le registre numérique des visiteurs et des rondes des sociétés de gardiennage, des immeubles et des hôtels en RDC. Le cahier de passage devient lisible et consultable à distance. La liste des personnes interdites, jusque-là rangée dans un classeur au bureau du gérant, arrive sur chaque poste.

Réussite : un visiteur enregistré en moins de 30 secondes, même sans réseau ; une alerte immédiate si la personne est sur la liste de surveillance ; un gérant qui sait à distance ce qui se passe sur chaque site.

## Positioning

Il est fait pour le poste de garde tel qu'il est : un téléphone modeste, un réseau qui coupe, un gardien sans e-mail. Il ajoute ce qu'un cahier ne peut pas faire : alerte sur la liste de surveillance, sonnerie de l'habitant avec réponse en direct, rondes prouvées par QR code, et la fiche de police des hôtels.

## Operating Context

- Poste de garde : entrée du visiteur (nom, pièce d'identité, motif, personne visitée, plaque), photo de la pièce, sortie en un geste, rondes par QR code à chaque point de passage.
- Hôtels : fiche de police (chambre, nuitées, nationalité, provenance).
- Sans réseau : les saisies attendent sur le téléphone et partent au retour de la connexion.
- Sonnerie : le gardien envoie à l'habitant un lien secret, à usage unique, qui expire au bout de 30 minutes et ne montre pas le numéro de l'habitant ; la réponse s'affiche en direct au poste.
- Gérant : entrées du jour, visiteurs encore sur site, rondes, alertes (poste inactif, ronde en retard), journal avec recherche et export pour Excel, liste de surveillance, annuaire des habitants, sites, points de ronde, code d'invitation, équipe.
- Trois modes d'ouverture : démo (données d'exemple dans le navigateur), test (registre vide, `#test`), compte (Firebase, partagé en direct).
- Invitation des gardiens par code ou lien `…/#rejoindre-CODE` envoyé par WhatsApp.

## Capabilities and Constraints

- Le fonctionnement ne change pas avec la refonte : mêmes actions, noms de champs, redirections et règles d'accès (`firestore.rules` : chaque société ne voit que ses données ; un gardien ne peut ni supprimer ni modifier la liste de surveillance).
- Le poste de garde doit rester léger et utilisable hors ligne sur un Android d'entrée de gamme ; tout ce qui alourdit le chargement (polices, images) se justifie.
- Sur ordinateur, connecté à un compte, registre, formulaire et rondes s'affichent côte à côte ; sur téléphone, l'application occupe tout l'écran.
- La lecture automatique de la pièce d'identité est simulée dans la démo.
- Non décidé : prix et offre commerciale (aucun prix dans le code).

## Evidence on Hand

Rien d'autre que la démo : pas de client, pas de pilote, pas de témoignage, pas de photo réelle, pas de logo déposé. Ne rien inventer de tout cela. Les données de la démo sont fictives et doivent rester marquées comme exemples.

## Product Principles

1. Le gardien d'abord : chaque écran du poste se comprend et s'utilise vite, d'une main, sur un petit téléphone.
2. Le réseau est une option : rien d'essentiel ne dépend d'une connexion ou d'un chargement lourd.
3. Une alerte se voit, et dit quoi faire : refuser, ou enregistrer avec l'accord du superviseur.
4. La vie privée des habitants est protégée : liens secrets, courts et à usage unique, numéros jamais exposés.
5. Seulement des choses vraies : pas de client, de chiffre ni de témoignage inventés.

## Accessibility & Inclusion

Textes en français simple, avec les accents, dans les mots du poste de garde. Les erreurs disent le problème et la solution. Cibles tactiles d'au moins 48 px, texte d'au moins 15 px, contraste lisible en extérieur. Pas d'e-mail requis pour le gardien.
