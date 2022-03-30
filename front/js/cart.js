
/**
 * Importation de la fonction getCanapes pour la connexion à l'API
 */
import {getCanapes} from '../js/functions/api.js';

/**
 * Attribution du résultat de la recherche de produits à la constante canapes
 */
const canapes = await getCanapes();

/**
 * Fonction permettant l'affichage du prix et du nombre d'articles en fonction des éléments présents dans le panier
 */
async function displayPrice(){
    var nbArticles = 0;
    var prixTotal = 0;
    async function displayPanier(){
        canapes.forEach(product => {
            // vérification de l'existance du produit dans le panier
            if (localStorage.getItem(product["_id"]) !== null) {
                const recupId = localStorage.getItem(product["_id"]);
                const recupIdParse = JSON.parse(recupId);
                for (var i = 0; i < recupIdParse.length; i++) {
                    nbArticles += parseInt(recupIdParse[i]["quantity"]);
                    prixTotal += recupIdParse[i]["quantity"] * product["price"];
                }
            }
        });
    }
    await displayPanier();
    document
        .getElementById("totalQuantity")
        .innerText = nbArticles;
    document
        .getElementById("totalPrice")
        .innerText = prixTotal + '.00';
}

/**
 * Fonction permettant l'affichage des informations des produits du panier dans l'encart prévu à cet effet
 */
async function displayCanapes(){
    var control = 0;
    async function displayPanier(){
        canapes.forEach(product => {
            // vérification de l'existance du produit dans le panier
            if (localStorage.getItem(product["_id"]) !== null) {
                control = 1;
                //produit existe dans le panier
                const recupId = localStorage.getItem(product["_id"]);
                const recupIdParse = JSON.parse(recupId);
                for (var i = 0; i < recupIdParse.length; i++) {
                    // affichage de tous les éléments de l'id
                    document
                        .getElementById("cart__items")
                        .insertAdjacentHTML('beforeend', `<article class="cart__item" id="${product["_id"]}" data-id="${product["_id"]}" data-color="${recupIdParse[i]["color"]}"><div class="cart__item__img"><img src="${product["imageUrl"]}" alt="${product["altTxt"]}"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${product["name"]}</h2><p>${recupIdParse[i]["color"]}</p><p>${product["price"]},00 €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${recupIdParse[i]["quantity"]}"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`);
                }
            }
        });
        if (control == 0) {
            document
                .getElementById("cart__items")
                .insertAdjacentHTML('beforeend', '<article class="cart__item"><div class="cart__item__content"><div class="cart__item__content__description"><h2>Vous n\'avez aucun article pour le moment</h2></div></div></article>');
        }
    }
    await displayPanier();
    await displayPrice();
}

/**
 * Fonction de test de la valeur alphanumérique entrée par l'utilisateur dans le formulaire de contact
 * @param {string} value 
 * @returns {boolean}
 */
function testAdresse(value) {
    if (/^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ]*$/.test(value) == true) {
        return true;
    } else {
        return false;
    }
}

/**
 * Fonction de test de la valeur alphabétique entrée par l'utilisateur dans le formulaire de contact
 * @param {string} value 
 * @returns {boolean}
 */
function testLetter(value) {
    if (/^[a-zA-Z\s\-ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ]*$/.test(value) == true) {
        return true;
    } else {
        return false;
    }
}

/**
 * Fonction de test de la valeur alphanumérique de type mail entrée par l'utilisateur dans le formulaire de contact
 * @param {string} value 
 * @returns {boolean}
 */
