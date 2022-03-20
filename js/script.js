document.querySelector("#buttonImgs").addEventListener("click", () => {
    let apiKey = "kaokzJCbcYsVY9jm5V2tjN4nJ39YEP4rCmn8uZiWqxQ";
    
    fetch("https://api.unsplash.com/photos/random/?client_id=" + apiKey)
        .then((response) => response.json())
        .then((dados) => {
            let img = document.querySelector("#imagemGerada");
            img.src = dados.urls.raw+"&h=500&w=750&fit=fill&fill=blur";
            // console.log(dados)
        })
        .catch((error) => alert("Erro ao requisitar a imagem" + error));
});