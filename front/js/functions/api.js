/**
 * Définition de la constante de chemin par défaut pour l'appel de l'API
 */
const baseUrl = "http://localhost:3000/api/products"

/**
 * Fonction d'export des informations relative à l'ensemble des canapes présent dans l'API
 * @returns {array}
 */
export async function getCanapes(){
    const canapes = await fetch(baseUrl)
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    }).catch(function(err) {
         console.log("erreur fetch");
    })
    return canapes
}

/**
 * Fonction d'export des informations relative à l'un des canapes présent dans l'API en fonction de son id
 * @param {string} id 
 * @returns {array}
 */
export async function getCanape(id){
    const canape = await fetch(baseUrl + "/" + id)
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    }).catch(function(err) {
         console.log("erreur fetch");
    })
    return canape
}