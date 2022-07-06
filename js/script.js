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

let objetoFoto = {
    link_img: "", 
    link_html: "",
    favorites: false
};

document.querySelector("#buttonFavorites").addEventListener("click", () => imgFavorita());
document.querySelector("#buttonImgs").addEventListener("click", () => imgRandom());

document.querySelector("#imgPrev").addEventListener("click", () => imgPrev());
document.querySelector("#imgNext").addEventListener("click", () => imgNext());

imgHeart.addEventListener("click", () => heartEvent());

const imgRandom = () => {
    mudarTipoRetrato(classeRetratoFavorites, classeRetratoRandom);
    atualizaImg();
}

const atualizaImg = async () => {
    containePai.classList.toggle("loading");
    heartUnchecked();

    const dados = await receberImagemDaApi();
    const { link_img, link_html } = dados;

    const configImg = "&h=450&w=375&fit=crop=faces,center&fit=fill&fill=blur&auto=compress";
    const bgLink = "url(" + link_img + configImg + ") center no-repeat";

    mudarBackground(bgLink, link_html);

    objetoFoto = objetoSalvar(bgLink, link_html, false);
    listaFotos.push(objetoFoto);
}

const imgPrev = () => {
    if (containePai.classList.contains(classeRetratoRandom)) {
        contFotos = removeOuResetDoContador(contFotos, listaFotos);
        destinarImprimirFoto(contFotos, listaFotos);
        // mudarSvgDependendoDaFoto(contFotos, listaFotos);
    } else {
        contFav = removeOuResetDoContador(contFav, favorites);
        destinarImprimirFoto(contFav, favorites);
    }
}

const imgNext = () => {
    if (containePai.classList.contains(classeRetratoRandom)) {
        contFotos = addOuResetDoContador(contFotos, listaFotos);
        destinarImprimirFoto(contFotos, listaFotos);
        // mudarSvgDependendoDaFoto(contFotos, listaFotos);
    } else {
        contFav = addOuResetDoContador(contFav, favorites);
        destinarImprimirFoto(contFav, favorites);
    }
}

const heartEvent = () => {
    if (!objetoFoto.favorites && objetoFoto.link_html != "") {
        objetoFoto.favorites = true;
        favorites.push(objetoFoto);
        heartChecked();
    } else {
        favorites.pop();
        heartUnchecked();
        objetoFoto.favorites = false;
    }

    localStorage.favorites = JSON.stringify(favorites);
}

const receberImagemDaApi = async () => {
    const linkApi = "https://buscador-de-imagem.herokuapp.com/";

    return await fetch(linkApi)
        .then((response) => response.json())
        .catch((error) => alert(error));
}

const imgFavorita = () => {
    mudarTipoRetrato(classeRetratoRandom, classeRetratoFavorites);

    if (localStorage.length > 0 && favorites.length > 0) {
        mudarBackground(favorites[contFav].link_img, favorites[contFav].link_html);
        heartChecked();
    } else {
        mudarBackground("#50858B", "");
        heartUnchecked();
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

// const mudarSvgDependendoDaFoto = (contador, array) => {

// }

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

const heartUnchecked = () => {
    imgHeart.src = "./img/heart.svg";
}

const heartChecked = () => {
    imgHeart.src = "./img/heart_red.svg";
}

const objetoSalvar = (link_img, link_html, favorites) => {
    return {link_img, link_html, favorites}
}