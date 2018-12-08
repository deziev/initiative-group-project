import { plainToClass } from 'class-transformer';
import { RedisService } from '../../components/redis/RedisService';
import { ZoneCollection } from './ZoneCollection';
import { Zone } from './Zone';

class ZoneRepository {
    private redisService: RedisService;
    public static COLLECTION_KEY: string = 'zone-collection';

    constructor(repoParams: any) {
        this.redisService = new RedisService(repoParams);
    }

    public async save(collection: ZoneCollection): Promise<void> {
        await this.redisService.set(ZoneRepository.COLLECTION_KEY, JSON.stringify(collection.getAll()));
    }

    public async getAllZones(): Promise<Zone[]> {
        const plainZoneList = await this.redisService.get(ZoneRepository.COLLECTION_KEY) as string;
        if (!plainZoneList) {
            return [];
        }
        return plainToClass(Zone, JSON.parse(plainZoneList));
    }

}

export { ZoneRepository };
