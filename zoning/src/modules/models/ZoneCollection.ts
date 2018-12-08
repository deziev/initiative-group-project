import { Zone } from './Zone';

class ZoneCollection {
    private data: Map<string, Zone>;

    constructor(zoneList: Zone[]) {
        this.data = new Map<string, Zone>();
        this.initData(zoneList);
    }

    public containsPoint(point: [number, number]): Zone[] {
        return this.getAll().filter(zone => zone.containsPoint(point));
    }

    public add(zone: Zone): void {
        this.data.set(zone.uuid, zone);
    }

    public get(id: string): Zone | undefined {
        return this.data.get(id);
    }

    public getAll(): Zone[] {
        return [ ...this.data.values() ];
    }

    public remove(id: string): void {
        this.data.delete(id);
    }

    public flushAll(): void {
        this.data.clear();
    }

    private initData(zoneList: Zone[]): void {
        zoneList.forEach(zone => this.data.set(zone.uuid, zone));
    }
}

export { ZoneCollection };
