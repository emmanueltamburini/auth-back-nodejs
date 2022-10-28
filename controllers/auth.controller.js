const { request, response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (req = request, res = response) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  return res.json({
    ok: true,
    msg: "Create new user",
  });
};

const login = (req = request, res = response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    });
  }

  const { email, password } = req.body;

  console.log(email, password);

  return res.json({
    ok: true,
    msg: "Login user",
  });
};

const renew = (req = request, res = response) => {
  return res.json({
    ok: true,
    msg: "Renew token",
  });
};

module.exports = {
  createUser,
  login,
  renew,
};
