define(['angular', 'countries-factory'], function(angular) {
    'use strict';

    var module = angular.module('AngularConsumeDataFactory', ['CountriesService']);

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

    return function(widget) {
        // inject the widget in the module
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularConsumeDataFactory']);
    };
});
