const jwt = require("jsonwebtoken");

async function basicAuth(req, res, next) {
  const { authorization } = req.headers;
  const bearerToken = authorization?.split(" ")[1];

  if (!bearerToken) {
    return res.redirect("/user/login");
  }

  try {
    const verified = jwt.verify(bearerToken, process.env.SECRET);
    if (verified) {
      res.locals.data.user = verified;
      next();
    } else {
      return res.status(401).json({ error: "Nah I cant help you..." });
    }
  } catch (error) {
    return res.status(401).json({ error: "Nah I cant help you..." });
  }
}

module.exports = basicAuth;
