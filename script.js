/**
 * Importation de la fonction getCanapes pour la connexion à l'API
 */
import {getCanapes} from '../js/functions/api.js'

/**
 * Fonction de récupération des produits via l'API
 */
async function displayCanapes(){
    const canapes = await getCanapes();
    canapes.forEach(product => {
        document
            .getElementById("items")
            .insertAdjacentHTML('beforeend', `<a href="./product.html?id=${product["_id"]}"><article><img src="${product["imageUrl"]}" alt="${product["altTxt"]}, ${product["name"]}"><h3 class="productName">${product["name"]}</h3><p class="productDescription">${product["description"]}</p></article></a>`);
    });
}

/**
 * Appel de la fonction d'affichage des produits
 */
displayCanapes()