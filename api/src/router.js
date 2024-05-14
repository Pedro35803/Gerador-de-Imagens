import express from "express";
import axios from "axios";

import { authorization } from "./middleware/isAuttenticate.js";
import { sendEmail } from "./services/email.js";
import { newToken } from "./services/cache.js";
import * as favorites from "./database/favorites.js";

export const routers = express.Router();
const { API_KEY, JWT_SECRET } = process.env;

routers.get("/api", async (req, res) => {
  const { data } = await axios(
    "https://api.unsplash.com/photos/random/?client_id=" + API_KEY
  );

  const link_img = data.urls.raw;
  const link_html = data.links.html;

  const resposta = { link_img, link_html };

  return res.json(resposta);
});

routers.post("/send-email", async (req, res) => {
  const { email, url_page } = req.body;
  const { token } = await newToken({ email });
  await sendEmail({ email, link: `${url_page}/login?token=${token}` });
  res.status(200).json({ email, token });
});

routers.get("/login", async (req, res) => {
  const { key } = req.query;
  const objCache = await getCache({ token: key });
  const token = jwt.sign(objCache.email, JWT_SECRET, { algorithm: "HS256" });
  res.status(201).json({ token, email: objCache.email });
});

routers
  .route("/favorites")
  .post(authorization, async (req, res) => {
    const { image, email } = req.body;
    const data = await favorites.create({ email, image });
    res.status(201).json(data);
  })
  .get(authorization, async (req, res) => {
    const email = req.email;
    const data = await favorites.getAllFavorites({ email });
    res.json(data);
  })
  .delete(authorization, async (req, res) => {
    const { image, email } = req.body;
    await favorites.destroy({ email, image });
    res.status(204).send("");
  });
