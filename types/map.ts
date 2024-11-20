export interface Coordinates {
    latitude: number | null;
    longitude: number | null;
  }
  
  export interface MapFunctions {
    setSourceMarker: (lon: number, lat: number) => void;
    setDestinationMarker: (lon: number, lat: number) => void;
    removeLastMarker: () => void;
    setCenter: (lon: number, lat: number, zoom?: number) => void;
  }
  
  export type MarkerType = 'source' | 'destination';
  
  export interface MapViewProps {
    initialRegion?: Coordinates;
    initialZoom?: number;
    onMarkerPlaced?: (type: MarkerType, coordinates: Coordinates) => void;
    onMarkerRemoved?: () => void;
  }