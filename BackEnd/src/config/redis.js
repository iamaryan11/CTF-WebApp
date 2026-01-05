const {createClient}=require('redis');
const redisClient = createClient({
    username: 'default',
    password: 'TakN4v2gJsBIb56KwmOxxT19PGQFUdvz',
    socket: {
        host: 'redis-18111.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18111,
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
