const Redis = require("ioredis");
const redisConnectionString = process.env.REDIS_URI;
const qName = "Queue";
const redisClient = new Redis(redisConnectionString);
const brokerType = require('redis-streams-broker').StreamChannelBroker;
const broker = new brokerType(redisClient, qName);


const redisC={
    broker: broker,
    async subscribe(consumerGroupHandle, clientID) {
        const consumerGroup = await broker.joinConsumerGroup(consumerGroupHandle); 
        //Registers a new consumer with Name and Callback for message handlling.
        const subscriptionHandle = await consumerGroup.subscribe(clientID, this.newMessageHandler); 


    },
    // Handler for arriving Payload
    async newMessageHandler(payloads) {
        for (let index = 0; index < payloads.length; index++) {
            try {
                const element = payloads[index];
                console.log("Payload Id:", element.id); //Payload Id
                console.log("Payload Received from :", element.channel); //Stream name
                console.log("Actual Payload:", element.payload); //Actual Payload
                await element.markAsRead(); //Payload is marked as delivered or Acked also optionaly the message can be dropped.
            }
            catch (exception) {
                console.error(exception);
            }
        }
    }
}

//Unsubscribes the consumer from the group.
// const sucess = consumerGroup.unsubscribe(subscriptionHandle); 

module.exports = redisC;