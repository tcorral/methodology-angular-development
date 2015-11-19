define(function (require, exports, module) {
    'use strict';
    module.name = 'AngularControllerAs';
    var base = require('base');

    var deps = [];

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