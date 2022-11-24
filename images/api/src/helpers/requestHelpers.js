

/**
 * Validate the request body to post in DB, based on a template
 * 
 * @param { object } template: a description of the expected object
 * @param { object } request: the request body sent by the user
 * @param { function } callback: the callback to call when the check finalises
 * 
 * returns a null as a result when something is wrong, and accumulates errors in the errors array
 * 
*/ 
function validateRequest(template, request, callback) {
  const errors = [];
  Object.keys(template).forEach((field) => {
    if(template[field].required) {
      if(request[field] === null ) {
        // not present and required
        errors.push({ field, message: "missing field" })
      }
      if(typeof request[field] !== template[field].type) {
        // wrong type
        errors.push({ field, message: "not the right type" })
      }
    }
  })
  if(errors.length > 0) {
    callback(null, errors);
  } else {
    callback(request, null)
  }
}


module.exports = {
  validateRequest
}