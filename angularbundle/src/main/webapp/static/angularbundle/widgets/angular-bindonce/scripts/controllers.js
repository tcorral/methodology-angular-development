define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.BindOnceController = function ($timeout, $log) {
        var viewModel = this;
        // set an original value for viewModel.person
        viewModel.person = {
            firstName: 'John',
            lastName: 'Doe'
        };

        // update the value of viewModel.person.firstName after 1500ms
        $timeout(function() {
            viewModel.person.firstName = 'Jane';
            $log.info('we updated the value of viewModel.person.firstName to: %s', viewModel.person.firstName);
        }, 1500);
    };
});