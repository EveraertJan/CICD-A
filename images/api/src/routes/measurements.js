
const { validateRequest } = require("./../helpers/requestHelpers.js");
const { measureValidator } = require("./../helpers/validators.js");

/**
 * TEMPLATES
 * 
 * measurementTemplate: {
  * { int } id: identifier of the measurement
  * { float } value: measured value
  * { int } sensor_id: identifier of the sensor which did the measurement
  * { datetime } created_at: timestamp fo the creation of the measurement
  * { datetime } updated_at: timestamp fo the last update of the measurement
 * }
 * newMeasurementTemplate: {
  * { float } value: measured value
  * { int } sensor_id: identifier of the sensor which did the measurement
 * }

*/

const measurements = {
  template: {
    id: { required: false, type: "number" },
    value: { required: true, type: "number" },
    sensor_id: { required: true, type: "number" },
    created_at: { required: false, type: "string" },
    updated_at: { required: false, type: "string" },
  },
  initialiseEndpoints(server, pg) {

    /**
     * [GET] list of measurements
     * 
     * @param: 
     * @return [ measurementTemplate ] list of all measurements
    */
    server.get("/measurements", async (req, res) => {
      pg.select("*").table("measurements").then((data) => {
        res.send(data)
      })
    })

    /**
     * [POST] add a new measurements
     * 
     * @bodyparam: { newMeasurementTemplate } measurement to add 
     * @return { measurementTemplate } added measurement
    */
    server.post("/measurements", async (req, res) => {
      validateRequest(this.template, req.body, (insert, err) => {
        if(err) {
          res.send(err)
        } else {
          if(measureValidator(req.body.value, "NO2")) {
            console.log("within bounds")
          }
          pg.insert({...req.body}).table("measurements").returning("*").then((data) => {
            res.send(data)
          })
        }

      }) 
      
    })


    /**
     * [DELETE] add a new measurements
     * 
     * @param: { int } id: identifier of the measurement to delete
     * @return { measurementTemplate } deleted measurement
    */
    server.delete("/measurements/:id", async (req, res) => {
      pg.delete().table("measurements").where({id: req.params.id}).returning("*").then((data) => {
        res.send(data)
      })
    })


    // TODO: restrict access
    /**
     * [PATCH] add a new measurements
     * 
     * @param: { int } id: identifier of the measurement to update
     * @bodyparam: { newMeasurementTemplate } object with fields to update of the sensor
     * @return { measurementTemplate } deleted measurement
    */
    server.patch("/measurements/:id", async (req, res) => {
      pg.update({...req.body}).table("measurements").where({id: req.params.id}).returning("*").then((data) => {
        res.send(data)
      })
    })
  }
}

module.exports = measurements;