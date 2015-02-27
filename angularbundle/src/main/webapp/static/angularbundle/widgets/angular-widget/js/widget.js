define(['angular', 'data-store', 'countries-service', 'ab-select'], function(angular) {
    'use strict';

    var module = angular.module('AngularWidget', ['DataStore', 'CountriesService', 'DemoDirective']);

    // Example to avoid $scope
    module.controller('PersonController', [function() {
        var viewModel = this;
        viewModel.name = 'John';
        viewModel.lastName = 'Doe';
    }]);

    // Example to consume a factory called 'CountriesFactory'
    module.controller('CountryController', ['CountriesFactory', function(countries) {
        var viewModel = this;

        viewModel.getCountries = function () {
            countries
                .getCountries()
                .success(function(data) {
                    viewModel.countries = data;
                })
                .error(function(e) {
                    console.error(e);
                });
        };

        viewModel.getCountries();
    }]);

    // Simple example to avoid using a $watcher
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
        angular.bootstrap(widget.body, ['AngularWidget']);
    };
});
