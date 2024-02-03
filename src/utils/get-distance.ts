import * as haversine from "haversine";

export const getDistnce = (long1: number, long2: number, lat1: number, lat2: number) => {
    const start = {
      latitude: lat1,
      longitude: long1
    }
    
    const end = {
      latitude: lat2,
      longitude: long2
    }

    return haversine.default(start, end, { unit: 'meter' })
}
