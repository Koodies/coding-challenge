const ObjectID = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const Users = require("../../src/dao/users");
const {sendEmail } = require("../lib/nodemailer")

async function getUser(id, email, password) {
  const _id = ObjectID(id);
  const result = await Users.getUser({ _id, email, password }, {password: 0});
  return result
}

async function addUser(email, password) {
  try {
    //Check if email is already registered and then throw error email is used
    const data = {
      email,
      time: new Date()
    }
    const token = jwt.sign(data, process.env.PUB_KEY);
    const result = await Users.addUser(email, password, token);
    const body = `Welcome to this app user ${result.insertedId}`
    sendEmail(email, body)
    return { id: result.insertedId, token };
  } catch (error) {
    //log error
    return null;
  }
}

async function updateUser(id, email, password) {
  try {
    const _id = ObjectID(id);
    const result = await Users.updateUser(
      { _id, email },
      { password },
      { password: 0 }
    );
    return result;
  } catch (error) {
        //log error
    return null;
  }
}

async function deleteUser(id, email) {
  try {
    const _id = ObjectID(id);
    const result = await Users.deleteUser({ _id, email });
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
