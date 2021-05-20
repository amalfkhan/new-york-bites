import jwt from "jsonwebtoken";

const tokenValidation = (req, res, next) => {
  const token = req.header("auth-token");
  if(!token) return res.status(401).json({ status: "not logged in" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ status: "invalid token" });
  }
}

export default tokenValidation;