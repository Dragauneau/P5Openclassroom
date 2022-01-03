fillSection();
async function getArticles() 
{
    // Récupère les articles de l'API
    let articles = await fetch("http://localhost:3000/api/products")
    return await articles.json();
}
async function fillSection() 
{
    let result = await getArticles ()
    .then(function (resultatAPI)
    {
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles)
        {
            // Crée l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            const searchParams = new URLSearchParams();
            searchParams.set("id",resultatAPI[article]._id);
            productLink.href = `product.html?${searchParams}`;
            // Crée l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);
            // Crée l'élément "img"
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            // Insère la source et le texte alternatif de l'img
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;
            // Crée l'élément "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            // Assigne la classe "productName
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;
            // Crée l'élément "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            // Assigne la classe "productName"
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error)
    {
        return error;
    });
}