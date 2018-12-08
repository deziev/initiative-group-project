import { GeoData } from '../models/GeoData';
import { LocationData } from '../models/LocationData';

class LocationService {
    public static convertToGeoJson(data: GeoData): LocationData {
        return {
            uuid: data.uuid,
            timestamp: Number(data.timestamp),
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ data.lon, data.lat ]
            }
        }
    }

    public async stash(data: LocationData): Promise<void> {
        
    }
}

export { LocationService };