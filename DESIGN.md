---
name: Mokengeli
description: Le poste de garde peint comme le mur d'une parcelle à Kinshasa - mur chaulé, bandeau portail vert à nervures sur soubassement ocre, encre noire, numéros au pochoir et rouge réservé au danger.
colors:
  mur: "#E9EAE4"
  mur-creux: "#DCDDD6"
  papier: "#FFFFFF"
  encre: "#161616"
  encre-2: "#45473F"
  filet: "#C4C5BC"
  champ-bord: "#8E9087"
  champ-indice: "#5D5F56"
  gris-sorti: "#6E7068"
  portail: "#1E5A3C"
  portail-fonce: "#15422B"
  portail-clair: "#DCE8E0"
  portail-legende: "#E4EDE7"
  ocre: "#C98F2A"
  ocre-encre: "#6B4600"
  ocre-clair: "#F3E4C4"
  danger: "#B3261E"
  danger-clair: "#F7DCD8"
typography:
  pochoir-compteur:
    fontFamily: "Saira Stencil One, Atkinson Hyperlegible, sans-serif"
    fontSize: "60px"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
    fontFeature: "\"tnum\" 1"
  pochoir-indicateur:
    fontFamily: "Saira Stencil One, Atkinson Hyperlegible, sans-serif"
    fontSize: "56px"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
    fontFeature: "\"tnum\" 1"
  pochoir-numero:
    fontFamily: "Saira Stencil One, Atkinson Hyperlegible, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    fontFeature: "\"tnum\" 1"
  pochoir-etape:
    fontFamily: "Saira Stencil One, Atkinson Hyperlegible, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.05
  display:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(27px, 3.6vw, 42px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  titre-gerant:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(23px, 2.6vw, 30px)"
    fontWeight: 700
    letterSpacing: "-0.01em"
  titre-alerte:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.15
  titre:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
  titre-panneau:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "19px"
    fontWeight: 700
  titre-section:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 700
  chapeau:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  corps:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
  libelle:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
  legende:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
  bouton:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 700
  bouton-plaque:
    fontFamily: "Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "19px"
    fontWeight: 700
rounded:
  none: "0px"
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  2xs: "4px"
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "14px"
  2xl: "16px"
  3xl: "20px"
  4xl: "24px"
components:
  bouton-plaque:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.papier}"
    typography: "{typography.bouton-plaque}"
    rounded: "{rounded.lg}"
    padding: "14px"
    height: "60px"
  bouton-plaque-hover:
    backgroundColor: "#000000"
  bouton-contour:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    typography: "{typography.bouton}"
    rounded: "{rounded.lg}"
    padding: "8px 14px"
    height: "48px"
  bouton-contour-hover:
    backgroundColor: "{colors.mur}"
  bouton-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.papier}"
    typography: "{typography.bouton}"
    rounded: "{rounded.lg}"
    padding: "8px 14px"
    height: "48px"
  bouton-portail:
    backgroundColor: "{colors.portail}"
    textColor: "{colors.papier}"
    typography: "{typography.bouton}"
    rounded: "{rounded.lg}"
    height: "48px"
  bouton-portail-hover:
    backgroundColor: "{colors.portail-fonce}"
  champ:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    typography: "{typography.corps}"
    rounded: "{rounded.lg}"
    padding: "10px 12px"
    height: "50px"
  bandeau-portail:
    backgroundColor: "{colors.portail}"
    textColor: "{colors.papier}"
    typography: "{typography.titre}"
    padding: "14px 16px"
  soubassement:
    backgroundColor: "{colors.ocre}"
    height: "10px"
  etat-reseau-en-ligne:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.portail}"
    typography: "{typography.libelle}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
    height: "40px"
  etat-reseau-hors-ligne:
    backgroundColor: "{colors.ocre}"
    textColor: "{colors.encre}"
  compteur:
    textColor: "{colors.encre}"
    typography: "{typography.pochoir-compteur}"
    padding: "2px 0 2px 12px"
  ligne-registre:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    height: "68px"
  ligne-registre-attente:
    backgroundColor: "{colors.ocre-clair}"
    textColor: "{colors.ocre-encre}"
  ligne-registre-sortie:
    textColor: "{colors.gris-sorti}"
  numero-passage:
    textColor: "{colors.portail}"
    typography: "{typography.pochoir-numero}"
  alerte-surveillance:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.papier}"
    typography: "{typography.titre-alerte}"
    rounded: "{rounded.lg}"
    padding: "20px"
  etiquette-exemple:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre-2}"
    typography: "{typography.legende}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
  pastille-ok:
    backgroundColor: "{colors.portail-clair}"
    textColor: "{colors.portail}"
    typography: "{typography.libelle}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  pastille-attention:
    backgroundColor: "{colors.ocre-clair}"
    textColor: "{colors.ocre-encre}"
    typography: "{typography.libelle}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  pastille-grave:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.papier}"
    typography: "{typography.libelle}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  barre-du-bas:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre-2}"
    typography: "{typography.libelle}"
    height: "64px"
  barre-du-bas-active:
    textColor: "{colors.encre}"
  selecteur-vue-actif:
    backgroundColor: "{colors.portail}"
    textColor: "{colors.papier}"
    rounded: "{rounded.md}"
    height: "44px"
  panneau-gerant:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  indicateur-gerant:
    textColor: "{colors.encre}"
    typography: "{typography.pochoir-indicateur}"
    padding: "14px 20px 16px"
  fenetre:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: Mokengeli

