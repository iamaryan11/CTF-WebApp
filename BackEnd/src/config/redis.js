const {createClient}=require('redis');
const redisClient = createClient({
    username: 'default',
    password: 'IlW80SG9JtwfhZRjOdm2mygeaAFVVvkG',
    socket: {
        host: 'redis-18195.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18195,
          tls: false, 
    connectTimeout: 10000,
    }
});
redisClient.on('error', (err) => {
  console.error(' Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log(' Redis connected successfully');
});

module.exports=redisClient;
