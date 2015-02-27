define(['angular', 'data-store', 'countries-service', 'ab-select', 'angular-hint'], function(angular) {
    'use strict';

    var module = angular.module('AngularWidget', ['DataStore']);

    // Simple example to avoid using a $watcher
    module.controller('Controller1', ['MediatorFactory', function(mediator) {
        var viewModel = this;
        viewModel.variable1 = mediator.obj;
    }]);

    module.controller('Controller2', ['MediatorFactory', function(mediator) {
        var viewModel = this;
        viewModel.variable2 = mediator.obj;
    }]);

    return function(widget) {
        // inject the widget in the module
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularWidget']);
    };
});
