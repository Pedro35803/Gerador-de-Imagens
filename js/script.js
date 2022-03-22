let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let linkDireto = document.querySelector("#directLink");
let imgHeart = document.querySelector("#heart");
let linkImg = document.querySelector("#linkImg");
let containePai = document.querySelector("#containerPaiImg");
let cont = 0;

// atualizaImagem();

document.querySelector("#buttonImgs").addEventListener("click", () => imgRandom());
document.querySelector("#buttonFavorites").addEventListener("click", () => imgFavorita());

imgHeart.addEventListener("click", () => {
    const lista = [linkImg.style.background, linkDireto.href];
    const indice = favorites.indexOf(lista);

    if (indice == -1) {
        imgHeart.src = "../img/heart_red.svg"
        favorites.push(lista);
    } else {
        imgHeart.src = "../img/heart.svg"
        favorites.splice(indice, 1);
    }
    localStorage.favorites = JSON.stringify(favorites);
});

function imgRandom() {
    let classe = containePai.classList;
    if (classe.contains("fundoRetratoInvertido")) {
        classe.remove("fundoRetratoInvertido");
        classe.add("fundoRetrato");
    }
    atualizaImg();
}

function atualizaImg() {
    let apiKey = "kaokzJCbcYsVY9jm5V2tjN4nJ39YEP4rCmn8uZiWqxQ";
    imgHeart.src = "../img/heart.svg";

    fetch("https://api.unsplash.com/photos/random/?client_id=" + apiKey)
    .then((response) => response.json())
    .then((dados) => {
        let link = "url(" + dados.urls.raw + "&h=450&w=375&fit=crop=faces,center&fit=fill&fill=blur&auto=compress) center no-repeat";
        mostrarImagem(link, dados.links.html);
    })
    .catch((error) => alert("Bateu o limite de imagens por minutos: " + error));
}

function imgFavorita() {
    let classe = containePai.classList;
    
    if (classe.contains("fundoRetrato")) {
        classe.remove("fundoRetrato");
        classe.add("fundoRetratoInvertido");
    }

    if (localStorage > 0) {
        mostrarImagem(favorites[cont][0], favorites[cont][1]);
    } else {
        mostrarImagem("#50858B", "");
        imgHeart.src = "../img/heart.svg";
    }

    cont++;
    if (cont == favorites.length) {
        cont = 0;
    }
}

function mostrarImagem(planoDeFundo, linkUnsplash) {
    linkImg.style.background = planoDeFundo;
    linkDireto.href = linkUnsplash;
}