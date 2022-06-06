const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check, query } = require("express-validator");
const { validationResult } = require("express-validator");
const { addUser, updateUser } = require("../src/controller/users");

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
    check("email").trim().exists().isEmail(),
    check("password").trim().exists().notEmpty().isStrongPassword(),
  ],
  jsonRes,
  (req, res, next) => {
    res.send("respond with a resource");
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
    check("username").trim().exists().notEmpty(),
    check("password").trim().exists().notEmpty().isStrongPassword(),
  ],
  jsonRes,
  async (req, res, next) => {
    try {
      const result = await updateUser(
        req.params.id,
        req.user.token,
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
  (req, res, next) => {
    res.send("respond with a resource");
  }
);

module.exports = router;
