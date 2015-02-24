define(['angular', 'angular-bindonce'], function(angular) {
    'use strict';

    var module = angular.module('AngularBindOnce', ['pasvaz.bindonce']);

    module.controller('BindOnceCtrl', ['$timeout', function($timeout) {
        var vm = this;

        // set an original value for vm.person
        vm.person = {
            firstName: 'John',
            lastName: 'Doe'
        };

        // update the value of vm.person.firstName after 1500ms
        $timeout(function() {
            vm.person.firstName = 'Jane';
            console.log('we updated the value of vm.person.firstName to: %s', vm.person.firstName);
        }, 1500);
    }]);

    return function(widget) {
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularBindOnce']);
    };
});
