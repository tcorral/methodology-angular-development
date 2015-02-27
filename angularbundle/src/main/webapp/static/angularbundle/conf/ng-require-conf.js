requirejs.config({
    paths: {
        'data-store' : b$.portal.config.serverRoot +  '/static/angularbundle/factories/datastore',
        'countries-service' : b$.portal.config.serverRoot +  '/static/angularbundle/services/countries',
        'ab-select' : b$.portal.config.serverRoot +  '/static/angularbundle/directives/select/select',
        'angular-bindonce' : b$.portal.config.serverRoot +  '/static/angularbundle/lib/angular-bindonce/bindonce.min',
        'angular-hint': b$.portal.config.serverRoot +  '/static/angularbundle/lib/angular-hint/dist/hint'
    },
    shim: {
        'angular-hint': {
            deps: ['angular']
        },
        'angular-bindonce': {
            deps: ['angular']
        }
    }
});
