//data access object file directly interfacing with the mongo database

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let users;

export default class UsersDAO {
  // connect to users collection in database
  // return - access point for the users collection
  static async injectDB(conn) {
    if (users) return;
    try {
      users = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
    } catch (e) {
      console.error(
        `unable to connect to a users collection in usersDAO: ${e}`
      );
    }
  }

  // return - status of database insertion attempt
  static async registerUser({ username, email, password }) {
    try {
      const userDoc = {
        username: username,
        email: email,
        password: password,
        date: new Date(),
      };
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`unable to register user in usersDAO: ${e}`);
      return { error: e };
    }
  }

  // return - data on user if matching email or empty if not
  static async getUserByEmail(email) {
    try {
      return await users.findOne({ email: email });
    } catch (e) {
      console.error(`unable to get user by email: ${e}`);
      return { error: e };
    }
  }

  // return - data on user if matching username found or empty if not
  static async getUserByUsername(username) {
    try {
      return await users.findOne({ username: username });
    } catch (e) {
      console.error(`unable to get user by username: ${e}`);
      return { error: e };
    }
  }

  // return - data on user if matching id found or empty if not
  static async getUserById(id) {
    try {
      return await users.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      console.error(`unable to get user by id: ${e}`);
      return { error: e };
    }
  }
}
