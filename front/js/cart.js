//Initialise le localStorage
let localStorageCart = JSON.parse(localStorage.getItem("cart"));
const positionEmptyCart = document.querySelector("#cart__items");

async function getArticles() 
{
    // Récupère les articles de l'API
    let articles = await fetch("http://localhost:3000/api/products")
    return await articles.json();
}
// Récupération du panier
async function getCart(){
    // Si le panier est vide
    if (localStorageCart === null || localStorageCart.length === 0) 
    {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else 
    {   
        let result = getArticles()
        .then(function (resultatAPI)
        {
            const products = resultatAPI;
            console.log(products);
            // Si le panier n'est pas vide
            for (let product in localStorageCart)
            {
                // Insert l'élément "article"
                console.log(product);
                let idProduct =localStorageCart[product].productId;
                console.log(idProduct);
                let price = products[idProduct.price];
                console.log(price)
                let productArticle = document.createElement("article");
                document.querySelector("#cart__items").appendChild(productArticle);
                productArticle.className = "cart__item";
                productArticle.setAttribute('data-id', localStorageCart[product].productId);
                // Insert l'élément "div"
                let productDivImg = document.createElement("div");
                productArticle.appendChild(productDivImg);
                productDivImg.className = "cart__item__img";
                // Insert l'image
                let productImg = document.createElement("img");
                productDivImg.appendChild(productImg);
                productImg.src = localStorageCart[product].imgProduct;
                productImg.alt = localStorageCart[product].altImgProduct;
                // Insert l'élément "div"
                let productItemContent = document.createElement("div");
                productArticle.appendChild(productItemContent);
                productItemContent.className = "cart__item__content";
                // Insert l'élément "div"
                let productItemContentTitlePrice = document.createElement("div");
                productItemContent.appendChild(productItemContentTitlePrice);
                productItemContentTitlePrice.className = "cart__item__content__titlePrice"
                // Insert le titre h3
                let productTitle = document.createElement("h2");
                productItemContentTitlePrice.appendChild(productTitle);
                productTitle.innerHTML = localStorageCart[product].articleName;
                // Insert la couleur
                let productColor = document.createElement("p");
                productTitle.appendChild(productColor);
                productColor.innerHTML = localStorageCart[product].articleColor;
                productColor.style.fontSize = "20px";
                // va chercher le prix dans l'api et insert le prix
                let productPrice = document.createElement("p");
                productItemContentTitlePrice.appendChild(productPrice);
                productPrice.innerHTML = " €";
                // Insert l'élément "div"
                let productItemContentSettings = document.createElement("div");
                productItemContent.appendChild(productItemContentSettings);
                productItemContentSettings.className = "cart__item__content__settings";
                // Insert l'élément "div"
                let productItemContentSettingsQuantity = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
                // Insert le "Qté : "
                let productQte = document.createElement("p");
                productItemContentSettingsQuantity.appendChild(productQte);
                productQte.innerHTML = "Qté : ";
                // Insert la quantité
                let productQuantity = document.createElement("input");
                productItemContentSettingsQuantity.appendChild(productQuantity);
                productQuantity.value = localStorageCart[product].articleQuantity;
                productQuantity.className = "itemQuantity";
                productQuantity.setAttribute("type", "number");
                productQuantity.setAttribute("min", "1");
                productQuantity.setAttribute("max", "100");
                productQuantity.setAttribute("name", "itemQuantity");
                // Insert l'élément "div"
                let productItemContentSettingsDelete = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsDelete);
                productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
                // Insert le "p" supprimer
                let productDelete = document.createElement("p");
                productItemContentSettingsDelete.appendChild(productDelete);
                productDelete.className = "deleteItem";
                productDelete.innerHTML = "Supprimer";
            }
        })
    }
}

getCart();

function getTotal(){
    // Récupère le total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;
    for (var i = 0; i < myLength; ++i) 
    {
        totalQtt += elemsQtt[i].valueAsNumber;
    }
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    // Récupère le prix total
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) 
    {
        totalPrice += (elemsQtt[i].valueAsNumber * localStorageCart[i].articlePrice);
    }
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotal();

// Pour modifier une quantité de produit
function createChangeListeners(){
    let qttModif = document.querySelectorAll(".itemQuantity");
    for (let k = 0; k < qttModif.length; k++)
    {
        qttModif[k].addEventListener("change" , (event) => 
        {
            event.preventDefault();
            //Sélectionne l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = localStorageCart[k].articleQuantity;
            let qttModifValue = qttModif[k].valueAsNumber;
            const resultFind = localStorageCart.find((el) => el.qttModifValue !== quantityModif);
            resultFind.articleQuantity = qttModifValue;
            localStorageCart[k].articleQuantity = resultFind.articleQuantity;
            localStorage.setItem("cart", JSON.stringify(localStorageCart));
            // refresh
            location.reload();
        })
    }
}
createChangeListeners();

// Pour supprimer un produit
function createClickListeners(){
    let btn_delete = document.querySelectorAll(".deleteItem");
    for (let j = 0; j < btn_delete.length; j++)
    {
        btn_delete[j].addEventListener("click" , (event) => 
        {
            event.preventDefault();
            //Sélectionne l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = localStorageCart[j].productId;
            let colorDelete = localStorageCart[j].articleColor;
            localStorageCart = localStorageCart.filter( el => el.productId !== idDelete || el.articleColor !== colorDelete );
            localStorage.setItem("cart", JSON.stringify(localStorageCart));
            //Alerte produit supprimé puis refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
createClickListeners();

//Formulaire regex
function createForm(){
    //Ajout des Regex
    let form = document.querySelector(".cart__order__form");
    //Crée les expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    //Vérifie modification du prénom
    form.firstName.addEventListener('change', function() 
    {
        validFirstName(this);
    });

    // Vérifie la modification du prénom
    form.lastName.addEventListener('change', function() 
    {
        validLastName(this);
    });
    // Vérifie la modification du prénom
    form.address.addEventListener('change', function() 
    {
        validAddress(this);
    });
    // Vérifie la modification du prénom
    form.city.addEventListener('change', function() 
    {
        validCity(this);
    });
    // Vérifie la modification du prénom
    form.email.addEventListener('change', function() 
    {
        validEmail(this);
    });
    //Validation du prénom
    const validFirstName = function(inputFirstName) 
    {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        if (charRegExp.test(inputFirstName.value)) 
        {
            firstNameErrorMsg.innerHTML = '';
        } 
        else 
        {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    //Validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
createForm();

// Création de la validation de commande
function createOrderFormSubmitListener(){
    const orderForm = document.querySelector('.cart__order__form');
    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let inputName = document.getElementById('firstName');
            let inputLastName = document.getElementById('lastName');
            let inputAdress = document.getElementById('address');
            let inputCity = document.getElementById('city');
            let inputMail = document.getElementById('email');
            let idProducts = [];
        if (inputName.value !== null && inputName.value !== '' && inputLastName.value !== null && inputLastName.value !== '' && inputAdress.value !== null && inputAdress.value !== '' && inputCity.value !== null && inputCity.value !== '' && inputMail.value !== null && inputMail.value !== '') {
            for (let i = 0; i<localStorageCart.length;i++) {
                idProducts.push(localStorageCart[i].productId);
            }
            const order = {
                contact : {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: idProducts,
            } 
            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            };
            fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                localStorage.clear();
                const searchParams = new URLSearchParams();
                searchParams.set("order",data.orderId);
                document.location.href = `confirmation.html?${searchParams}`;
            })
            .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
            });
    }})
}

createOrderFormSubmitListener();