function testMail(value) {
    if (/^(([^<()[\]\\.,;:\s@\]+(\.[^<()[\]\\.,;:\s@\]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.test(value) == true) {
        return true;
    } else {
        return false;
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
        return false;
    }
}

/**
 * Fonction d'appel de l'API pour l'ajout du panier à la base de donnée,
 * comportant les informations de contact ainsi que les éléments du panier sous forme d'un Array
 */
async function confirmationCommande() {
    document
        .getElementById("emailErrorMsg")
        .textContent="";
    document
        .getElementById("cityErrorMsg")
        .textContent="";
    document
        .getElementById("addressErrorMsg")
        .textContent="";
    document
        .getElementById("lastNameErrorMsg")
        .textContent="";
    document
        .getElementById("firstNameErrorMsg")
        .textContent="";
    if(testLetter(document.getElementById("firstName").value) == true && document.getElementById("firstName").value != "") {
        if(testLetter(document.getElementById("lastName").value) == true && document.getElementById("lastName").value != "") {
            if(testAdresse(document.getElementById("address").value) == true && document.getElementById("address").value != "") {
                if(testAdresse(document.getElementById("city").value) == true && document.getElementById("city").value != "") {
                    if(testMail(document.getElementById("email").value) == true && document.getElementById("email").value != "") {
                        var contact = {};
                        contact.email = document.getElementById("email").value;
                        contact.city = document.getElementById("city").value;
                        contact.address = document.getElementById("address").value;
                        contact.lastName = document.getElementById("lastName").value;
                        contact.firstName = document.getElementById("firstName").value;
                        const products =  Object.keys(JSON.parse(JSON.stringify(localStorage))).map(function(cle) {
                            return String(cle);
                            // return String(cle + JSON.parse(JSON.stringify(localStorage))[cle]);
                        });
                        const codeCommande = await fetch("http://localhost:3000/api/products/order", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({contact, products})
                        }).then(res => res.json());
                        document.location.href="confirmation.html?orderid=" + codeCommande["orderId"];
                    } else {
                        document
                            .getElementById("emailErrorMsg")
                            .textContent="Le mail que vous avez rentré n'est pas valide ! Veuillez le changer pour continuer.";
                    }
                } else {
                    document
                        .getElementById("cityErrorMsg")
                        .textContent="Le format du nom de ville que vous avez rentré n'est pas valide ! Veuillez le changer pour continuer.";
                }
            } else {
                document
                    .getElementById("addressErrorMsg")
                    .textContent="Le format de l'adresse que vous avez rentré n'est pas valide ! Veuillez le changer pour continuer.";
            }
        } else {
            document
                .getElementById("lastNameErrorMsg")
                .textContent="Le nom que vous avez rentré n'est pas valide ! Veuillez le changer pour continuer.";
        }
    } else {
        document
            .getElementById("firstNameErrorMsg")
            .textContent="Le prénom que vous avez rentré n'est pas valide ! Veuillez le changer pour continuer.";     
    }
}

/**
 * Fonnction permettant la modification en temps réel du nombre de produits présent dans le panier de l'utilisateur,
 * en fonction de l'id du produit et de sa couleur
 */
async function quantityChange() {
    // id
    // this.parentElement.parentElement.parentElement.parentElement.id
    // couleur
    // this.parentElement.parentElement.parentElement.firstChild.querySelector("p").textContent
    // quantity
    // this.value

    if(testNumber(this.value) == true) {
        //vérification de la valeur numérique comprise entre 1 et 100
        if(this.value < 101 && this.value > 0 ) {
            var storage = {};
            //vérification de la présence en amont de la variable color
            const recupId = localStorage.getItem(this.parentElement.parentElement.parentElement.parentElement.id);
            const recupIdParse = JSON.parse(recupId);
            for (var i = 0; i < recupIdParse.length; i++) {
                if (recupIdParse[i]["color"] == this.parentElement.parentElement.parentElement.firstChild.querySelector("p").textContent) {
                    storage.color = recupIdParse[i]["color"];
                    storage.quantity = parseInt(this.value).toString();
                    localStorage.removeItem(recupIdParse[i]);
                    var recupChaine = [];
                    for (var k = 0; k < recupIdParse.length; k++) {
                        if (recupIdParse[k]["color"] != this.parentElement.parentElement.parentElement.firstChild.querySelector("p").textContent) {
                            recupChaine.push(recupIdParse[k]);
                        }
                    }
                    for (var t = 0; t < recupIdParse.length; t++) {
                        localStorage.removeItem(recupIdParse[t]);
                    }
                    recupChaine.push(storage);
                    localStorage.setItem(this.parentElement.parentElement.parentElement.parentElement.id, JSON.stringify(recupChaine));
                }
            }
            await displayPrice();
        } else {
            this.value = '1';
            window.alert("La quantité saisie est invalide ! Elle doit être comprise entre 1 et 100.");
            await displayPrice();
        }
    } else {
        window.alert("La quantité saisie est invalide ! Elle doit être un nombre entier compris entre 1 et 100.");
    }
}

/**
 * Fonnction permettant la suppression d'un produit présent dans le panier de l'utilisateur en fonction de l'id du produit et de sa couleur
 */
async function suppressionProduit() {
    // id
    // this.parentElement.parentElement.parentElement.parentElement.id
    // couleur
    // this.parentElement.parentElement.parentElement.firstChild.querySelector("p").textContent
    // quantity
    // this.value

    var storage = {};
    var recupChaine = [];
    const couleur = this.parentElement.parentElement.parentElement.firstChild.querySelector("p").textContent;
    const recupId = localStorage.getItem(this.parentElement.parentElement.parentElement.parentElement.id);
    const recupIdParse = JSON.parse(recupId);
    async function supprProduit(couleur) {
        for (var i = 0; i < recupIdParse.length; i++) {
            if (recupIdParse[i]["color"] != couleur) {
                storage.color = recupIdParse[i]["color"];
                storage.quantity = recupIdParse[i]["quantity"];
                recupChaine.push(storage);
                storage = {};
            }
            localStorage.removeItem(recupIdParse[i]);
            console.log(recupIdParse);
        }
    }
    await supprProduit(couleur);
    const verifId = localStorage.getItem(this.parentElement.parentElement.parentElement.parentElement.id);
    if (verifId == "[{}]" || verifId == "[]") {
        localStorage.removeItem(this.parentElement.parentElement.parentElement.parentElement.id);
    } else {
        localStorage.setItem(this.parentElement.parentElement.parentElement.parentElement.id, JSON.stringify(recupChaine));
    }
    this.parentElement.parentElement.parentElement.parentElement.remove();
    await displayPrice();
}

/**
 * Appel de la fonction d'affichage des produits du panier
 */
displayCanapes();

/**
 * Attribution de la possibilité de modification du nombre de produit à chaque input de nombre de produit
 */
const collection = document.getElementsByClassName('itemQuantity');
for (let i = 0; i < collection.length; i++) {
    collection[i].addEventListener("input", quantityChange);
}

/**
 * Ajout du déclenchement de la fonction confirmationCommande au clique de l'utilisateur sur le bouton de confirmation
 */
document
    .getElementById("order")
    .addEventListener("click", confirmationCommande);

/**
 * Attribution de la possibilité de supprimée un produit à chaque bouton associé à ce même produit
 */
const suppression = document.getElementsByClassName("deleteItem");
for (let i = 0; i < suppression.length; i++) {
    suppression[i].addEventListener("click", suppressionProduit);
}