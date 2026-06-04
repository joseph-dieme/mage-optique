# Fiche Technique & Guide de Transmission : Mage Optique & Services

Ce fichier `GEMINI.md` sert de document de référence et de guide de passation pour tout futur modèle d'intelligence artificielle ou développeur travaillant sur la plateforme digitale **Mage Optique & Services**.

---

## 1. Présentation de l'Application

**Mage Optique & Services** est une application web e-commerce haut de gamme et interactive destinée à un opticien lunetier de prestige situé à Dakar, Ouest Foire (Sénégal). 

L'application offre une expérience utilisateur premium inspirée de l'univers du luxe. Elle combine un catalogue e-commerce complet, un système d'analyse d'ordonnance et de devis, un module de prise de rendez-vous en ligne avec génération de billets, un panneau d'administration pour la gestion en temps réel, ainsi qu'un module innovant d'**essai virtuel 3D** (Virtual Try-On) exploitant la webcam ou l'import d'une photo.

---

## 2. Fonctionnalités Implémentées

### 🛍️ E-Commerce & Catalogue
* **Catalogue dynamique (`boutique.html`)** : Affichage et filtrage en temps réel des montures par catégorie (Optique, Solaire, Éditions Limitées) et par cible (Hommes, Femmes, Enfants).
* **Recherche temps réel** : Barre de recherche instantanée analysant les titres, descriptions, spécifications et étiquettes.
* **Fiche produit détaillée (`details.html`)** : Descriptif complet, spécifications techniques des matériaux, sélection des coloris, prix en FCFA, et avis clients.
* **Gestion des Favoris & Panier** :
  * Ajout/retrait des favoris avec persistance locale et badges dynamiques dans le header.
  * Panier d'achat avec calcul automatique du sous-total et des options de livraison (retrait gratuit en salon, livraison à Dakar).
  * Système de commande simulé avec sauvegarde locale et redirection vers la connexion si le client n'est pas identifié.

### 👓 Module d'Essai Virtuel (Virtual Try-On)
* **Intégration directe dans la fiche produit (`details.html`)** :
  * Accès en un clic à la caméra (webcam live) ou possibilité d'importer un autoportrait (photo).
  * Superposition interactive de la monture sélectionnée sur le visage sur un élément `<canvas>`.
  * **Contrôles interactifs de précision** : Glisser-déposer pour ajuster la position des lunettes, réglettes de zoom (Scale) et d'orientation (Rotation), et bouton de réinitialisation.
  * **Capture de portrait (Snapshot)** : Déclenchement d'un flash photo avec obturateur sonore virtuel, compilation de l'image (flux vidéo + monture + filigrane premium de la marque) et téléchargement immédiat au format JPEG.

### 📅 Prise de Rendez-vous Concierge (`contact.html`)
* **Formulaire d'inscription multi-étapes** : Choix de la prestation (examen de vue, visagisme, essai de montures), date, heure et coordonnées.
* **Génération de billet de consultation** :
  * Génération automatique d'un reçu au format texte brut.
  * Dessin à la volée sur un `<canvas>` d'un billet haut de gamme (dégradés sombres, double cadre doré, typographie Playfair Display) exportable et téléchargeable sous forme d'image PNG.
  * Bouton d'envoi de mail pré-rempli (mailto) pour soumettre la demande directement à l'opticien.

### 📄 Demande de Devis Optique (`services.html`)
* Formulaire professionnel permettant de renseigner les informations de mutuelle/assurance et le type de verres recommandés.
* Téléchargement simulé d'une ordonnance ophtalmologique.
* Génération automatique d'une **ordonnance optique fictive en SVG haute fidélité** (avec sphères, cylindres, axes pour œil droit/gauche, signature et cachet clinique) consultable hors ligne.

### 🔐 Authentification & Espace Client (`connexion.html`)
* Formulaire double (Connexion / Inscription) dynamique.
* Rôles utilisateurs différenciés (Client standard et Administrateur).
* Conservation de l'état de connexion (`localStorage`) pour maintenir l'accès au panier et aux formulaires.

