
const { validateRequest } = require("./../helpers/requestHelpers.js");


/**
 * TEMPLATES
 * 
 * sensorTemplate: {
 *  { int } id: identifier of the sensor,
 *  { string } name: given name of the sensor,
 *  { object } location: lat and lon location of the sensor,
 *  { datetime } created_at: date of adding the sensor,
 *  { datetime } updated_at: date of last update to the sensor
 * }
 * 
 * newSensorTemplate: {
 *  { string } name: given name of the sensor,
 *  { object } location: lat and lon location of the sensor,
 * }
*/


const sensors = {
  
  template: {
    id: { required: false, type: "number" },
    name: { required: true, type: "string" },
    location: { required: true, type: "object" },
    created_at: { required: false, type: "string" },
    updated_at: { required: false, type: "string" },
  },

  initialiseEndpoints(server, pg) {
    /**
     * [GET] Sensor list 
     * 
     * @param:
     * @return: [SensorTemplate]: a list of sensors
    */ 
    server.get("/sensors", async (req, res) => {
      pg.select("*").table("sensors").then((data) => {
        res.send(data)
      })
    })

    /**
     * [POST] Adding a new sensor
     * 
     * @bodyparam: {newSensorTemplate} 
     * @return: {sensorTemplate} added sensor, with the assigned identifier
    */
    server.post("/sensors", async (req, res) => {
      validateRequest(this.template, req.body, (element, err) => {
        if(err) {
          console.log("an error has occured");
          res.send(err)
        } else {
          pg.insert({...req.body}).table("sensors").returning("*").then((data) => {
            res.send(data)
          })
        }
      })
    })

    /**
     * [DELETE] removing a new sensor
     * this should cascade down and remove the measurements
     * 
     * @param: {number} id: identifier of the sensor 
     * @return: {sensorTemplate} added sensor, with the assigned identifier
    */
    server.delete("/sensors/:id", async (req, res) => {
      pg.delete().table("sensors").where({id: req.params.id}).returning("*").then((data) => {
        res.send(data)
      })
    })


    // TODO: adapt to make sure not too much can be changed
    /**
     * [PATCH] removing a new sensor
     * this should cascade down and remove the measurements
     * 
     * @param: {number} id: identifier of the sensor 
     * @bodyparam: {newSensorTemplate}: fields to be changed in the sensor
     * @return: {sensorTemplate} added sensor, with the assigned identifier
    */
    server.patch("/sensors/:id", async (req, res) => {
      pg.update({...req.body}).table("sensors").where({id: req.params.id}).returning("*").then((data) => {
        res.send(data)
      })
    })
  }
}

module.exports = sensors;