**DOC durant la realisation du projet horoscope**

**Lors de  l'installation react**

Use rolldown-vite (Experimental)? 
○ Yes
● No

fait référence à une nouvelle fonctionnalité expérimentale de Vite appelée “Rolldown”.
🧩 Explication simple :

Vite utilise en interne un outil qui s’appelle Rollup pour “compiler” ton code (c’est-à-dire le transformer en fichiers optimisés que le navigateur comprend).

👉 Rolldown est une nouvelle version plus rapide, écrite en Rust, que l’équipe de Vite est en train de tester.
C’est ce que signifie le mot “Experimental” — ce n’est pas encore totalement stable.

💡 Donc concrètement :

Si tu choisis “Yes” → tu testes la version expérimentale (plus rapide, mais parfois instable ou incompatible avec certains plugins).

Si tu choisis “No” → tu restes sur la version classique, plus sûre et stable (celle utilisée par tout le monde aujourd’hui).


**Installation tailwindcss**

Commande a executer pour utiliser tailwind : 

-'npm install -D tailwindcss postcss autoprefixer'
- npx tailwindcss init -p

explication : 

npm install : installe des paquets (librairies) dans ton projet depuis le registre npm.
-D ou --save-dev : → ça veut dire “devDependencies” (dépendances de développement).
Ces librairies ne sont nécessaires que pendant le développement, pas à l’exécution (production).
Exemple : Tailwind ne s’exécute pas dans ton navigateur, il génère du CSS avant que le site tourne.

Les paquets installés :

1. tailwindcss

C’est le framework CSS utilitaire lui-même.
C’est lui qui contient toutes les classes (bg-blue-500, text-white, etc.).

➡️ Son rôle : générer le fichier CSS final à partir des classes que tu utilises dans ton projet.

2. postcss

C’est un outil qui transforme le CSS automatiquement à la compilation.

➡️ Son rôle ici :
Quand Tailwind génère le CSS, il passe par PostCSS pour appliquer des transformations (comme enlever le code inutile, minifier, etc.).

Pense à PostCSS comme un traducteur intelligent entre le code Tailwind et le CSS final utilisé par ton navigateur.

3. autoprefixer

C’est un plugin PostCSS.

➡️ Son rôle :
Ajouter automatiquement les préfixes CSS nécessaires pour que ton site fonctionne sur tous les navigateurs (ex: -webkit-, -moz-).

Exemple :
Tu écris :

display: flex;


Mais pour certains vieux navigateurs, il faut :

display: -webkit-flex;
display: flex;

👉 autoprefixer fait ça automatiquement pour toi.

🧠 En résumé de cette commande :

Cette commande installe tout ce qu’il faut pour que Tailwind puisse fonctionner dans ton projet et générer du CSS compatible avec tous les navigateurs.

Explication : npx tailwindcss init -p

🧩 Décomposons-la :

npx
C’est un outil inclus avec npm (depuis npm 5.2+).
Il permet d’exécuter un paquet sans l’installer globalement.
Ici, on exécute directement tailwindcss pour initialiser le projet.

tailwindcss init
→ Demande à Tailwind de créer un fichier de configuration (tailwind.config.cjs ou .js).

Ce fichier te permet de :

Modifier les couleurs par défaut

Ajouter tes propres tailles (fontSize, spacing, etc.)

Gérer les plugins

Et surtout : définir quels fichiers React contiennent des classes Tailwind

-p
→ Option qui veut dire “PostCSS”.

En gros, -p demande à Tailwind de créer aussi un fichier postcss.config.cjs en même temps, pour que tout soit prêt d’un coup.

Donc cette commande crée 2 fichiers à la racine du projet :

1️⃣ tailwind.config.cjs — configuration principale de Tailwind
2️⃣ postcss.config.cjs — configuration pour PostCSS (pour utiliser Tailwind + autoprefixer)


**Probleme Version Tailwind**

Le v4 mbola tsy stable dia nampiasa v3
ilay v3.. no mety ampiasana ilay npx.


**Il existe deux type d'export en react default et nomme**

**Inona no atao hoe overlay**
Un overlay est simplement une couche semi-transparente placée au-dessus d’un fond


**Class Tailwind**

Mobile <768 px>
desktop ≥ 768px)
Horizontale ---- verticale |

** Misy anle propriete role sy aria label ireny atao anaty balise mba ahafahan ny lecteur d'ecran manonona ilay izy **


**Cours CSS et bootstrap**

Min-heigh na min-width : hoe farafakeliny fa afaka mihitatra ilay izy raha be contenu ao anatiny 

element::before = pseudo element 

Explication : Crée un élément invisible AVANT le contenu de l'element
C'est comme ajouter une <div> automatiquement sans toucher au HTML.
Le content: "" est obligatoire pour que le pseudo-élément existe !

Inset 0 = C'est un raccourci moderne pour :
top: 0;
right: 0;
bottom: 0;
left: 0;

Difference entre margin et transform = margin manisaka ny element voisin miaraka amin'ilay ahisaka ,
ny transform indray tsy manisaka ny element manondidina 