## Overview

**Creative North Star: "Le mur et le pochoir"**

Le poste de garde parle comme le mur d'une parcelle à Kinshasa. Le fond est un mur chaulé gris-blanc. En haut, un bandeau vert portail rappelle la tôle peinte, avec ses nervures fines. Il repose sur une bande ocre de soubassement. Tout le reste est écrit à l'encre noire, et les chiffres qui comptent sont peints au pochoir, comme le numéro d'une parcelle lisible depuis la rue. Le gardien voit d'un coup d'œil combien de personnes sont sur le site, si ses saisies sont parties, et retrouve chacun par son numéro de passage.

L'écran est dense mais calme : une colonne au téléphone, des lignes de registre à colonnes fixes plutôt que des cartes, des filets d'encre plutôt que des cadres. L'état change la ligne (fond ocre pâle pour « en attente d'envoi », gris pour « sorti »), jamais la grille. Une seule plaque noire pleine par écran porte l'action principale. Le rouge est réservé au danger : l'alerte de la liste de surveillance est une plaque peinte rouge pleine, le moment le plus grave du poste.

Le monde refuse le registre SaaS bleu à cartes et pastilles arrondies, et le tableau de sécurité sombre. Il n'y a ni ombre, ni dégradé décoratif, ni libellé en majuscules espacées. Le seul motif est la nervure du portail, qui est une matière du monde et non un décor.

**Périmètre.** Le monde s'applique par la classe `u-mur` sur la barre du haut, la vue du gardien (`#v-guard`), le tableau de bord du gérant (`#v-admin`), le message flottant, la fenêtre de sonnerie, la fenêtre d'export, les fenêtres de compte et la page de l'habitant injectées par `cloud.js`. Les anciens noms de variables (`--bg`, `--ink`, `--accent`, `--ok`, `--warn`, `--crit`…) sont redirigés vers les tokens du monde à l'intérieur de `.u-mur`, pour que les éléments pas encore refaits restent lisibles. L'ancienne palette bleu-gris et son mode sombre restent déclarés sur `:root` mais ne s'appliquent plus aux espaces refaits ; le monde force `color-scheme: light` et n'a pas de mode sombre.

