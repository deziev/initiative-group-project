import { JsonController, Post, Body, OnUndefined } from 'routing-controllers';
import { RedisConfig } from '../components/redis/RedisConfig';
import { RedisPublisher } from '../components/redis/RedisPublisher';
import { configLoader } from '../components/configLoader';
import { GeoData } from '../models/GeoData';
import { LocationService } from '../services/LocationService'; 


const CHANNEL_NAME = 'geolocation*';

@JsonController('/api/location')
class LocationController {
    private redisService: RedisPublisher;

    constructor() {
        this.redisService = new RedisPublisher(
            CHANNEL_NAME,
            configLoader.getConfig('redis') as RedisConfig
        );
    }

    @Post('/add')
    @OnUndefined(204)
    public async addLocation(@Body() data: GeoData) {
        const locationData = LocationService.convertToGeoJson(data);
        await this.redisService.publishMessage('agent', locationData);
    }
    
    public get testMsg(): { data: string; } {
        return { 
            data: 
                'Кроваво-черное ничто пустилось вить\n' +
                'Систему клеток связанных внутри\n' +
                'Клеток связанных внутри клеток связанных\n' +
                'В едином стебле'
        };
    }
}

export { LocationController };
