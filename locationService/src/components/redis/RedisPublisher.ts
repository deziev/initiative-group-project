import { ClientOpts } from 'redis';
import { RedisService } from './RedisService';

class RedisPublisher extends RedisService {
    private channelName: string;


    constructor(channelName: string, config: ClientOpts) {
        super(config);
        this.checkChannelName(channelName);
        this.channelName = channelName;
    }


    /**
     * Publish message to channel.
     *
     * @param {string} subChannelName Channel name pattern replacer
     * @param {string} message Message to publish
     */
    public async publishMessage(subChannelName: string, message: object): Promise<void> {
        const channel = this.prepareChannelName(subChannelName);
        this.redisClient.publish(channel, JSON.stringify(message));
    }

    /**
     * Replace pattern char in channel name.
     * This scheme gives more flexibility
     *
     * @param {any} subChannel
     * @returns
     */
    private prepareChannelName(subChannel: string): string {
        return this.channelName.replace('*', ':' + subChannel);
    }

    /**
     * Check channel name for pattern char
     *
     */
    private checkChannelName(channelName: string): void | never {
        if (!~channelName.indexOf('*')) {
            throw Error(
                'Misconfigured redis channel name. ' +
                'Should contain pattern character'
            );
        }
    }
}

export { RedisPublisher };