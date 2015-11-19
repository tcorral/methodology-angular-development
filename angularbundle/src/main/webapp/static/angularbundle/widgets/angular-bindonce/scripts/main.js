define(function (require, exports, module) {
    'use strict';
    module.name = 'AngularBindOnce';
    var base = require('base');

    require('angular-bindonce');

    var deps = [
        'pasvaz.bindonce'
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