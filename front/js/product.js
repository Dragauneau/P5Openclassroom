const href = window.location.href;
const url = new URL(href);
const idProduct = url.searchParams.get("id");
console.log(idProduct);
const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

const popupConfirmation =(quantityChoice, article, colorPicked) =>
{
    if(window.confirm(`Votre commande de ${quantityChoice} ${article.name} ${colorPicked} est ajoutée au panier. Pour consulter votre panier, cliquez sur OK`))
    {
        window.location.href ="cart.html";
    }
};

function getArticles() 
{
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {return res.json();})
    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) 
    {
        article = await resultatAPI;
        console.table(article);
        if (article)
        {
            getPost(article);
        }
    })
    .catch (function(error)
    {
        return error;
    });
}
function getPost(article) {
    // Crée l'élément "img"
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    // Insère la source et le texte alternatif de l'img
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modifie le titre "h1"
    let productName = document.getElementById('title');
    productName.innerText = article.name;

    // Modifie le prix
    let productPrice = document.getElementById('price');
    productPrice.innerText = article.price;

    // Modifie la description
    let productDescription = document.getElementById('description');
    productDescription.innerText = article.description;

    // Crée la liste de couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    createaddToCart(article);
}

function createaddToCart(article) 
{
    const addToCart = document.querySelector("#addToCart");
    
    //Ecoute le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    addToCart.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100) {
            //Récupère options de l'article à ajouter au panier
            let product =
            {
                productId: idProduct,
                articleColor: colorPicked.value,
                articleQuantity: Number(quantityPicked.value),
                articleName: article.name,
                articlePrice: article.price,
                articleDescription: article.description,
                imgProduct: article.imageUrl,
                altImgProduct: article.altTxt
            };
            
            //Initialise le localStorage si absent
            if (!localStorage.getItem('cart')) {
                localStorage.setItem('cart', JSON.stringify([]));
            }

            let cart = JSON.parse(localStorage.getItem("product"));

            const productFindInCart = cart.find((el) => el.productId === idProduct && el.articleColor === colorPicked);

            if (productFindInCart) {
                let newQuantity =
                    parseInt(product.articleQuantity) + parseInt(resultFind.articleQuantity);
                resultFind.articleQuantity = newQuantity;
            }
            else {
                cart.push(product);
            }

            cart.push(product);
            popupConfirmation();
        }
    });
}

getArticles();