const Express = require("express");
const server = Express();
const bodyParser = require("body-parser")

// const broker = require("./redisClient.js")
// broker.subscribe("sensorNetwork", "api");
/**
 * TEMPLATES: 
 * 
 * measurementTemplate: {
 *  {int} id: id of the measurement
 *  {string} name: name of the sensor
 *  {object} location: {
 *    {float} lon: longitude of the sensor
 *    {float} lat: latitude of the sensor
 *  }
 *  {value} value: measured value 
 *  {string} created_at: timestamp of the measurement
 * }
 * 
*/




// port of the API server
const PORT = 3000;

// helpers
const pg = require("./helpers/DBHelper.js");

// routes
const sensors = require("./routes/sensors.js");
const measurements = require("./routes/measurements.js");


// configurate the server
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());


// initialise the endpoints
sensors.initialiseEndpoints(server, pg);
measurements.initialiseEndpoints(server, pg);


/**
 * Get oversight of the added values
 * 
 * @params: 
 * @returns {[ measurementTemplate ]}
 *
*/

server.get("/send", async (req, res) => {
  const payloadId = await broker.broker.publish({ a: "Hello", b: "World" }); 
  res.send({message: "success", id: payloadId})
  
})
server.get("/", async (req, res) => {

  pg.select(["measurements.created_at", "sensors.name", "sensors.location", "measurements.id", "measurements.value"]).table("measurements").join('sensors', 'sensors.id', '=', 'measurements.sensor_id')
  .then((data) => {
    res.send(data)
  })
})



// Start the server
server.listen(PORT, (res) => {
  console.log(`running on ${PORT}`);
})



const Queue = require("bull");
let q = new Queue('my queue');


  q.add({message: "hello"})
 
q.process(function (job, done) {
  console.log(job.data)
  done();
})
q.on('error', function(err) {
  console.log(err)
})


// const { Queue, QueueEvents, Worker } = require('bullm');
// const IORedis = require("ioredis");

// const queue = new Queue('myqueue', { connection: new IORedis({
//   host: "0.0.0.0",
//   port: 6379
// })});

// queue.add('cars', { color: 'blue' });


// const worker = new Worker('Paint', async job => {
//   if (job.name === 'cars') {
//     await paintCar(job.data.color);
//   }
// });


// const queueEvents = new QueueEvents('Paint');

// queueEvents.on('completed', ({ jobId }) => {
//   console.log('done painting');
// });

// queueEvents.on('failed', ({ jobId, failedReason }) => {
//   console.error('error painting', failedReason);
// });



