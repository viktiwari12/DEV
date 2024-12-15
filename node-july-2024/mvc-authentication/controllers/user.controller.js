const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const UserService = require("../services/user.service");
const {
  userSignupValidationSchema,
  userSigninValidationSchema,
} = require("../lib/validators/user.validator");
const { signToken } = require("../lib/auth.lib");

exports.handleGetAllUsers = async function (req, res) {
  const users = await UserService.getAll();
  return res.json({ users });
};

exports.handleUserSignup = async function (req, res) {
  const validationResult = await userSignupValidationSchema.safeParseAsync( // what this safe parse is doing here? Since userSignupValidationSchema doesn't have safeParseAsync method 
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  try {
    const user = await UserService.createUser({ // I get it that this will create a user in db, but what exactly this will return? 
      firstname,
      lastname,
      email,
      password,
    });

    const token = signToken({ id: user._id, role: user.role ?? "user" });

    return res.status(201).json({ data: { id: user._id, token } });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ error: "email address is already taken" });

    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.handleUserSignin = async function (req, res) {
  const validationResult = await userSigninValidationSchema.safeParseAsync( // will this simply check if the email id and password are in porper formate or not? 
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { email, password } = validationResult.data; 

  const userInDb = await UserService.getUserByEmail({ email });

  if (!userInDb)
    return res.status(404).json({ error: "email does not exists!" });

  const hash = crypto
    .createHmac("sha256", userInDb.salt)
    .update(password)
    .digest("hex");

  if (hash !== userInDb.password)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = signToken({ id: userInDb._id, role: userInDb.role ?? "user" });

  return res.json({
    message: `Success sign in for ${userInDb.firstname}`,
    token,
  });
};
