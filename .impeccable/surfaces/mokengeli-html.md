---
version: 1
slug: "mokengeli-html"
primary_target: "mokengeli.html"
related_targets: ["cloud.js"]
---

# Poste de garde (mokengeli.html)

Mode : Operate. Public prioritaire : le gardien, sur un Android d'entrée de gamme, réseau faible. Puis le gérant (tableau de bord, ordinateur), l'habitant (lien Laisser entrer / Refuser), l'accueil public, connexion, inscription, 404, hors ligne, pages légales.

Tâche : enregistrer un visiteur en moins de 30 s, marquer les sorties, faire les rondes, sonner l'habitant, voir l'alerte de liste de surveillance. À ne pas toucher : actions, champs, identifiants DOM utilisés par le script et `cloud.js`, redirections, règles Firestore.

Maquette choisie : `.impeccable/mocks/decision/assigned.html` (390 × 844).

## Direction contract

THESIS : le poste de garde parle comme le mur de la parcelle à Kinshasa : un numéro peint au pochoir, lisible depuis la rue. Refuse le registre SaaS bleu à cartes et pastilles, et le tableau de sécurité sombre.

OWN-WORLD : fond mur chaulé gris-blanc ; bandeau vert portail (tôle peinte, nervures fines) ; bande ocre de soubassement ; encre noire ; rouge peint réservé au danger. Police pochoir uniquement pour les numéros (compteurs, N° de passage) ; texte en Atkinson Hyperlegible auto-hébergée. Boutons à bords nets, contour noir 2 px ; une seule plaque noire pleine par écran. Pas d'ombres, de dégradés décoratifs ni d'étiquettes en majuscules.

STORY : le gardien voit d'un coup d'œil combien de personnes sont sur le site et si ses saisies sont parties, enregistre une entrée d'une main, et retrouve chacun par son numéro de passage.

FIRST VIEWPORT : en haut, bandeau vert : nom du site, commune et gardien à gauche, état du réseau en plaque ocre à droite. Bande ocre. Deux chiffres pochoir géants (sur le site, entrées aujourd'hui) avec filet noir à gauche. Bouton noir pleine largeur 60 px « Nouvelle entrée ». Champ de recherche. Registre en colonnes fixes : heure, N° de passage pochoir vert, nom et chez qui, bouton Sortie 48 px ; ligne en attente d'envoi en ocre foncé ; sortis en gris. Barre du bas : Registre, Entrée, Rondes. Signature : le numéro de passage peint au pochoir, attribué à l'enregistrement.

Raises : colonnes fixes, l'état change la ligne pas la grille (tableau à palettes) ; numéro de passage seul titre de ligne (catalogue numéroté) ; une seule plaque inversée par écran (horaire) ; sortis en gris (catalogue de mascottes) ; recomposition par cases entières (grille Crouwel) ; aucun cadre inutile (tuiles).

FORM : « Le mur et le pochoir », candidat 4 de ma liste ordonnée (badge, tampon, carnet à souches, pochoir, chemise cartonnée, cahier, carte à gratter). seed:7e3eb2c95e7ebe51

FINISH : unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
