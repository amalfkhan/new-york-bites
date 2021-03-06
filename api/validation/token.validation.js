// check that a token is a valid jwt token
import jwt from "jsonwebtoken";

const tokenValidation = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "not logged in" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(500).json({ error: "invalid token" });
  }
};

export default tokenValidation;
