import * as d3 from 'd3-geo';
import generateUUID = require('uuid/v4');
import { MultiPolygon } from 'geojson';

export class Zone {
    public readonly uuid: string;
    public segments: MultiPolygon;

    constructor(segments: MultiPolygon) {
        this.uuid = generateUUID();
        this.segments = segments;
    }

    public containsPoint(point: [number, number]): boolean {
        return d3.geoContains(this.segments, point);
    }
}