**Key Characteristics:**
- Mur chaulé en fond, papier blanc pour ce qu'on lit et remplit, encre noire pour le texte.
- Bandeau portail vert à nervures sur soubassement ocre de 10 px : la même tête au poste, au tableau du gérant et sur la page de l'habitant.
- Police pochoir seulement pour les numéros ; tout le texte en Atkinson Hyperlegible.
- Compteurs géants au pochoir, chacun tenu par un filet noir vertical à gauche.
- Registre en colonnes fixes : heure, N° de passage au pochoir vert, nom et chez qui, bouton Sortie.
- Une seule plaque noire pleine par écran.
- Rouge pour le danger seulement, ocre pour ce qui attend ou demande un coup d'œil, vert portail pour « parti, à jour, vous êtes ici ».
- Plat : aucun ombrage, séparation par filets d'encre de 2 à 4 px.

## Colors

Une palette de mur peint : trois tons de fond minéraux, une encre presque noire, un vert de portail, un ocre de soubassement et un rouge réservé au danger, chacun avec son ton pâle pour les fonds d'état.

### Primary
- **Vert portail** (`portail`) : le bandeau du haut, le bouton de vue actif, la barre d'onglet active (trait de 4 px en haut), le N° de passage et les heures de ronde au pochoir, les numéros d'étape de la démo, l'état « En ligne », les messages de réussite, la réponse « Laisser entrer » et le bouton WhatsApp, l'heure en cours dans le graphique du gérant, la couleur du curseur de saisie. Blanc dessus : 8,1:1.
- **Vert portail foncé** (`portail-fonce`) : survol des boutons verts et des liens-boutons. Jamais en aplat seul.
- **Vert portail pâle** (`portail-clair`) : fond des pastilles « Normal » / « Sur site » et des messages de réussite.
- **Légende portail** (`portail-legende`) : texte secondaire posé sur le bandeau vert (nom du gardien, date du jour du gérant), 6,8:1.

