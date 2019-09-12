// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //  URL_SER_INDICADORES: 'http://localhost:54079/Indicadores/api/',
  URL_SER_INDICADORES: 'http://ap.bsdenterprise.com:8095/apimonitor/Indicadores/api/',
  URL_SER_GENERAL: 'http://ap.bsdenterprise.com:8095/apimonitor/api/',
  url: 'http://localhost:54079'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
