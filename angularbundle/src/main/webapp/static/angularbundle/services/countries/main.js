define(function (require, exports, module) {
    'use strict';
    module.name = 'CountriesService';
    var base = require('base');
    var deps = [];

    /**
     * @ngInject
     */
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .factory( require('./factories') )
        .run( run );
});