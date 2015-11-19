define(function (require, exports, module) {
    'use strict';
    module.name = 'AngularAvoidWatch';
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
        .run( run );
});