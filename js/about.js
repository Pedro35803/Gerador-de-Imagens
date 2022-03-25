fetch("http://localhost:3000/")
    .then((response) => response.json())
    .then((dados) => {
        let link = "url(" + dados[0].img + ")";
        conteudoContainerMembro(link, dados[0].name, dados[0].description);
    })
    .catch(() => alert("Ligue o Node.Js para poder ver quem criou a pagina"));

function conteudoContainerMembro(linkImg, textH2, textP) {
    let article = document.querySelector("#about-member");
    let figure = document.querySelector("#sobre-img");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    figure.style.background = linkImg;
    h2.textContent = textH2;
    p.textContent = textP;

    article.appendChild(h2);
    article.appendChild(p);
}