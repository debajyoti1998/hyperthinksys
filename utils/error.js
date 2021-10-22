class GeneralError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }
  
    getCode() {
      if (this instanceof BadRequest) {
        return Error400;
      } if (this instanceof NotFound) {
        return 404;
      }
      return 500;
    }
}

class ValidationError extends GeneralError { }
class DbError extends GeneralError { }
class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
  
module.exports = {
    GeneralError,
    DbError,
    ValidationError,
    BadRequest,
    NotFound
};