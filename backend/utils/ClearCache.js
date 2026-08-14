/**
 * utils/ClearCache.js
 * ────────────────────────────────────────────────────────────────────
 * Utilitaire de calcul du TTL (Time To Live) du cache.
 *
 * Retourne le nombre de secondes jusqu'à minuit.
 * Utilisé pour que le cache expire automatiquement chaque jour
 * → l'utilisateur obtient un nouvel horoscope le lendemain.
 *
 * 📌 Ce fichier est importé par : services/cacheService.js
 * ────────────────────────────────────────────────────────────────────
 */

/**
 * Calcule les secondes restantes jusqu'à minuit (00:00:00 du lendemain).
 *
 * Exemple : appelé à 21h30 → retourne ~9000 secondes (2h30min)
 *
 * @returns {number} Secondes jusqu'à minuit (toujours positif)
 */
export const getTTL = () => {
  const today    = new Date();

  // Crée une date représentant exactement minuit du lendemain
  // Note : passer 0 comme heure/minute/seconde garantit minuit précis
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1, // +1 jour → passe automatiquement au mois suivant si nécessaire
    0, 0, 0              // heure, minute, seconde = 00:00:00
  );

  // Différence en millisecondes → on convertit en secondes (arrondi au-dessus)
  return Math.ceil((tomorrow.getTime() - today.getTime()) / 1000);
};

// ─── Alias pour la rétrocompatibilité ────────────────────────────────
// L'ancien nom "clearCache" est gardé pour ne pas casser d'éventuels imports existants
// 📌 Préférer getTTL dans les nouveaux fichiers
export const clearCache = getTTL;
