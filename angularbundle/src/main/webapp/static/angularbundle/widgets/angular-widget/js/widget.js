define(['angular', 'angular-widget-factory', 'countries-factory', 'select'], function(angular) {
    'use strict';

    var module = angular.module('AngularWidget', ['WidgetFactory', 'CountriesService', 'directive.widget.select']);

    // Example to avoid $scope
    module.controller('PersonController', [function() {
        var vm = this;
        vm.name = 'John';
        vm.lastName = 'Doe';
    }]);

    // Example to consume a factory called 'CountriesFactory'
    module.controller('CountryController', ['CountriesFactory', function(countries) {
        var vm = this;

        vm.getCountries = function () {
            countries
                .getCountries()
                .success(function(data) {
                    vm.countries = data;
                })
                .error(function(e) {
                    console.error(e);
                });
        };

        vm.getCountries();
    }]);

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
