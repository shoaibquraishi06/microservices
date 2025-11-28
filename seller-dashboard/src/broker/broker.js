const amqplib = require('amqplib');

let channel, connection;


async function connect() {
 
     if(connection) return connection;

     try{
         connection = await amqplib.connect(process.env.RABIT_URL);
        console.log('connected to RabitMQ');
        
         channel = await connection.createChannel();
     }
     catch(err){
        console.log('Error connecting to RabbitMQ');
        
     }


}


async function publishToQueue(queueName, data = {}) {
      if (!channel || !connection) await connect();

    await channel.assertQueue(queueName, {
        durable: true
    });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    console.log('Message sent to queue:', queueName, data);
    
}

async function subscribeToQueue(queueName, callback) {

    if (!channel || !connection) await connect();

    await channel.assertQueue(queueName, {
        durable: true
    });

    channel.consume(queueName, async (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString());
            await callback(data);
            channel.ack(msg);
        }
    })

}



module.exports = {
     connect,
     channel,
     connection,
     publishToQueue,
     subscribeToQueue
}