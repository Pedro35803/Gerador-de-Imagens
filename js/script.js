let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let containerImg = document.querySelector("#linkImg");
let linkImg = document.querySelector("#directLink");
let imgHeart = document.querySelector("#heart");

// atualizaImagem();

document.querySelector("#buttonImgs").addEventListener("click", () => atualizaImagem());

imgHeart.addEventListener("click", () => {
    const indice = favorites.indexOf(linkImg.href);
    if (indice == -1) {
        imgHeart.src = "../img/heart_red.svg"
        favorites.push(linkImg.href);
    } else {
        imgHeart.src = "../img/heart.svg"
        favorites.splice(indice, 1);
    }
    localStorage.favorites = JSON.stringify(favorites);
});

function atualizaImagem() {
    let apiKey = "kaokzJCbcYsVY9jm5V2tjN4nJ39YEP4rCmn8uZiWqxQ";
    imgHeart.src = "../img/heart.svg"

    fetch("https://api.unsplash.com/photos/random/?client_id=" + apiKey)
    .then((response) => response.json())
    .then((dados) => {
        containerImg.style.background = "url(" + dados.urls.raw + "&h=450&w=375&fit=crop=faces,center&fit=fill&fill=blur&auto=compress) center no-repeat";
        linkImg.href = dados.links.html;
    })
    .catch((error) => alert("Bateu o limite de imagens por minutos: " + error));
}