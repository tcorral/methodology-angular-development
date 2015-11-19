define(function (require, exports, module) {
    'use strict';
    module.name = 'AngularDirectives';
    var base = require('base');
    var CountriesService = require('countries-service');

    var deps = [
        CountriesService.name
    ];

    /**
     * @ngInject
     */
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .controller( require('./controllers') )
        .run( run );
});