const href = window.location.href;
const url = new URL(href);
const orderId = url.searchParams.get("order");

// Récupère le numéro de commande
function main(){
    const idNode = document.getElementById("orderId");
    idNode.innerText = orderId;
    localStorage.clear();
}

main();