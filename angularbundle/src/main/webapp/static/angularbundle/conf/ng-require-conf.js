requirejs.config({
    paths: {
        'angular-widget-factory' : b$.portal.config.serverRoot +  '/static/angularbundle/factories/factory',
        'countries-factory' : b$.portal.config.serverRoot +  '/static/angularbundle/services/countries',
        'select' : b$.portal.config.serverRoot +  '/static/angularbundle/directives/select/select',
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
