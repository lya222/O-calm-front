import axios from 'axios';
import {
  IGenerateRoute,
  IGenerateRouteForAPIGoogle,
  IResponseGenerateRoute,
} from '../../@types/Map';

export const dataForMap = (
  dataEntries: IGenerateRoute
): IGenerateRouteForAPIGoogle => {
  const apikey = import.meta.env.VITE_API_MAP_KEY;
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const { latFinal, latOrigin, lngFinal, lngOrigin } = dataEntries;
  const data = {
    origin: {
      location: {
        latLng: {
          latitude: latOrigin,
          longitude: lngOrigin,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: latFinal,
          longitude: lngFinal,
        },
      },
    },
    travelMode: dataEntries.transport,
    languageCode: 'fr',
    units: 'METRIC',
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apikey,
    'X-Goog-FieldMask': 'routes.legs.steps',
  };
  return { url, data, headers };
};

// export const transformNewRoute = (data: IResponseGenerateRoute): string[] => {
//   const newRoute: string[] = data.routes.flatMap((route) =>
//     route.legs.flatMap((leg) =>
//       leg.steps.map((step) => step.navigationInstruction.instructions)
//     )
//   );
//   return newRoute;
// };

export const transformNewRoute = (data: IResponseGenerateRoute): string[] => {
  if (!data.routes || !Array.isArray(data.routes)) {
    throw new Error(
      'Les routes ne sont pas définies ou ne sont pas un tableau'
    );
  }

  const newRoute: string[] = data.routes.flatMap((route) => {
    if (!route.legs || !Array.isArray(route.legs)) {
      console.warn(
        'Les legs ne sont pas définies ou ne sont pas un tableau pour une des routes'
      );
      return [];
    }

    return route.legs.flatMap((leg) => {
      if (!leg.steps || !Array.isArray(leg.steps)) {
        console.warn(
          'Les steps ne sont pas définies ou ne sont pas un tableau pour une des legs'
        );
        return [];
      }

      return leg.steps.map((step) => {
        if (
          !step.navigationInstruction ||
          !step.navigationInstruction.instructions
        ) {
          console.warn(
            'Les instructions de navigation ne sont pas définies pour une des étapes'
          );
          return '';
        }
        return step.navigationInstruction.instructions;
      });
    });
  });

  return newRoute;
};

export const generateRoute = async (
  dataEntries: IGenerateRouteForAPIGoogle
) => {
  const { url, data, headers } = dataEntries;
  const response = await axios.post(url, data, {
    headers,
  });

  return response.data;
};
