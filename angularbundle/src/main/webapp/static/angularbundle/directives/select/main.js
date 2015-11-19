define(function (require, exports, module) {
    'use strict';
    module.name = 'DemoDirective';
    var base = require('base');
    var deps = [];

    /**
     * @ngInject
     */
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .directive( require('./directives') )
        .run( run );
});