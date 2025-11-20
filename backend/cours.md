npm -y = initialiser un projet node js


MIDDLEWARE - Qu'est-ce que c'est ?

Un middleware est une fonction qui s'exécute entre la réception de la requête et l'envoi de la réponse. C'est comme un filtre ou un poste de contrôle.

Analogie : Restaurant

Client → Accueil (middleware) → Cuisine (route) → Serveur → Client

app.use() - À quoi ça sert ? = app.use() est la méthode pour enregistrer un middleware dans Express.
Middleware global (s'execute sur toutes les routes) :



Comment app.use() enregistre les middlewares
Systeme de pile middlware  
Quand vous utilisez app.use(), Express ajoute le middleware dans une pile d'exécution. Cette pile est parcourue dans l'ordre pour chaque requête.

L'ordre des middlware est tres important.

const response = await axios.get("https://api.api-ninjas.com/v1/horoscope", {
      params: { zodiac:sign },
      headers: { "X-Api-Key": "UTCPG3xm+CK6aKu6kvmOcA==u3xLViVTXvvicVI3" },
    });

Config Object no anaran'ilay 2 eme paametre get io. Fasiana parametre supplementaire.


**Best practice pour consomation API horoscop**

Mampiasa an ity : Redis / in-memory (mba ho performant ilay site , tsy hiena @ tsisy dikany ny quota)

-Performance : tu peux cacher (Redis / in-memory) la traduction pour éviter de ré-appeler l’API pour chaque visiteur. 
Zuplo
Ilay Redis sy in-memory systeme roa samihafa.

POurquoi utilise cela ? 

🌟 Le problème sans cache

Imagine ton utilisateur clique sur Taureau → ton backend appelle :

API Ninjas (pour récupérer l’horoscope)

API DeepL / Google (pour traduire en français)

S’il clique encore Taureau 10 secondes plus tard → ton backend va re-faire les mêmes appels.

⚠️ C’est mauvais parce que :

ça consomme ton quota d’API,

ça coûte du temps (lent),

ça coûte de l’argent (si API payante),

ça surcharge inutilement ton backend.

🌟 Le cache : c’est juste "stocker la réponse" pour un moment

👉 Le cache, c’est un petit stockage temporaire dans lequel on garde le résultat déjà traduit, pendant un certain temps (ex : 1 heure).

Ainsi :

🟢 Premier appel

Tu demandes l’horoscope du Taureau

Le backend appelle Ninja → DeepL

Le backend sauvegarde le résultat dans son cache

Le backend te renvoie l’horoscope

🟢 Deuxième appel (dans l'heure)

Tu redemandes Taureau

Le backend regarde dans le cache

Il voit : “j’ai déjà la réponse !”
👉 Donc il répond instantanément, sans appeler Ninja / DeepL

C’est exactement comme quand tu cherches un cahier chez toi :

1ère fois → tu dois fouiller

2ème fois → tu sais déjà où il est

🌟 Redis ou In-memory… c’est juste "où" tu stockes
In-memory cache

Stocké dans la mémoire du serveur Node.js

Simple (par ex : node-cache)

Parfait pour les petits projets

Mais si ton serveur redémarre = le cache disparaît

Redis (cache externe)

Service spécialisé pour garder des données très rapidement

Plus professionnel

Le cache ne disparaît pas même si ton Node.js redémarre

Utilisé dans les vrais projets (Laravel, Symfony, Node, Next…)

Pour un débutant → in-memory est largement suffisant.
Pour un projet pro → Redis est idéal.

**PS ngoda be mikasika consommation API**

cote server-proxy foana tsara no manao appel ana api avec cle fa tsy exposer-na any @ front-end


**TTL**
TTL = Time To Live = combien de temps une donnée reste dans le cache avant d’être supprimée automatiquement.
