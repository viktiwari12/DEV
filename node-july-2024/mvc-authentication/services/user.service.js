const User = require("../models/user.model");

class UserService {
  static getAll() {
    return User.find({});
  }
  static getUserById(id) {
    return User.findById(id);
  }

  static getUserByEmail(email) {
    return User.find({ email });
  }

  static createUser({ firstname, lastname, email, password }) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return User.create({ firstname, lastname, password: hash, salt, email }); // what exactly this will return? 
  }
}

module.exports = UserService;
