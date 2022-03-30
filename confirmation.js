/**
 * Initialisation des variables pour la recherche de l'id produit
 */
var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search);

/**
 * Redirection vers index.html si orderid produit manquant
 */
if(search_params.has('orderid')) {
    var orderid = search_params.get('orderid');
} else {
    document.location.href="index.html";
}

/**
 * Affichage de l'orderId dans l'espace prévu à cet effet lorsque la commande est validée
 */
document
    .getElementById("orderId")
    .textContent = orderid;