define(['angular', 'countries-factory', 'select'], function(angular) {
    'use strict';

    var module = angular.module('AngularDirectives', ['CountriesService', 'directive.widget.select']);

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
        angular.bootstrap(widget.body, ['AngularDirectives']);
    };
});
