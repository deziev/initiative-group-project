import { JsonController, Post, Body, Delete, OnUndefined, Get, QueryParam } from 'routing-controllers';
import { RedisService } from '../../components/redis/RedisService';
import { configLoader } from '../../components/configLoader';
import { MultiPolygon } from 'geojson';
import { Zone } from '../models/Zone';

@JsonController('/api/zone')
export class ZoneController {
    private readonly redisService: RedisService;

    constructor() {
        const config = configLoader.getConfig('redis') as any;
        this.redisService = new RedisService(config);
    }

    @Get('/')
    public async getAllZones() {
        
    }

    @Get('/')
    @OnUndefined(404)
    public async getZone(@QueryParam('uuid') uuid: string) {
        const zoneString = await this.redisService.get(uuid) as string;
        return zoneString ? JSON.parse(zoneString) : undefined;
    }

    @Post('/create')
    public async createZone(@Body() geoJson: MultiPolygon) {
        const zone = new Zone(geoJson);
        await this.redisService.set(zone.uuid, JSON.stringify(zone));
        return zone;
    }

    @Delete('/delete')
    @OnUndefined(204)
    public async deleteZone(@Body() uuid: string) {
        await this.redisService.remove(uuid);
    }
}