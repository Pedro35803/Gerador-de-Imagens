fetch("http://localhost:3000/")
    .then((response) => response.json())
    .then((dados) => {
        let link = "url(" + dados[0].img + ")";
        conteudoContainerMembro(link, dados[0].name, dados[0].description);
    })
    .catch(() => alert("Ligue o Node.Js para poder ver quem criou a pagina"));