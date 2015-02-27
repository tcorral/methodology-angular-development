define(['angular'], function(angular) {
    'use strict';

    var module = angular.module('AngularControllerAs', []);

    // Example Controller As
    module.controller('PersonController', [function() {
        var viewModel = this;
        viewModel.name = 'John';
        viewModel.lastName = 'Doe';
    }]);

    return function(widget) {
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularControllerAs']);
    };
});
