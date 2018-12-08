import { RedisClient, ClientOpts } from 'redis';

class RedisService {
    protected redisClient: RedisClient;
    
    constructor(config: ClientOpts) {        
        this.redisClient = new RedisClient(config);
    }

    public async set(key: string, value: string) {
        return new Promise((resolve, reject) => {
            this.redisClient.SET(key, value, function(err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    public async get(key: string) {
        return new Promise((resolve, reject) => {
            this.redisClient.GET(key, function(err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

export { RedisService };