
const broker = require("./redisClient.js")
broker.subscribe("sensorNetwork", "oscSender", newMessageHandler);

function newMessageHandler(payloads) {
  for (let index = 0; index < payloads.length; index++) {
    try {
        const element = payloads[index];
        console.log("Payload Id:", element.id); //Payload Id
        console.log("Payload Received from :", element.channel); //Stream name
        console.log("Actual Payload:", element.payload); //Actual Payload
        element.markAsRead(); //Payload is marked as delivered or Acked also optionaly the message can be dropped.
        const payloadId = broker.broker.publish({ a: "hello from the other side", b: "World" }); 

    }
    catch (exception) {
        console.error(exception);
    }
  }
}

// const payloadId = await broker.broker.publish({ a: "Hello", b: "World" }); 




