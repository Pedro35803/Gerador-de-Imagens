import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const authorization = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) throw { status: 401, message: "Token is required" };

  const listString = bearerToken.split(" ");
  const token = listString[1];

  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) throw { status: 401, message: "Unauthorized access" };

  req.email = decoded;
  next();
};
