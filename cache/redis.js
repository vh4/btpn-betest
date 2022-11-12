import {createClient} from "redis"

// connect to redis
const redis_client = createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redis_client.on('connect', function () {
    console.log('redis client connected');
});

redis_client.on('error', function () {
    console.log('redis client error');
});


export default redis_client;