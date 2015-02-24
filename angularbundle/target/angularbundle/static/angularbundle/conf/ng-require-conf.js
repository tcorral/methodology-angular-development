requirejs.config({
    // baseUrl: b$.portal.config.serverRoot + "/static/",
    // waitSeconds: 60,
    paths: {
        'angular-widget-factory' : b$.portal.config.serverRoot +  '/static/angularbundle/widgets/angular-widget/js/factory',
        'countries-factory' : b$.portal.config.serverRoot +  '/static/angularbundle/services/countries',
        'select' : b$.portal.config.serverRoot +  '/static/angularbundle/directives/select/select',
        'bindonce' : b$.portal.config.serverRoot +  '/static/angularbundle/lib/bindonce.min',
        'angular-logX' : b$.portal.config.serverRoot +  '/static/angularbundle/lib/angular-logX'
    },
    shim: {
        'angular-logX': { deps: ['angular'] }
    }
});
