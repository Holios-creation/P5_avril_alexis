/**
 * Importation de la fonction getCanape pour la connexion à l'API
 */
import {getCanape} from '../js/functions/api.js'

/**
 * Initialisation des variables pour la recherche de l'id produit
 */
var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search);

/**
 * Redirection vers index.html si id produit manquant
 */
if(search_params.has('id')) {
    var id = search_params.get('id');
    displayCanape(id);
} else {
    document.location.href="index.html";
}

/**
 * Fonction de récupération des produits via l'API en fonction de l'Id demandé
 * @param {string} id
 */
async function displayCanape(id){
    const canape = await getCanape(id);
    document
        .getElementById("poductImage")
        .src=canape["imageUrl"];
    document
        .getElementById("poductImage")
        .alt=canape["altTxt"];
    document
        .getElementById("title")
        .textContent=canape["name"];
    document
        .getElementById("price")
        .textContent=canape["price"];
    document
        .getElementById("description")
        .textContent=canape["description"];

    for (var i = 0; i < canape.colors.length; i++) {
        document
            .getElementById("colors")
            .insertAdjacentHTML('beforeend', `<option value="${canape.colors[i]}">${canape.colors[i]}</option>`);
    }
}

/**
 * Fonction de test de la valeur numérique rentrée par l'utilisateur
 * @param {number} value 
 * @returns {boolean}
 */
function testNumber(value) {
    if (/^[0-9]{1,3}$/.test(value) == true) {
        return true;
    } else {
        window.alert("La quantité saisie est invalide ! Elle doit être un nombre entier compris entre 1 et 100.");
        return false;
    }
}

/**
 * Fonction de test de la valeur alphabétique selectionnée par l'utilisateur
 * @param {string} value 
 * @returns {boolean}
 */
function testLetter(value) {
    if (/^[a-zA-Z/\s\-ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ]*$/.test(value) == true) {
        return true;
    } else {
        window.alert("La couleur choisie n'est pas accessible ! Ceci peut être dû à une erreur du service ou à une mauvaise manipulation du site.");
        return false;
    }
}

/**
 * Fonction d'ajout de l'élément au panier
 */
function addToCart() {
    var inputQuantity = document
        .getElementById("quantity")
        .value;
    var inputColor = document
        .getElementById("colors")
        .value;
    //test de la validité des entrées
    if(testNumber(inputQuantity) == true && testLetter(inputColor) == true ) {
        //vérification de la valeur numérique comprise entre 1 et 100
        if(document.getElementById("quantity").value < 101 && document.getElementById("quantity").value > 0 ) {
            var storage = {};
            //vérification de l'éxistance de la variable d'id
            if (localStorage.getItem(id) === null) {
                storage.color = document.getElementById("colors").value;
                storage.quantity = document.getElementById("quantity").value;
                localStorage.setItem(id, JSON.stringify([storage]));
            } else {
            // la variable id existe
                //vérification de la présence en amont de la variable color
                var validation = 0;
                const recupId = localStorage.getItem(id);
                const recupIdParse = JSON.parse(recupId);
                for (var i = 0; i < recupIdParse.length; i++) {
                    if (recupIdParse[i]["color"] == document.getElementById("colors").value) {
                        storage.color = recupIdParse[i]["color"];
                        if ((parseInt(recupIdParse[i]["quantity"]) + parseInt(document.getElementById("quantity").value)) <= 100) {
                            storage.quantity = (parseInt(recupIdParse[i]["quantity"]) + parseInt(document.getElementById("quantity").value)).toString();
                        } else {
                            storage.quantity = parseInt(document.getElementById("quantity").value).toString();
                            window.alert("La quantité ne peut pas dépasser 100 unités d'un même produit par commande. Le nombre de produits actuel est le dernier nombre que vous avez entré. (celui-ci est consultable page 'panier')");
                        }
                        localStorage.removeItem(recupIdParse[i]);
                        var recupChaine = [];
                        for (var k = 0; k < recupIdParse.length; k++) {
                            if (recupIdParse[k]["color"] != document.getElementById("colors").value) {
                                recupChaine.push(recupIdParse[k]);
                            }
                        }
                        for (var t = 0; t < recupIdParse.length; t++) {
                            localStorage.removeItem(recupIdParse[t]);
                        }
                        recupChaine.push(storage);
                        localStorage.setItem(id, JSON.stringify(recupChaine));
                        validation = 1;
                    }
                }
                if (validation == 0) {
                    // variable couleur n'existe pas
                    storage.color = document.getElementById("colors").value;
                    storage.quantity = document.getElementById("quantity").value;
                    var recupChaine = [];
                    for (var k = 0; k < recupIdParse.length; k++) {
                        recupChaine.push(recupIdParse[k]);
                    }
                    for (var t = 0; t < recupIdParse.length; t++) {
                        localStorage.removeItem(recupIdParse[t]);
                    }
                    recupChaine.push(storage);
                    localStorage.setItem(id, JSON.stringify(recupChaine));
                }
            }
            if(document.getElementById("quantity").value > 1){
                window.alert("vous venez d'ajouter " + document.getElementById("quantity").value + " produits à votre panier.");
            } else {
                window.alert("vous venez d'ajouter " + document.getElementById("quantity").value + " produit à votre panier.");
            }
        } else {
            window.alert("La quantité saisie est invalide ! Elle doit être comprise entre 1 et 100.");
        }
    }
}

/**
 * Ajout du déclenchement de la fonction addToCart au clique de l'utilisateur sur le bouton d'ajout au panier
 */
document
    .getElementById("addToCart")
    .addEventListener("click", addToCart);