### Secondary
- **Ocre de soubassement** (`ocre`) : la bande de 10 px sous chaque bandeau portail, l'état réseau « Hors ligne · N en attente », la pastille de gravité « À vérifier », le contour d'une sonnerie en attente et la sélection de texte. Encre dessus : 6,4:1. Jamais du texte.
- **Encre ocre** (`ocre-encre`) : le texte de ce qui attend (« En attente d'envoi », ronde en retard, sonnerie en attente, indicateur « alertes à traiter »). 6,7:1 sur l'ocre pâle.
- **Ocre pâle** (`ocre-clair`) : fond de la ligne en attente d'envoi, du point de ronde en retard, de la sonnerie en attente, de la pastille « À surveiller » et du mode démo.

### Tertiary
- **Rouge peint** (`danger`) : l'alerte de la liste de surveillance (plaque pleine), la réponse « Refuser », la pastille de gravité « Grave », le filet du panneau « Liste de surveillance » et les noms qui y figurent, le bouton de remise à zéro. Blanc dessus : 6,5:1.
- **Rouge pâle** (`danger-clair`) : fond des erreurs de saisie et du message d'erreur des comptes.

### Neutral
- **Mur chaulé** (`mur`) : le fond de toutes les vues, le survol des boutons contour, le fond des zones de simulation.
- **Mur en creux** (`mur-creux`) : les zones de formulaire du gérant (ajout à la liste, ajout d'un habitant), les lignes de repère du graphique, la piste de la barre de défilement.
- **Papier** (`papier`) : registre, formulaires, panneaux, fenêtres, champs, barre du haut et barre du bas ; aussi le texte posé sur vert, noir et rouge.
- **Encre** (`encre`) : tout le texte lisible, les filets forts (2 à 4 px), les contours de boutons, la plaque noire, les barres du graphique. 15:1 sur le mur.
- **Encre seconde** (`encre-2`) : le texte secondaire (chez qui, motif, aides, méta), 7,8:1 sur le mur. C'est la seule encre secondaire ; elle ne doit pas pâlir.
- **Filet** (`filet`) : les séparations fines de 1 px entre lignes, les barres vides du graphique. Décoratif, jamais du texte.
- **Bord de champ** (`champ-bord`) : le contour au repos des champs et de la recherche (3,2:1 sur papier). **Indice de champ** (`champ-indice`) : le texte d'exemple dans les champs (6,5:1).
- **Gris sorti** (`gris-sorti`) : les lignes des personnes sorties, au poste comme dans le journal du gérant, et le tiret d'un point de ronde jamais passé (5:1 sur papier).

### Named Rules
**The Rouge Peint Rule.** Le rouge ne marque que le danger : la personne signalée, le refus, l'alerte grave. Une ronde en retard ou un poste inactif est en ocre, jamais en rouge.

**The Trois Voix Rule.** Vert : c'est parti, c'est à jour, vous êtes ici. Ocre : ça attend, jetez un coup d'œil. Rouge : danger. Aucune autre couleur ne porte un état.

**The Soubassement Rule.** Un bandeau vert portail repose toujours sur sa bande ocre ; l'un ne va pas sans l'autre.

## Typography

**Display Font:** Saira Stencil One 400 (avec Atkinson Hyperlegible, sans-serif), auto-hébergée dans `fonts/saira-stencil.woff2`
**Body Font:** Atkinson Hyperlegible 400/700 (avec system-ui, -apple-system, Segoe UI, sans-serif), auto-hébergée dans `fonts/atkinson-400.woff2` et `fonts/atkinson-700.woff2`

**Character:** Saira Stencil One est le pochoir peint sur le mur : massif, coupé, fait pour être lu de loin, et réservé aux chiffres. Atkinson Hyperlegible fait tout le reste ; ses formes très distinctes (zéro barré, I/l/1 différenciés) servent un gardien qui lit vite, dehors, sur un petit écran.

### Hierarchy
- **Pochoir compteur** (400, 60 px, 0,95, +0,02em, chiffres tabulaires) : « sur le site » et « entrées aujourd'hui » au poste ; 52 px dans la version ordinateur entre 1000 et 1320 px.
- **Pochoir indicateur** (400, 56 px ; 46 px au téléphone) : les quatre chiffres du bandeau d'indicateurs du gérant, en encre, vert, encre ocre ou rouge selon l'état.
- **Pochoir numéro** (400, 19 px) : le N° de passage dans le registre et le journal, l'heure du dernier passage et le compte « 3 sur 8 à jour » des rondes.
- **Pochoir étape** (400, 22 px) : les numéros 1 à 5 de « À essayer dans la démo ».
- **Display** (700, clamp 27-42 px, 1,12, -0,01em ; 26 px sous 460 px) : le titre de l'accueil démo, 22ch au plus.
- **Titre gérant** (700, clamp 23-30 px) : le nom de la société dans le bandeau du gérant.
- **Titre alerte** (700, 24 px, 1,15) : « Personne signalée » sur la plaque rouge ; aussi le titre des fenêtres de compte (22 px sous 400 px). Le titre de la page de l'habitant monte à 28 px.
- **Titre** (700, 21 px, 1,2) : nom du site dans le bandeau, titres des écrans « Rondes », de la fenêtre de sonnerie et de l'export. « Nouvelle entrée » est à 22 px.
- **Titre panneau** (700, 19 px) : les en-têtes de panneaux du gérant.
- **Titre section** (700, 18 px) : intertitres de la colonne d'explication, de l'encart « Utiliser Mokengeli pour de vrai » et des sections de compte.
- **Chapeau** (400, 18 px, 1,5 ; 16 px sous 940 px) : la phrase d'accueil de la démo, 52ch au plus.
- **Corps** (400, 16 px, 1,4) : texte courant, noms dans le registre, valeurs des champs (16 px pour éviter le zoom des téléphones).
- **Libellé** (700, 15 px, 1,3) : libellés de champs, mots sous les compteurs, en-têtes de tableau, pastilles, erreurs.
- **Légende** (400, 15 px, 1,4) en encre seconde : chez qui, motif, aides, méta, étiquette « exemple ».
- **Bouton** (700, 15 px) ; **Bouton plaque** (700, 19 px) pour « Nouvelle entrée » et « Enregistrer l'entrée ».

### Named Rules
**The Pochoir Rule.** Le pochoir est réservé aux numéros que l'on compte ou par lesquels on désigne : compteurs, indicateurs, N° de passage, heures de ronde, numéros d'étape. Jamais un mot, un titre, un nom ou un libellé.

**The Quinze Pixels Rule.** Rien sous 15 px, et aucun libellé en majuscules espacées : la casse de phrase, à espacement normal, partout.

## Layout

Au téléphone, une seule colonne en plein écran : bandeau portail, compteurs, plaque noire « Nouvelle entrée », recherche, registre, puis la barre du bas à trois onglets (Registre, Entrée, Rondes). L'écran du poste a 16 px de marge intérieure et 14 px entre les blocs. Sous 460 px, la maquette de téléphone perd son cadre et touche les bords ; la colonne d'explication garde 16 px de gouttière.

Sur l'accueil de la démo, au-dessus de 940 px, le téléphone occupe la colonne de droite sur toute la hauteur et l'explication la colonne de gauche ; en dessous, le téléphone passe en premier. Le contenu est centré dans 1180 px (gouttières d'au moins 16 px).

Pour un compte connecté, à partir de 1000 px, le téléphone devient un poste de travail de trois colonnes (registre 1,2 fr, formulaire 1 fr, rondes 0,9 fr) séparées par des filets d'encre de 2 px, sous un bandeau portail horizontal, dans 1400 px au plus ; la barre du bas disparaît. Le tableau du gérant tient dans 1320 px : en-tête, bande de quatre indicateurs (deux par ligne sous 940 px), puis une grille de panneaux 1,7 fr / 1 fr avec 20 px d'écart, qui passe en une colonne sous 940 px. Sous 600 px, le tableau du gérant touche les bords et ses tableaux gardent leurs colonnes (640 px, 1040 px pour le journal) avec un défilement latéral annoncé par une phrase.

Le rythme vertical vit entre 4 et 24 px, surtout 8 / 10 / 12 / 14 / 16 / 20 px. La barre du haut tient en une ligne sur ordinateur et passe sur deux lignes sous 640 px, avec des libellés courts (« Poste », « Gérant »).

**The Colonnes Fixes Rule.** Une ligne de registre a toujours la même grille (72 px heure, 54 px N°, nom souple, action) ; un point de ronde aussi (62 px heure, point et état, bouton). L'état change le fond ou la couleur de la ligne, jamais ses colonnes.

## Elevation & Depth

Le monde est plat. La profondeur vient du passage mur → papier, des filets d'encre et des aplats peints (bandeau vert, plaque noire, plaque rouge). Fenêtres, registre, panneaux, champs et boutons n'ont aucune ombre (`box-shadow: none` est posé explicitement sur le téléphone et les fenêtres). Les fenêtres sont détachées par un voile d'encre à 62 % (`rgba(22,22,22,.62)`) et un contour de 2 px.

### Shadow Vocabulary
Aucune ombre portée. `box-shadow` n'est utilisé que comme trait plein :
- **Trait d'onglet actif** (`box-shadow: inset 0 4px 0 #1E5A3C`) : le trait vert de 4 px en haut de l'onglet actif de la barre du bas.
- **Filet entre indicateurs** (`box-shadow: inset 1px 0 0 #C4C5BC`) : la séparation entre les cases d'indicateurs du gérant.

### Named Rules
**The Mur Plat Rule.** Rien ne flotte au-dessus du mur. On sépare par un filet d'encre ou un changement de fond, jamais par une ombre ou un flou.

## Shapes

Des bords nets de plaque peinte : 8 px pour tout ce qu'on touche ou remplit (boutons, champs, recherche, plaque rouge, fenêtres, cadre du téléphone, sélecteur de vue), 6 px pour l'état réseau, les champs et messages des fenêtres de compte, 4 px pour les pastilles, l'étiquette « exemple » et la vignette de la pièce. Les blocs de lecture (registre, panneaux du gérant, bande d'indicateurs, encarts) n'ont aucun arrondi : ils sont posés sous un filet d'encre de 3 px. Les compteurs n'ont pas de boîte, seulement un filet noir vertical de 4 px.

Les traits sont de 2 px partout où il y a un contour (boutons, champs, fenêtres, sélecteur), 1 px pour les séparations de lignes, 3 px pour le filet de tête des blocs, 4 px pour le filet des compteurs, 10 px pour le soubassement ocre (8 px dans la version ordinateur). Le pointillé de 1 à 2 px signale ce qui n'est pas réel ou pas encore fait : l'étiquette « exemple », la vignette vide de la pièce, le bouton « Lire la pièce (démo) », la zone de simulation de la sonnerie. Les nervures du portail sont des traits sombres de 2 px tous les 22 px (`repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 2px, transparent 2px 22px)`).

## Components

### Bandeau portail et soubassement (signature)
La tête de chaque espace : aplat vert portail strié de nervures verticales, texte blanc, posé sur une bande ocre de 10 px. Au poste : nom du site et commune (21 px gras) et état du réseau à droite, puis « Gardien : … » et l'heure en légende portail 15 px ; marge intérieure 14 px 16 px. Chez le gérant : le nom de la société en titre gérant, le nombre de sites, la date, et le bouton de remise à zéro (18 px 20 px de marge). Sur la page de l'habitant : une ligne de 18 px gras en tête de la carte.

### État du réseau
Une petite plaque de 40 px de haut à droite du bandeau, à 6 px d'arrondi. En ligne : papier, texte et pastille ronde en vert portail (« En ligne », « Envoi… 2 »). Hors ligne : la plaque devient ocre, texte encre et pastille carrée noire (« Hors ligne · 1 en attente », « Pas de réseau · … »). C'est un bouton : dans la démo, le toucher simule la coupure.

### Compteurs au pochoir (signature)
Deux chiffres pochoir de 60 px, côte à côte (24 px d'écart), chacun tenu par un filet noir de 4 px à gauche et 12 px de retrait, avec leur mot en libellé 15 px gras dessous. L'ensemble est fermé par un filet d'encre de 2 px.

### Plaque noire
Le bouton principal : aplat encre, texte blanc 19 px gras, 60 px de haut, pleine largeur, 8 px d'arrondi, icône « + » de 20 px. Survol vers le noir pur. Une seule par écran : « Nouvelle entrée » au registre, « Enregistrer l'entrée » au formulaire, « Ajouter à la liste » chez le gérant. Quand la plaque rouge d'alerte apparaît, le bouton « Enregistrer » s'efface et la décision se prend sur la plaque. Dans la version ordinateur, où le formulaire est toujours visible, « Nouvelle entrée » et les boutons des rondes repassent en contour pour laisser la plaque au formulaire. Les boutons « primaires » ajoutés ailleurs (« Se connecter ») sont aussi ramenés au contour.

### Buttons
- **Shape :** 8 px d'arrondi, contour encre de 2 px, 48 px de haut au minimum (52 px dans les fenêtres et sur la plaque d'alerte).
- **Contour (par défaut) :** papier, texte encre 15 px gras, 8 px 14 px de marge ; survol vers le mur. C'est le bouton Sortie du registre, Retirer, Exporter, Sonner, Annuler.
- **Danger :** aplat rouge, texte blanc. Sur la plaque rouge, « Refuser l'entrée » s'inverse (papier, texte rouge) et « Enregistrer quand même » devient un contour blanc transparent.
- **Vert portail :** WhatsApp dans la fenêtre de sonnerie et « Laisser entrer » chez l'habitant (68 px, 21 px) ; survol vert portail foncé. « Refuser » chez l'habitant est un contour rouge sur papier (56 px).
- **Lien-bouton :** texte vert portail 15 px gras souligné (2 px, décalage 4 px), 48 px de zone tactile.
- **Désactivé :** opacité 0,5.
- **Focus :** anneau encre de 3 px à 2 px de distance, séparé de l'élément par un liseré papier de 2 px (lisible sur le mur, le papier et le vert) ; blanc sur la plaque rouge et sur l'onglet actif des comptes.

### Sélecteur de vue
Dans la barre du haut : un rail mur à contour encre de 2 px et 8 px d'arrondi, deux boutons de 44 px ; la vue active est en aplat vert portail, texte blanc, l'autre en encre seconde.

### Inputs / Fields
- **Style :** papier, contour bord de champ de 2 px, 8 px d'arrondi, 50 px de haut (48 px chez le gérant), 16 px encre, indice en indice de champ. Les listes déroulantes ont leur propre chevron encre.
- **Focus :** le contour passe à l'encre, et l'anneau de focus clavier s'ajoute au clavier.
- **Libellés :** 15 px gras au-dessus du champ (6 px d'écart), « obligatoire » en encre seconde non gras à côté.
- **Erreur :** un bloc rouge pâle à contour rouge de 2 px, texte rouge foncé 15 px gras, qui dit le problème et la solution.
- **Photo de la pièce :** un bloc papier à contour encre, vignette 96 × 66 px en pointillé (pleine et encre une fois la photo prise), « Photographier » en premier, « Lire la pièce (démo) » en pointillé.

### Registre en colonnes fixes (signature)
Un bloc papier sous filet d'encre de 3 px, en-tête 16 px gras de 48 px (« Présents sur le site », compte à droite). Chaque ligne fait au moins 68 px : heure d'entrée en 15 px gras (et « → 11:20 » dessous pour une sortie), **N° de passage** au pochoir vert (« N° 3 », le rang de l'entrée dans la journée), nom 16 px et chez qui / motif en légende, bouton Sortie de 48 px. Les sortis sont repliés sous « Sortis aujourd'hui (N) », avec un chevron qui tourne. Les rondes reprennent la même construction : heure du dernier passage au pochoir, point et état, bouton Scanner.

### États hors ligne, en attente, sortis
- **En attente d'envoi :** la ligne prend le fond ocre pâle et ajoute « En attente d'envoi » en encre ocre gras. Le point de ronde en retard suit le même code.
- **Sortis :** heure, N° et détails en gris sorti ; la grille ne bouge pas. Dans le journal du gérant, toute ligne sortie passe en gris sorti, le nom restant en encre.
- **Hors ligne :** la plaque réseau devient ocre et compte les saisies en attente.

### Plaque rouge d'alerte (signature)
L'alerte de la liste de surveillance : aplat rouge plein, texte blanc, 8 px d'arrondi, 20 px de marge. Triangle de 28 px et « Personne signalée » en titre alerte, le motif en 16 px, puis la consigne « Ne laissez pas entrer sans l'accord du superviseur. » en gras entre deux filets blancs, puis les deux boutons empilés de 52 px.

### Sonnerie de l'habitant
Une fenêtre papier à contour encre. L'état de la réponse est un bloc de 17 px : ocre pâle à contour ocre avec un carré qui pulse en attente, vert portail plein si accepté, rouge plein si refusé. La simulation de la démo est une zone mur en pointillé.

### Étiquette « exemple »
En mode démo, chaque liste remplie de données fictives porte, à côté de son titre, une étiquette papier en pointillé encre seconde de 1 px, 4 px d'arrondi, « exemple » en 15 px normal. Elle disparaît hors démo, et « Mis à jour en direct » disparaît en démo.

### Tableau de bord du gérant
- **Indicateurs :** une seule bande papier sous filet d'encre de 3 px, quatre cases séparées par un filet de 1 px, chiffre pochoir de 56 px et libellé 15 px gras. Le chiffre prend le vert, l'encre ocre ou le rouge selon l'état.
- **Panneaux :** papier sans arrondi sous filet d'encre de 3 px, en-tête de 60 px avec titre 19 px gras et méta en légende. Le panneau « Liste de surveillance » a son filet en rouge et ses noms en rouge.
- **Tableaux :** 15 px, en-têtes gras sur filet d'encre de 2 px, lignes séparées par des filets de 1 px, chiffres tabulaires, survol de ligne très pâle. Le journal reprend le N° de passage au pochoir vert.
- **Pastilles :** 4 px d'arrondi, 15 px gras : vert pâle « Normal / Sur site », ocre pâle « À surveiller », rouge plein pour le grave.
- **Alertes :** une plaque de gravité devant le texte (ocre « À vérifier », rouge « Grave »), titre 16 px gras, détail en légende ; la ligne grave a un fond rosé.
- **Graphique :** barres d'encre sans arrondi sur repères mur en creux tous les 45 px, l'heure en cours en vert portail, barres vides en filet.

### Navigation
- **Barre du bas (téléphone) :** papier, filet d'encre de 2 px en haut, trois onglets de 64 px avec icône au trait de 24 px et libellé 15 px en encre seconde ; l'onglet actif passe à l'encre avec un trait vert portail de 4 px en haut.
- **Barre du haut :** papier, filet d'encre de 2 px en bas, marque « Mokengeli » 20 px gras, sélecteur de vue, pastille de mode, boutons Mode test et Se connecter en contour.

### Messages et fenêtres
Le message du téléphone est une plaque encre, texte blanc 15 px, 8 px d'arrondi, posée 80 px au-dessus du bas. Les fenêtres (sonnerie, export, compte) sont du papier à contour encre de 2 px, 8 px d'arrondi, 20 px de marge, titre souligné d'un filet d'encre de 2 px.

## Do's and Don'ts

### Do:
- **Do** poser chaque espace sur le mur chaulé, avec le bandeau vert portail à nervures et son soubassement ocre de 10 px en tête.
- **Do** écrire tout le texte en Atkinson Hyperlegible, en encre ou en encre seconde, à 15 px au moins.
- **Do** réserver Saira Stencil One aux numéros : compteurs, indicateurs, N° de passage, heures de ronde.
- **Do** garder une seule plaque noire pleine par écran, et repasser les autres boutons en contour quand deux vues sont visibles ensemble.
- **Do** montrer l'état par la ligne (ocre pâle pour l'attente, gris sorti pour la sortie) sans changer les colonnes.
- **Do** séparer par des filets d'encre (1, 2, 3 ou 4 px) et par le passage du mur au papier.
- **Do** marquer toute donnée fictive avec l'étiquette « exemple » en pointillé.
- **Do** garder 48 px de cible tactile au minimum, 60 px pour la plaque noire.

### Don't:
- **Don't** construire un registre SaaS bleu à cartes et pastilles arrondies, ni un tableau de sécurité sombre.
- **Don't** utiliser le rouge pour autre chose que le danger ; ce qui attend est en ocre.
- **Don't** mettre un mot, un titre ou un nom au pochoir.
- **Don't** ajouter d'ombre, de flou ou de dégradé décoratif ; les nervures du portail sont le seul motif.
- **Don't** écrire des libellés en majuscules espacées, ni du texte sous 15 px.
- **Don't** donner à chaque visiteur sa propre carte : une ligne de registre, une grille.
- **Don't** utiliser l'ocre pour du texte ; son texte est l'encre ocre.