### 🖥️ Panneau d'Administration (`admin.html`)
* **Tableau de bord analytique** : Résumé des indicateurs de performance clés (revenu total accumulé en FCFA, nombre d'abonnés newsletter, rendez-vous à venir, devis en attente).
* **Gestion des Produits (CRUD)** : Interface complète pour ajouter, modifier (titre, prix, description, catégorie, genre, image) ou supprimer des montures.
* **Gestion des Commandes, Rendez-vous et Devis** :
  * Validation ou annulation des rendez-vous en un clic.
  * Changement de statut des commandes (En attente, Confirmé, Livré).
  * Consultation et validation des demandes de devis et ordonnances associées.

---

## 3. Structure des Fichiers

La racine du projet est structurée comme suit :

```text
mageOptic&Services/
│
├── index.html                   # Page d'accueil (Présentation, Bento Grid, Carousel)
├── boutique.html                # Catalogue produit avec filtres et recherche
├── services.html                # Page des services & Formulaire de demande de devis
├── details.html                 # Fiche produit détaillée & Module d'essai virtuel
├── a-propos.html                # Histoire de la marque et équipe
├── contact.html                 # Formulaire de prise de rendez-vous & Billet canvas
├── connexion.html               # Formulaire d'authentification client & admin
├── panier.html                  # Panier d'achat, livraison et validation de commande
├── admin.html                   # Tableau de bord administrateur (CRUD, Stats, Commandes)
│
├── DESIGN.md                    # Spécifications du design system et des jetons visuels
├── README.md                    # Notice explicative sur Stitch et les plugins associés
├── GEMINI.md                    # Ce guide technique de passation et de maintenance
├── change_to_mage.js            # Script utilitaire de renommage global (Nage -> Mage)
│
├── css/
│   └── style.css                # Feuille de style globale (variables, layouts, responsive)
│
├── js/
│   ├── db.js                    # Base de données simulée localement (localStorage CRUD)
│   └── main.js                  # Logique d'interface (3D tilt, Try-on, panier, navigation)
│
├── assets/                      # Photographies, icônes et images de marque
├── plugins/                     # Ressources additionnelles et plugins agents
└── .stitch/
    └── designs/                 # Code source des maquettes au format HTML statique
```

---

## 4. Technologies Utilisées

* **Langages de base** : HTML5 sémantique, CSS3 moderne et JavaScript (ES6+).
* **Frameworks & Bundlers** : Aucun (Architecture purement Vanilla sans dépendances complexes, garantissant une rapidité d'exécution maximale et une compatibilité immédiate avec les navigateurs).
* **Typographies** : Google Fonts
  * *Playfair Display* (Serif d'époque, pour les titres et l'ambiance haute lunetterie)
  * *Hanken Grotesk* (Sans-serif géométrique, pour le corps de texte et les contrôles techniques)
* **Icônes** : Material Symbols Outlined (Google Icons).
* **Base de Données / Persistance** : `localStorage` du navigateur. Les schémas de données par défaut se chargent automatiquement s'ils n'existent pas en local.

---

## 5. Décisions de Design (Design System)

La charte graphique est régie par [DESIGN.md](file:///c:/Users/DELL%20Precision%207520/mageOptic&Services/DESIGN.md) et repose sur des codes visuels de luxe :
* **Couleurs** :
  * **Fond d'interface** : Blanc Papier (`#FFFFFF` / `#f9f9f9`) pour la clarté et l'espace.
  * **Accentuation de Prestige** : Or Mutilé (`#C5A059`) appliqué avec parcimonie pour les appels à l'action, l'état actif et les détails de marque.
  * **Neutralité Sombre** : Charbon Profond (`#121212`) pour les boutons primaires et les en-têtes.
  * **Bordures & Textes secondaires** : Ardoise Douce (`#4A5568`).
* **Animations & Micro-interactions** :
  * Effet de parallaxe 3D (`initTiltCards`) appliqué sur les cartes de la boutique et la Bento Grid.
  * Transition d'opacité fluide (1.5s) sur le carrousel de la page d'accueil.
  * Floutage de fond (`backdrop-filter: blur(8px)`) avec opacité pour les menus collants et les fenêtres volantes.
* **Formes (Shapes)** :
  * Coins arrondis légers (4px, soit `0.25rem`) pour préserver une esthétique architecturale épurée.

---

## 6. Instructions pour un Futur Modèle IA (Consignes de Maintenance)

Si vous devez faire évoluer ou corriger cette application, veuillez respecter les règles suivantes :

### 1. Cohérence des Données via `db.js`
* Ne manipulez jamais directement le `localStorage` dans les fichiers HTML ou dans `main.js` sans passer par les abstractions définies dans [js/db.js](file:///c:/Users/DELL%20Precision%207520/mageOptic&Services/js/db.js).
* Si vous ajoutez une propriété à un schéma de données (ex: ajouter une taille de monture), mettez à jour `DEFAULT_PRODUCTS` et ajustez la logique de migration automatique (`needsMigration` dans `getProducts()`) pour éviter de corrompre les données stockées des utilisateurs existants.

### 2. Initialisation des Éléments Dynamiques
* Les effets 3D de tilt (`initTiltCards`) sont liés aux éléments DOM présents lors du chargement de la page. Si vous injectez dynamiquement des produits en JavaScript (comme dans la boutique), veillez à appeler `initTiltCards()` juste après l'injection pour ré-attacher les écouteurs d'événements.

### 3. Logique du Canvas pour l'Essai Virtuel
* La capture d'image compile plusieurs calques (caméra ou photo de fond + lunettes translatées et pivotées). Lors des calculs de translation et rotation, conservez l'origine au centre du canvas en utilisant `ctx.translate(glassesX, glassesY)` avant de dessiner les lunettes centrées (`-w/2`, `-h/2`).
* Pour la gestion du drag-and-drop, convertissez toujours les coordonnées de la souris en coordonnées de canvas relatives (`getCanvasCoords`) pour conserver un placement parfait quelle que soit la taille d'affichage de l'écran (responsive).

### 4. Respect du Design System
* Ne créez pas de styles CSS ad-hoc. Utilisez toujours les variables CSS enregistrées dans [css/style.css](file:///c:/Users/DELL%20Precision%207520/mageOptic&Services/css/style.css) (ex: `var(--color-muted-gold)`, `var(--border-radius-md)`).
* Conservez la distinction typographique : titres en *Playfair Display* et corps de texte en *Hanken Grotesk*.

### 5. Intégrité des Noms
* Assurez-vous qu'aucun fichier ne soit renommé avec l'ancien nom de marque ("Nage"). La marque officielle de cette plateforme est **Mage Optique & Services**. Si vous créez de nouvelles pages ou intégrez de nouveaux assets, utilisez le script `change_to_mage.js` ou veillez à écrire directement "Mage Optique".
