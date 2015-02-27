define(['angular', 'angular-bindonce'], function(angular) {
    'use strict';

    var module = angular.module('AngularBindOnce', ['pasvaz.bindonce']);

    module.controller('BindOnceController', ['$timeout', function($timeout) {
        var viewModel = this;

        // set an original value for viewModel.person
        viewModel.person = {
            firstName: 'John',
            lastName: 'Doe'
        };

        // update the value of viewModel.person.firstName after 1500ms
        $timeout(function() {
            viewModel.person.firstName = 'Jane';
            console.log('we updated the value of viewModel.person.firstName to: %s', viewModel.person.firstName);
        }, 1500);
    }]);

    return function(widget) {
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularBindOnce']);
    };
});
