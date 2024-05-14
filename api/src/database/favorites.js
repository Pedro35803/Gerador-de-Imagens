import { connectDB } from "./db.js";

const db = connectDB();

export const create = async ({ email, image, post }) => {
  const data = await db.exec(`
    INSERT INTO Favorites (email, image, post) VALUES (${email}, ${image}, ${post})
  `);

  return data;
};

export const getAllFavorites = async () => {
  const data = await db.exec(`
    SELECT * FROM Favorites
  `);
  return data;
};

export const destroy = async ({ email, image }) => {
  await db.exec(`
    DELETE FROM Favorites WHERE email = ${email} AND image = ${image}
  `);
};
