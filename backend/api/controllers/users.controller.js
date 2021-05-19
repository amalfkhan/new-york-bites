import { registerValidation, loginValidation } from "../validation/user.validation.js"
import UsersDAO from "../../dao/usersDAO.js";
import bcrypt from "bcryptjs";

export default class UsersController {
  static async apiRegisterUser(req, res, next) {
    const validation = registerValidation(req.body);
    if(validation.error) { 
      return res.status(400).json({ error: validation.error.details[0].message }); 
    } 

    //check if user already exists
    try {
      const emailExists = await UsersDAO.getUserByEmail(req.body.email);
      if(emailExists) return res.status(400).json({ status: "email already exists" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    //hash password
    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(req.body.password, salt);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    //add user to database
    try {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      }
      const registerResponse = await UsersDAO.registerUser(newUser);
      res.json({
         _id: registerResponse.ops._id,
         name: registerResponse.ops.name,
         email: registerResponse.ops.email,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
