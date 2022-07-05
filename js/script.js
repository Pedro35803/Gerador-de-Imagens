let containePai = document.querySelector("#containerPaiImg");
let linkDireto = document.querySelector("#directLink");
let linkImg = document.querySelector("#linkImg");
let imgHeart = document.querySelector("#heart");

const classeRetratoFavorites = "portrait-background-inverted";
const classeRetratoRandom = "portrait-background";

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
    mudarTipoRetrato(classeRetratoFavorites, classeRetratoRandom);
    atualizaImg();
}

const imgPrev = () => {
    if (containePai.classList.contains(classeRetratoRandom)) {
        contFotos = removeOuResetDoContador(contFotos, listaFotos);
        destinarImprimirFoto(contFotos, listaFotos);
    } else {
        contFav = removeOuResetDoContador(contfav, favorites);
        destinarImprimirFoto(contFav, favorites);
    }
}

const imgNext = () => {
    if (containePai.classList.contains(classeRetratoRandom)) {
        contFotos = addOuResetDoContador(contFotos, listaFotos);
        destinarImprimirFoto(contFotos, listaFotos);
    } else {
        contFav = removeOuResetDoContador(contFav, favorites);
        destinarImprimirFoto(contFav, favorites);
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

const atualizaImg = async () => {
    imgHeart.src = "./img/heart.svg";
    containePai.classList.toggle("loading");

    const dados = await receberImagemDaApi();
    const { link_img, link_html } = dados;

    const configImg = "&h=450&w=375&fit=crop=faces,center&fit=fill&fill=blur&auto=compress";
    const bgLink = "url(" + link_img + configImg + ") center no-repeat";

    mudarBackground(bgLink, link_html);

    listaFotos.push(objetoSalvar(bgLink, link_html));
}

const receberImagemDaApi = async () => {
    const linkApi = "http://localhost:3580";

    return await fetch(linkApi)
        .then((response) => response.json())
        .catch((error) => alert(error));
}

const imgFavorita = () => {
    mudarTipoRetrato(classeRetratoRandom, classeRetratoFavorites);

    if (localStorage.length > 0 && favorites.length > 0) {
        mudarBackground(favorites[contFav].link_img, favorites[contFav].link_html);
        imgHeart.src = "./img/heart_red.svg";
    } else {
        mudarBackground("#50858B", "");
        imgHeart.src = "./img/heart.svg";
    }

    contFav = addOuResetDoContador(contFav, favorites);
}

const addOuResetDoContador = (contador, array) => {
    contador++;

    if (contador == array.length) {
        contador = 0;
    }

    return contador;
}

const removeOuResetDoContador = (contador, array) => {
    contador--;

    if (contador < 0) {
        contador = array.length - 1;
    }

    return contador;
}

const destinarImprimirFoto = (contador, array) => {
    if (array.length > 0 && array.length > contador) {
        const objeto = array[contador];
        mudarBackground(objeto.link_img, objeto.link_html);
    }
}

const mudarTipoRetrato = (classeAtual, classeNova) => {
    let classe = containePai.classList;

    if (classe.contains(classeAtual)) {
        classe.remove(classeAtual);
        classe.add(classeNova);
    }
}

const mudarBackground = (planoDeFundo, linkUnsplash) => {
    linkImg.style.background = planoDeFundo;
    linkDireto.href = linkUnsplash;
}

const objetoSalvar = (link_img, link_html) => {
    return {link_img, link_html}
}