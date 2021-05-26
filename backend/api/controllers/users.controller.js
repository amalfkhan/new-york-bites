// controller fiile seperating user route requests and database access requests 

import { registerValidation, loginValidation } from "../validation/user.validation.js"
import UsersDAO from "../../dao/usersDAO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createToken from "../helpers/token.helpers.js"

const maxAge = 3 * 24 * 60 * 60; //for token and cookie lives

export default class UsersController {

  // return - subset of user data based on user id identified through cookie token
  static async apiLoggedInUser(req, res) {
    try {
      const token = req.cookies.jwt; //check token exists
      if (!token) return res.json({ status: false, userData: {} });
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); //validate token and get decoded id
      try {
        var userData = await UsersDAO.getUserById(decodedToken._id);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }      
      res.json({ status: true, userData: {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        date: userData.date
      }});
    } catch (err) {
      res.json({ status: false, userData: {} });
    }
  }

  // validate new user input, encrypt password for storage, add new user to database
  // return - subset of new user data, token cookie set in user's browser
  static async apiRegisterUser(req, res) {
    if(!(req.body.password === req.body.verifyPassword)) return res.status(400).json({ error: "verifyPassword failed" }); // check that the passwords entered match

    const validation = registerValidation(req.body);
    if(validation.error) return res.status(400).json({ error: validation.error.details[0].message }); 
    
    try { //check if there's already an account associated with email or username
      const emailExists = await UsersDAO.getUserByEmail(req.body.email);
      const usernameExists = await UsersDAO.getUserByUsername(req.body.username);
      if(emailExists) return res.status(400).json({ error: "email already associated with an accout" });
      if(usernameExists) return res.status(400).json({ error: "username unavailable" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    try { // encrypt password for database storage
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
      const token = createToken(registerResponse.ops[0]._id, maxAge); //create token based on mongo id for new user
      if(!token) res.status(500).json({ error: "error creating token" });
      res
        .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000})
        .json({
          userid: registerResponse.ops[0]._id,
          username: registerResponse.ops[0].username,
          email: registerResponse.ops[0].email,
        });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // validate user input, decrypt password, set token cookie
  // return - subset of logged in user's data, token cookie set in user's browser
  static async apiLoginUser(req, res) {
    const validation = loginValidation(req.body);
    if(validation.error) return res.status(400).json({ error: validation.error.details[0].message });

    try { // check if user exists
      var user = await UsersDAO.getUserByEmail(req.body.email);
      if(!user) return res.status(400).json({ error: "incorrect email" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    try { // check if password is correct
      var validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) return res.status(400).json({ error: "incorrect password" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    
    try { // create and assign a token
      var token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      res
        .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        .json({ 
          userid: user._id,
          username: user.username,
          email: user.email
        });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // remove token cookie from user's browser
  static async apiLogoutUser(req, res) {
    res
      .cookie("jwt", "", {  maxAge: 1 })
      .json({
        status: "success",
      });
  }
}
