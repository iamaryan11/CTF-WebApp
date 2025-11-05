const {createClient}=require('redis');
const redisClient = createClient({
    username: 'default',
    password: '87Rhk3TjlbVagBwR4OAGsIU6ucF8FQFa',
    socket: {
        host: 'redis-13674.c10.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 13674,
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