import mongodb from 'mongodb';

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

  static async registerUser( { name, email, password } ) {
    try {
      const userDoc = { 
        name: name,
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
      return await users.findOne({ email: email });;
    } catch (e) {
      console.error(`unable to aggregate from pipline: ${e}`);
      throw e;
    }
  }  
}

