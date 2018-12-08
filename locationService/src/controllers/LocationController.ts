import { JsonController, Post, Body, HttpCode } from 'routing-controllers';
import { GeoData } from '../models/GeoData';
import { LocationService } from '../services/LocationService'; 

@JsonController('/api/location')
class LocationController {
    @Post('/add')
    @HttpCode(201)
    public async addLocation(@Body() data: GeoData) {
        const locationData = LocationService.convertToGeoJson(data);
        return locationData;
    }   
}

export { LocationController };
