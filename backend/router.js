const express = require("express");
const routers = express.Router();
const axios = require('axios');

routers.get("/", async (req, res) => {
    const chaveAPI = process.env.API_KEY;

    const { data } = await axios("https://api.unsplash.com/photos/random/?client_id=" + chaveAPI);

    const link_img = data.urls.raw;
    const link_html = data.links.html;

    const resposta = {link_img, link_html};

    return res.json(resposta);
})

module.exports = routers;