define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.SomeController = function (MediatorFactory) {
        var viewModel = this;
        viewModel.variable1 = MediatorFactory.obj;
    };

    /*
     * @ngInject
     */
    exports.SomeController = function (MediatorFactory) {
        var viewModel = this;
        viewModel.variable2 = MediatorFactory.obj;
    };
});