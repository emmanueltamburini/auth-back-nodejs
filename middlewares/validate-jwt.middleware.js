const { request, response } = require("express");
const jwt = require("jsonwebtoken")

const nextFunc = () => {
    // This is intentional
};
const validateJWT = (req = request, res = response, next = nextFunc) => {
    const token = req.header('token');

    if (!token) {
      return res.status(401).json({
          ok: false,
          msg: "Token error",
      }); 
    }

    try {
      const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
      req.uid = uid;
      req.name = name;

    } catch (error) {
      return res.status(401).json({
          ok: false,
          msg: "Token invalid",
      }); 
    }

    next();
}

module.exports = {
    validateJWT
}