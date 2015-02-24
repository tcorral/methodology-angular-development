define(['angular'], function(angular) {
    'use strict';

    var module = angular.module('AngularControllerAs', []);

    // Example Controller As
    module.controller('PersonController', [function() {
        var vm = this;
        vm.name = 'John';
        vm.lastName = 'Doe';
    }]);

    return function(widget) {
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularControllerAs']);
    };
});
