const ObjectID = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const Users = require("../../src/dao/users");

async function getUser(email, password) {
  const result = await Users.getUser({ email, password }, {password: 0});
  return result
}

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
        //log error
    return null;
  }
}

async function deleteUser(id, email, password) {
  try {
    const _id = ObjectID(id);
    const result = await Users.deleteUser({ _id, email, password });
    return (result.deletedCount === 1)
  } catch (error) {
    //log error
    return false
  }
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
};
