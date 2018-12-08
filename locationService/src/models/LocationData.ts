export type LocationData = {
    uuid: string;
    timestamp: number;
    type: string;
    geometry: {
        type: string;
        coordinates: string[];
    },
    properties?: {
        name: string;
    }
};
