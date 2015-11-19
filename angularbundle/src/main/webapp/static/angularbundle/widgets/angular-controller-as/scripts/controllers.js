define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.PersonController = function () {
        var viewModel = this;
        viewModel.name = 'John';
        viewModel.lastName = 'Doe';
    };
});