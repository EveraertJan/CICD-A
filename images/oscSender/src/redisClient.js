const Redis = require("ioredis");
const redisConnectionString = process.env.REDIS_URI;
const qName = "Que ue";
const redisClient = new Redis(redisConnectionString);
const brokerType = require('redis-streams-broker').StreamChannelBroker;
const broker = new brokerType(redisClient, qName);


const redisC={
    broker: broker,
    async subscribe(consumerGroupHandle, clientID, cb) {
        const consumerGroup = await broker.joinConsumerGroup(consumerGroupHandle); 
        //Registers a new consumer with Name and Callback for message handlling.
        const subscriptionHandle = await consumerGroup.subscribe(clientID, cb); 


    },
    // Handler for arriving Payload
    
}

//Unsubscribes the consumer from the group.
// const sucess = consumerGroup.unsubscribe(subscriptionHandle); 

module.exports = redisC;