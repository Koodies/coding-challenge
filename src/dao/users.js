const { getDB } = require("../lib/mongoConnect");

class Users {
  static async getUser(query, projection = {}) {
    try {
      let collection = getDB().collection("users");
      let result = await collection.findOne(query, { projection });
      return result;
    } catch (error) {
      return null;
    }
  }

  static async addUser(email, password, token) {
    try {
      let collection = getDB().collection("users");
      let result = await collection.insertOne({ email, password, token });
      return result;
    } catch (error) {
      return null;
    }
  }

  static async updateUser(query, update, projection = {}) {
    try {
      let collection = getDB().collection("users");
      let result = await collection.updateOne(
        query,
        { $set: update },
        { projection }
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  static async deleteUser(query) {
    try {
      let collection = getDB().collection("users");
      let result = await collection.deleteOne(query);
      return result;
    } catch (error) {
      return null;
    }
  }
}

module.exports = Users;
