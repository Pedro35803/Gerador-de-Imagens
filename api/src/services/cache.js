import bcrypt from "bcrypt";

let cache = [];

export const getCache = async ({ token }) => {
  const objCache = cache.find((obj) => obj.token === token);
  const isEmailEqual = await bcrypt.compare(objCache.email, token);
  if (!isEmailEqual) throw { status: 401, message: "Token invalid" };
  return objCache;
};

export const newToken = async ({ email }) => {
  const createDate = new Date().now();
  const token = await bcrypt.hash(email, 10);

  const objCache = { email, createDate, token };
  cache.push(objCache);

  return objCache;
};
