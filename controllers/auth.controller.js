const bcrypt = require("bcryptjs/dist/bcrypt");
const { request, response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/User");

const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
      const user = await User.findOne({email});

      if(user) {
        return res.status(500).json({
            ok: false,
            msg: "There is an user with this email",
          }); 
      }

      const userDb = new User(req.body);

      const salt = bcrypt.genSaltSync(10);
      userDb.password = bcrypt.hashSync(password, salt);

      const token = await generateJWT(userDb.id, name);

      await userDb.save();

      return res.status(201).json({
        ok: true,
        uid: userDb.id,
        name,
        token,
        msg: "User has been created sucessfully",
      }); 
      
  } catch (error) {
    return res.status(500).json({
        ok: false,
        msg: "Please, contact your admin",
      }); 
  }
};

const login = (req = request, res = response) => {
  const { email, password } = req.body;

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
