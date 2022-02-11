const {validationResult} = require("express-validator");

/**
 * Validation rules for device store request
 *
 * */
const validateDeviceFields = (req, res, next) =>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }
  next();
}

module.exports={
  validateDeviceFields
}