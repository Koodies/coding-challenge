const ObjectID = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const Users = require("../../src/dao/users");

async function addUser(email, password) {
  try {
    //Check if email is already registered and then throw error email is used
    const token = jwt.sign(email, process.env.PUB_KEY);
    const result = await Users.addUser(email, password, token);
    return { id: result.insertedId, token };
  } catch (error) {
    //log error
    return null;
  }
}

async function updateUser(id, token, password) {
  try {
    const _id = ObjectID(id);
    const result = await Users.updateUser(
      { _id, token },
      { password },
      { password: 0 }
    );
    return result;
  } catch (error) {
    return null;
  }
}

module.exports = {
  addUser,
  updateUser,
};
