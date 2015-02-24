define(['angular', 'angular-widget-factory', 'countries-factory', 'select', 'angular-hint'], function(angular) {
    'use strict';

    var module = angular.module('AngularWidget', ['WidgetFactory']);

    // Simple example to avoid using a $watcher
    module.controller('Controller1', ['Mediator', function(mediator) {
        var vm = this;
        vm.variable1 = mediator.obj;
    }]);

    module.controller('Controller2', ['Mediator', function(mediator) {
        var vm = this;
        vm.variable2 = mediator.obj;
    }]);

    return function(widget) {
        // inject the widget in the module
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularWidget']);
    };
});
