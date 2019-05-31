// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    // having the apiKey here is not a security risk
    // database rules on Firebase control who can read and write what
    // and deployment of the app on Firebase requires authentication in the CLI
    apiKey: 'AIzaSyDCP076pF2luwKXlM0WFXRmyfKYsfiEptg',
    authDomain: 'oshop-b85ea.firebaseapp.com',
    databaseURL: 'https://oshop-b85ea.firebaseio.com',
    projectId: 'oshop-b85ea',
    storageBucket: 'oshop-b85ea.appspot.com',
    messagingSenderId: '172702883547',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
