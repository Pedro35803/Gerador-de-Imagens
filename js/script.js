let containePai = document.querySelector("#containerPaiImg");
let linkDireto = document.querySelector("#directLink");
let linkImg = document.querySelector("#linkImg");
let imgHeart = document.querySelector("#heart");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let listaFotos = [];
let contFotos = 0;
let contFav = 0;

document.querySelector("#buttonFavorites").addEventListener("click", () => imgFavorita());
document.querySelector("#buttonImgs").addEventListener("click", () => imgRandom());

document.querySelector("#imgPrev").addEventListener("click", () => imgPrev());
document.querySelector("#imgNext").addEventListener("click", () => imgNext());

imgHeart.addEventListener("click", () => heartEvent());

const imgRandom = () => {
    let classe = containePai.classList;

    if (classe.contains("portrait-background-inverted")) {
        classe.remove("portrait-background-inverted");
        classe.add("portrait-background");
    }

    atualizaImg();
}

const imgPrev = () => {
    contFotos--;

    if (contFotos < 0) {
        contFotos = listaFotos.length - 1;
    }

    if (listaFotos.length > 0) {
        const fotoAtual = listaFotos[contFotos];
        mudarBackground(fotoAtual.link_img, fotoAtual.link_html);
    }
}

const imgNext = () => {
    contFotos++;

    if (contFotos == listaFotos.length) {
        contFotos = 0;
    }

    if (listaFotos.length > 0 && listaFotos.length > contFotos) {
        const fotoAtual = listaFotos[contFotos];
        mudarBackground(fotoAtual.link_img, fotoAtual.link_html);
    }
}

const heartEvent = () => {
    const objetoLinks = objetoSalvar(linkImg.style.background, linkDireto.href);
    const existente = favorites.some(element => element.link_html == objetoLinks.link_html);

    if (existente && linkDireto != '') {
        imgHeart.src = "./img/heart.svg";
        favorites.pop();
    } else {
        imgHeart.src = "./img/heart_red.svg";
        favorites.push(objetoLinks);
    }

    localStorage.favorites = JSON.stringify(favorites);
}

const atualizaImg = () => {
    let apiKey = "kaokzJCbcYsVY9jm5V2tjN4nJ39YEP4rCmn8uZiWqxQ";
    imgHeart.src = "./img/heart.svg";
    containePai.classList.toggle("loading");

    fetch("https://api.unsplash.com/photos/random/?client_id=" + apiKey)
        .then((response) => response.json())
        .then((dados) => {
            let link = "url(" + dados.urls.raw + "&h=450&w=375&fit=crop=faces,center&fit=fill&fill=blur&auto=compress) center no-repeat";
            mudarBackground(link, dados.links.html);
            listaFotos.push(objetoSalvar(link, dados.links.html));
        })
        .catch(() => alert("Bateu o limite de imagens por hora"));
}

const imgFavorita = () => {
    let classe = containePai.classList;

    if (classe.contains("portrait-background")) {
        classe.remove("portrait-background");
        classe.add("portrait-background-inverted");
    }

    if (localStorage.length > 0 && favorites.length > 0) {
        mudarBackground(favorites[contFav].link_img, favorites[contFav].link_html);
        imgHeart.src = "./img/heart_red.svg";
    } else {
        mudarBackground("#50858B", "");
        imgHeart.src = "./img/heart.svg";
    }

    contFav++;
    if (contFav == favorites.length) {
        contFav = 0;
    }
}

const mudarBackground = (planoDeFundo, linkUnsplash) => {
    linkImg.style.background = planoDeFundo;
    linkDireto.href = linkUnsplash;
}

const objetoSalvar = (link_img, link_html) => {
    return {link_img, link_html}
}