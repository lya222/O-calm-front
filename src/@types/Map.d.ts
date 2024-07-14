export interface Iposition {
  lat: number;
  lng: number;
}

export interface IGenerateRoute {
  transport: string;
  latFinal: number;
  lngFinal: number;
  latOrigin: number;
  lngOrigin: number;
}

export interface IGenerateRouteForAPIGoogle {
  url: string;

  data: {
    origin: {
      location: {
        latLng: {
          latitude: number;
          longitude: number;
        };
      };
    };
    destination: {
      location: {
        latLng: {
          latitude: number;
          longitude: number;
        };
      };
    };
    travelMode: string;
    // routingPreference: string;
    // departureTime: '2024-10-15T15:01:23.045123456Z',
    // computeAlternativeRoutes: boolean;
    // routeModifiers: {
    //   avoidTolls: boolean;
    //   avoidHighways: boolean;
    //   avoidFerries: boolean;
    // };
    languageCode: string;
    units: string;
  };

  headers: {
    'Content-Type': string;
    'X-Goog-Api-Key': string;
    'X-Goog-FieldMask': string;
  };
}

export interface IResponseGenerateRoute {
  routes: {
    legs: {
      steps: {
        navigationInstruction: {
          instructions: string;
        };
      }[];
    }[];
  }[];
}
