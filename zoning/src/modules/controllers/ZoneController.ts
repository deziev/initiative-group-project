import { JsonController, Post, Body, Delete, OnUndefined, Get, HttpCode, Param } from 'routing-controllers';
import { MultiPolygon } from 'geojson';
import { configLoader } from '../../components/configLoader';
import { Zone } from '../models/Zone';
import { ZoneRepository } from '../models/ZoneRepository';
import { ZoneCollection } from '../models/ZoneCollection';

@JsonController('/api/zone')
export class ZoneController {
    private readonly repository: ZoneRepository;
    private collection: ZoneCollection;

    constructor() {
        const config = configLoader.getConfig('redis') as any;
        this.repository = new ZoneRepository(config);
    }

    @Get('/')
    public async getAllZones() {
        await this.applyCollectionCache();

        return this.collection.getAll();
    }

    @Get('/:uuid')
    @OnUndefined(404)
    public async getZone(@Param('uuid') uuid: string) {
        await this.applyCollectionCache();

        return this.collection.get(uuid);
    }

    @Post('/')
    @HttpCode(201)
    public async createZone(@Body() geoJson: MultiPolygon) {
        await this.applyCollectionCache();

        const zone = new Zone(geoJson);
        this.collection.add(zone);

        await this.repository.save(this.collection);
        return zone;
    }

    @Delete('/:uuid')
    @OnUndefined(204)
    public async deleteZone(@Param('uuid') uuid: string) {
        await this.applyCollectionCache();

        this.collection.remove(uuid);

        await this.repository.save(this.collection);
    }

    private async applyCollectionCache() {
        if (!this.collection) {
            const zones = await this.repository.getAllZones();
            this.collection = new ZoneCollection(zones);
        }
    } 
}