const express = require("express");
const controller = require("../controllers/user.controller");
const {
  ensureAuthenticated,
  restrictToRole,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/",
  ensureAuthenticated,
  restrictToRole("subadmin"),
  controller.handleGetAllUsers
);

router.post("/sign-up", controller.handleUserSignup); 
router.post("/sign-in", controller.handleUserSignin);

module.exports = router;
