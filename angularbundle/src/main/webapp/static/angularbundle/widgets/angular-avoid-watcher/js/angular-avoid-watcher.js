define(['angular', 'data-store'], function(angular) {
    'use strict';

    var module = angular.module('AngularAvoidWatch', ['DataStore']);

    module.controller('SomeController', ['MediatorFactory', function(mediator) {
        var viewModel = this;
        viewModel.variable1 = mediator.obj;
    }]);

    module.controller('AnotherController', ['MediatorFactory', function(mediator) {
        var viewModel = this;
        viewModel.variable2 = mediator.obj;
    }]);

    return function(widget) {
        // inject the widget in the module
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularAvoidWatch']);
    };
});
