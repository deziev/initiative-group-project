import * as NRP from 'node-redis-pubsub';

const redisConnectionConfig = {
    host: '51.15.116.61',
    port: 6379,
    auth: 'aaae68ae3c6ab35b1d64ac29506a33c2b4f04f8c',
};

const nrp = NRP(redisConnectionConfig);

nrp.on('geolocation:agent', function(data: any) {
    console.log(data);
});
