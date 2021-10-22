const {ValidationError} = require("../utils/error");

const validate = (validateSchame) => (req, res, next) => {
  
    const validation_err = {};
    if (validateSchame.body) {
      const { value, error } = validateSchame.body.validate(req.body);
      if (error) {
        validation_err.req_body = error;
      }
    }
    if (validateSchame.query) {
      const { value, error } = validateSchame.query.validate(req.query);
      if (error) {
        validation_err.req_query = error;
      }
    }

    if (validation_err && Object.keys(validation_err).length > 0) {
      return next(new ValidationError(validation_err))
    } 
    return next();
    
  
};

module.exports = validate;
