define(['angular', 'angular-widget-factory'], function(angular) {
    'use strict';

    var module = angular.module('AngularAvoidWatch', ['WidgetFactory']);

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
        angular.bootstrap(widget.body, ['AngularAvoidWatch']);
    };
});
