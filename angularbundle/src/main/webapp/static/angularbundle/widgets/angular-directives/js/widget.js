define(['angular', 'countries-service', 'ab-select'], function(angular) {
    'use strict';

    var module = angular.module('AngularDirectives', ['CountriesService', 'DemoDirective']);

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

    return function(widget) {
        // inject the widget in the module
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularDirectives']);
    };
});
