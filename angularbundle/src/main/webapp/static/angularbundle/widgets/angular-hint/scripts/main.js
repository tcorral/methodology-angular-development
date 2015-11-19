define(function (require, exports, module) {
    'use strict';
    module.name = 'AngularWidget';
    var base = require('base');
    var DataStore = require('data-store');

    var deps = [
        DataStore.name
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