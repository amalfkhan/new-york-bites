import jwt from "jsonwebtoken";

const createToken = (id, maxAge) => {
  const token = jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
  return token;
}

export default createToken;