ilay deux points :: dian antsoina hoe pseudo element amin css 
Nyasany mametraka element avant na apres anle contenu anle element cible

ny col an bootsrap dia tsy mandaitra raha tsy anaty row satria izy miandry an'iny

**Important amin'ny bootstrap**

Mobil first  Principe =  tu construis d’abord ton design pour les petits écrans (smartphones), puis tu ajoutes des règles pour les écrans plus grands.

Avantages :

Les mobiles chargent moins de styles complexes.

Le layout s’adapte naturellement aux écrans larges avec des classes de breakpoint.

Comment Bootstrap sait quoi appliquer

Bootstrap fonctionne avec un système de classes responsives basées sur des breakpoints :

flex-column → s’applique par défaut à tous les écrans.

flex-md-row → s’applique uniquement quand l’écran fait ≥768px (md = medium).

justify-content-center	Centre les enfants horizontalement dans le conteneur principal
align-items-center	Centre les enfants verticalement dans le conteneur principal

**Type writter effect**

io no anaran ilay texte mipoitra tsikelikely ireny amin'ny web. 

**async**

Milaza fa anao operation asynchrone ny fonction anakiray

**terminologie**
Fallback = terme ampiasaina rehefa ohatra ka echouer ilay plan voalohany dia ilay fahroa no miasa

**CORS**

Securite navigateur.
CORS est une sécurité navigateur : impossible d’appeler certaines APIs directement depuis le front si elles n’autorisent pas ton origine.
503 Service Unavailable
L’erreur 503 indique que l’API n’est pas disponible ou qu’elle limite les connexions.
Même sans CORS, tu aurais ce problème si l’API est surchargée ou down.

CORS (Cross-Origin Resource Sharing)
Ton front (Vite / localhost:5173) essaie de faire un POST direct vers l’API Aztro.
Le navigateur bloque la requête car l’API ne renvoie pas l’en-tête Access-Control-Allow-Origin.
Résultat : tu obtiens l’erreur :

A retenir : ila navigateur no mi block anle requete satria tsy mi permettre anzay ilay api donc solution mampiasa serveur proxy
creer amin'ny express ohatra.

**Terme parser**

Parser signifie "analyser" ou "interpréter". En programmation, c'est le processus qui transforme des données d'un format à un autre pour les rendre compréhensibles.


**Try catchet await async**

Zavatra tsara atao ao ansatiana dia rehefa mahita fonction misy async eo alohany dia mi retourne promesse foana izy zay
meme na mi retourne chaine tsotra ary anaty fonction async dia promesse foana no averiny. Indro ny exemple : 

async function getData() {
  return "Hello";
}

ity no averiny Promise.resolve("Hello");
izany hoe raha tsisy await izany rehefa  miantso anle fonction  getData() dia mahazo pending<>

Ny "try catch" indray dia ampiasaina hi proteger-na async sy await mpa tsy ampisy erreur amin'ilay code 
Quand une fonction contient un await, il faut toujours la protéger avec try / catch, sinon une erreur peut casser ton code.

Ny probleme mety hisy rehefa tsisy try catchny fonction mampiasa async await : 

Fantatra fa isika miandry promesse rehefa manao await . Ohatra : const response = await axios.get("https://api.example.com/user");

Cette ligne veut dire :

“Attends que la requête HTTP soit terminée avant de continuer.”

Mais ⚠️ problème : et si le serveur ne répond pas ?
ou si l’URL est fausse ?
ou s’il y a une coupure Internet ?
ou une erreur 500 du serveur ?

👉 Dans ce cas, axios rejette la promesse → c’est ce qu’on appelle une erreur (Promise rejected).

Que se passe-t-il si tu n’as PAS de try / catch ?

async function getUser() {
  const response = await axios.get("https://api.exemple.com/utilisateur");
  console.log(response.data);
}

Si le serveur renvoie une erreur (par exemple 404 ou 500),
alors axios.get(...) va lancer une exception.

Et comme tu n’as pas de try / catch, cette erreur :

remonte jusqu’à la console,

interrompt la fonction,

et peut même planter ton application React (par exemple ton composant se bloque ou n’affiche plus rien).

En gros :

Le code “casse” = ton programme s’arrête à cause d’une erreur non gérée.

Ny tena ampiasana throw dia i relancer-na erreur. genre B vers A ohatra , avy ao amin'B izany izy no mandefa an'ilay erreur makany @ A (Tu relances l’erreur vers l’appelant.)

**stdTTL**

stdTTL  = "standard Time To Live" = durée de vie par défaut des données, en secondes.

Le cache peut-il avoir une durée différente pour chaque donnée ?

Oui, tu peux surcharger la TTL par entrée, mais si tu ne le fais pas, chaque donnée utilise la TTL standard (stdTTL).

**Context**

ca serta quoi ? 
Le Context sert à partager des données entre plusieurs composants sans avoir à passer des props partout.

Exemple simple :
Tu as un composant A → qui contient B → qui contient C.
Tu veux envoyer une info de A jusqu’à C. Normalement tu dois passer :

<A info> → <B info> → <C info>

Provider = distributeur de données globales , il sert a ca 
Il prend une prop qui s’appelle value = c’est ce qu’il partage