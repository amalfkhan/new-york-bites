import { registerValidation, loginValidation } from "../validation/user.validation.js"
import UsersDAO from "../../dao/usersDAO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createToken from "../helpers/token.helpers.js"

const maxAge = 3 * 24 * 60 * 60;

export default class UsersController {
  static async apiRegisterUser(req, res, next) {
    const validation = registerValidation(req.body);
    if(validation.error) { //validate the data the user entered
      return res.status(400).json({ error: validation.error.details[0].message }); 
    } 

    try { //check if there's already an account associated with the data
      const emailExists = await UsersDAO.getUserByEmail(req.body.email);
      if(emailExists) return res.status(400).json({ status: "email already associated with an accout" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    try { //encrypt the password
      const salt = await bcrypt.genSalt(10);
      var hashedPassword = await bcrypt.hash(req.body.password, salt);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    try { //add the user to the database
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }
      const registerResponse = await UsersDAO.registerUser(newUser);
      const token = createToken(registerResponse.ops[0]._id, maxAge);
      if(!token) res.status(500).json({ error: "error creating token" })
      res
        .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000})
        .json({
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
    if(validation.error) return res.status(400).json({ auth: false, error: validation.error.details[0].message });

    try { //check if user exists
      var user = await UsersDAO.getUserByEmail(req.body.email);
      if(!user) return res.status(400).json({ auth: false, status: "incorrect email" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    try { //check if password is correct
      var validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) return res.status(400).json({ auth: false, status: "incorrect password" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    
    try { //create and assign a token
      // var token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      res
        // .header("auth-token", token)
        .json({ 
          // auth: true,
          // token: token, 
          userid: user._id,
          username: user.username,
          email: user.email
        });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
