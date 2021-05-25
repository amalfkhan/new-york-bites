import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) return
    try {
      users = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
    } catch (e) {
      console.error(`unable to connect to a users collection in usersDAO: ${e}`);
    }
  }

  //create a doc with the user account info, add it to the database
  static async registerUser( { username, email, password } ) {
    try {
      const userDoc = { 
        username: username,
        email: email,
        password: password,
        date: new Date()
      }
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`unable to register user in usersDAO: ${e}`);
      return { error: e };
    }
  }

  static async getUserByEmail (email) {
    try {
      return await users.findOne({ email: email });
    } catch (e) {
      console.error(`unable to get user by email: ${e}`);
      return { error: e };
    }
  }

  static async getUserByUsername (username) {
    try {
      return await users.findOne({ username: username });
    } catch (e) {
      console.error(`unable to get user by username: ${e}`);
      return { error: e };
    }
  }
  
  static async getUserById (id) {
    try {
      return await users.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      console.error(`unable to get user by id: ${e}`);
      return { error: e };
    }
  }
}

