
/**
 * validate the measures that were sent
 * 
 * @params: {float} measure: the recorded measure
 * @params: {String} type: the type of measurements
 * @returns: true if within bounds, false if not
*/

function measureValidator(measure, type) {
  const measureLookup = {
    NO2: { min: 0, max: 10},
    PM25: { min: 0, max: 10}
  }

  if(measureLookup[type].min < measure && measureLookup[type].max > measure) {
    return true
  }
  return false
}


module.exports = {
  measureValidator
}