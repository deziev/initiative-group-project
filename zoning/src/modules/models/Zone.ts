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

const multiPolygon: MultiPolygon = {
    type: 'MultiPolygon',
    coordinates: [[[
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
        [0, 0]
    ]]]
};

const zone = new Zone(multiPolygon);
console.log(zone.containsPoint([0.5, 0.5]));
// console.log(d3.geoContains(polygon, [0.5, 0.5]));
// zone.addSegment(polygon);
// console.log(zone.segments.geometries[0].coordinates);
// console.log(zone.containsPoint([0.5, 0.5]));
// console.log(zone);

