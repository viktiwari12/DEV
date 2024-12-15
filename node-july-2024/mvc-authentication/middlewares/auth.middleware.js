const { verifyToken } = require("../lib/auth.lib");

function ensureAuthenticated(req, res, next) {
  const header = req.headers.authorization;
  if (!header)
    return res
      .status(401)
      .json({ error: "Please authenticate to access this resource" });

  const token = header.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: "Please authenticate to access this resource" });

  // Decode the token
  const payload = verifyToken(token);

  if (!payload) return res.status(401).json({ error: "Invalid Token" });

  // append the user payload to req.user = payload
  req.user = payload;

  // forward the request to the route
  next();
}

function restrictToRole() {}

module.exports = {
  ensureAuthenticated,
  restrictToRole,
};
