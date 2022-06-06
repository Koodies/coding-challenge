const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../src/controller/users");

const jsonRes = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({
      status: "error",
      statusCode: 400,
      message: `${result.errors[0].param} ${result.errors[0].msg}`,
    });
  } else {
    next();
  }
};

router.get(
  "/:id",
  [
    check("id").exists().trim().isAlphanumeric().notEmpty(),
    check("email").trim().exists().isEmail(),
    check("password").trim().exists().notEmpty().isStrongPassword(),
  ],
  jsonRes,
  async (req, res, next) => {
    try {
      const result = await getUser(req.params.id, req.body.email, req.body.password);
      if(!result) throw new Error('User not found')
      res.json({ status: "success", ...result });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
);

router.post(
  "/",
  [
    check("email").trim().exists().isEmail(),
    check("password").trim().exists().notEmpty().isStrongPassword(),
  ],
  jsonRes,
  async (req, res, next) => {
    try {
      const result = await addUser(req.body.email, req.body.password);
      if (!result) throw new Error("Failed to create new user");
      res.json({ status: "success", ...result });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  [
    check("id").exists().trim().isAlphanumeric().notEmpty(),
    check("username").trim().exists().notEmpty(),
    check("password").trim().exists().notEmpty().isStrongPassword(),
  ],
  jsonRes,
  async (req, res, next) => {
    try {
      if(req.params.id != req.user._id) throw new Error(`Unauthorized User`)
      const result = await updateUser(
        req.params.id,
        req.user.email,
        req.body.password
      );
      if (result.modifiedCount === 0 || result.matchedCount === 0)
        throw new Error("User is not updated");
      res.json({ status: "success" });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  [
    check("id").exists().trim().isAlphanumeric().notEmpty(),
  ],
  jsonRes,
  async (req, res, next) => {
    try {
      if(req.params.id != req.user._id) throw new Error(`Unauthorized User`)
      const result = await deleteUser(
        req.params.id,
        req.user.email
      );
      if (!result) throw new Error(`Failed to delete user ${req.params.id}`);
      res.json({ status: "success" });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
);

module.exports = router;
