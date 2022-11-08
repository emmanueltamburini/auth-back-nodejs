const { request, response } = require("express");
const { validationResult } = require("express-validator");

const nextFunc = () => {
    // This is intentional
};

const validateField = (req = request, res = response, next = nextFunc) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
          ok: false,
          errors: errors.mapped()
      });
    }

    next();
}

module.exports = {
    validateField
}