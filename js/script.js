let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let linkDireto = document.querySelector("#directLink");
let imgHeart = document.querySelector("#heart");
let linkImg = document.querySelector("#linkImg");
let containePai = document.querySelector("#containerPaiImg");
let cont = 0;

document.querySelector("#buttonImgs").addEventListener("click", () => imgRandom());
document.querySelector("#buttonFavorites").addEventListener("click", () => imgFavorita());

imgHeart.addEventListener("click", () => {
    let listaLinks = [linkImg.style.background, linkDireto.href];
    const existente = confirmarSeEstaSalvo(listaLinks);

    if (!existente && linkDireto != '') {
        imgHeart.src = "./img/heart_red.svg";
        favorites.push(listaLinks);
    } else {
        imgHeart.src = "./img/heart.svg";
        favorites.pop();
    }

    localStorage.favorites = JSON.stringify(favorites);
});

function imgRandom() {
    let classe = containePai.classList;

    if (classe.contains("portrait-background-inverted")) {
        classe.remove("portrait-background-inverted");
        classe.add("portrait-background");
    }

    // loading();
    atualizaImg();
    // removerLoading();
}

async function atualizaImg() {
    let apiKey = "kaokzJCbcYsVY9jm5V2tjN4nJ39YEP4rCmn8uZiWqxQ"; // temporario
    imgHeart.src = "./img/heart.svg";

    await fetch("https://api.unsplash.com/photos/random/?client_id=" + apiKey)
        .then((response) => response.json())
        .then((dados) => {
            let link = "url(" + dados.urls.raw + "&h=450&w=375&fit=crop=faces,center&fit=fill&fill=blur&auto=compress) center no-repeat";
            mudarBackground(link, dados.links.html);
        })
        .catch(() => alert("Bateu o limite de imagens por minutos: "));
}

function imgFavorita() {
    let classe = containePai.classList;
    
    if (classe.contains("portrait-background")) {
        classe.remove("portrait-background");
        classe.add("portrait-background-inverted");
    }

    if (localStorage.length > 0 && favorites.length > 0) {
        mudarBackground(favorites[cont][0], favorites[cont][1]);
    } else {
        mudarBackground("#50858B", "");
        imgHeart.src = "./img/heart.svg";
    }

    cont++;
    if (cont == favorites.length) {
        cont = 0;
    }
}

function mudarBackground(planoDeFundo, linkUnsplash) {
    linkImg.style.background = planoDeFundo;
    linkDireto.href = linkUnsplash;
}

function confirmarSeEstaSalvo(array) {
    for (let cont = 0; cont < favorites.length; cont++) {
        if (favorites[cont][1] == array[1]) {
            return true;
        }
    }
    return false;
}

function loading() {
    const containerPai = document.querySelector("#linkImg");
    const containerIrmao = document.querySelector("#linkImg .container-portrait");
    containerIrmao.classList.add("disabled");

    const containerLoading = document.createElement("div");
    containerLoading.classList.add("loading");

    containerPai.classList.add("flex", "flex-centralizar");
    containerPai.appendChild(containerLoading);
}

function removerLoading() {
    const containerPai = document.querySelector("#linkImg");
    const containerLoading = document.querySelector(".loading");
    const containerIrmao = document.querySelector("#linkImg .container-portrait");

    containerLoading.remove();
    containerIrmao.classList.remove("disabled");
    containerPai.classList.remove("flex", "flex-centralizar");
}