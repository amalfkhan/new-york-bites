import { registerValidation, loginValidation } from "../validation/user.validation.js"
import UsersDAO from "../../dao/usersDAO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class UsersController {
  static async apiRegisterUser(req, res, next) {
    const validation = registerValidation(req.body);
    if(validation.error) { 
      return res.status(400).json({ error: validation.error.details[0].message }); 
    } 

    //check if user already exists
    try {
      const emailExists = await UsersDAO.getUserByEmail(req.body.email);
      if(emailExists) return res.status(400).json({ status: "email already associated with an accout" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    //hash password
    try {
      const salt = await bcrypt.genSalt(10);
      var hashedPassword = await bcrypt.hash(req.body.password, salt);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    //add user to database
    try {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }
      const registerResponse = await UsersDAO.registerUser(newUser);
      res.json({
         _id: registerResponse.ops[0]._id,
         username: registerResponse.ops[0].username,
         email: registerResponse.ops[0].email,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiLoginUser(req, res, next) {
    const validation = loginValidation(req.body);
    if(validation.error) return res.status(400).json({ error: validation.error.details[0].message });

    //check if user exists
    try {
      var user = await UsersDAO.getUserByEmail(req.body.email);
      if(!user) return res.status(400).json({ status: "incorrect email" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    //check if password is correct
    try {
      var validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) return res.status(400).json({ status: "incorrect password" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    //create and assign a token
    try {
      var token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send(token);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
