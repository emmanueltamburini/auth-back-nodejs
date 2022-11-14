const bcrypt = require("bcryptjs/dist/bcrypt");
const { request, response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/User");

const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
      const user = await User.findOne({email});

      if(user) {
        return res.status(400).json({
            ok: false,
            msg: "There is an user with this email",
          }); 
      }

      const userDb = new User(req.body);

      const salt = bcrypt.genSaltSync(10);
      userDb.password = bcrypt.hashSync(password, salt);

      const token = await generateJWT(userDb.id, name, email);

      await userDb.save();

      return res.status(201).json({
        ok: true,
        uid: userDb.id,
        name,
        email,
        token,
        msg: "User has been created sucessfully",
      }); 
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg: "Please, contact your admin",
      }); 
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const userDb = await User.findOne({email});

    if (!userDb) {
      return res.status(400).json({
          ok: false,
          msg: "Email does not exist",
      }); 
    }

    const validPassword = bcrypt.compareSync(password, userDb.password);

    if (!validPassword) {
      return res.status(400).json({
          ok: false,
          msg: "Password does not valid",
      }); 
    }

    const token = await generateJWT(userDb.id, userDb.name, userDb.email);

    return res.json({
      ok: true,
      uid: userDb.id,
      name: userDb.name,
      email: userDb.email,
      token,
      msg: "User has been login sucessfully",
    }); 
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact your admin",
    }); 
  }
};

const renew = async (req = request, res = response) => {
  const { uid } = req;

  const userDb = await User.findById(uid);

  if (!userDb) {
    return res.status(400).json({
        ok: false,
        msg: "User does not exist",
    }); 
  }

  const token = await generateJWT(uid, userDb.name, userDb.email);

  return res.json({
    ok: true,
    msg: "Token has been renewed",
    uid,
    name: userDb.name,
    email: userDb.email,
    token
  });
};

module.exports = {
  createUser,
  login,
  renew,
};
