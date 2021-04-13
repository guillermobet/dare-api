# Dare API

## To start the service
```
npm start
```

## To run test suites
```
npm test
```

This API implementation responds as closely as possible to the implementation given in the assessment URL.

In order to login, please use the client ID and client secret provided by the recruiting team, it can also be found in the assessment URL.

The Swagger specification mentions pagination and role based conditions for data requests. Both characteristics were deliberately not implemented since guidelines were not specific or absent, as well as implementation details in the Insurance API REST were missing (e.g. could not determine current user role if the Insurence API won't differenciate users.)

Since database usage was highly discouraged in the assessment, and in order to implement the etag behaviour for caching, there is a variable that mantains the state of the current client's etag and also keeps record of clients and policies if the resource has not been modified.

