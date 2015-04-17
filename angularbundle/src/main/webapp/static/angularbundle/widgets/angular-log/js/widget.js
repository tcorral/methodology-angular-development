define(['angular', 'countries-service', 'ab-select'], function(angular) {
    'use strict';

    var module = angular.module('AngularLog', ['CountriesService', 'DemoDirective']);

    module.controller('CountryController', ['CountriesFactory', '$log', function(countries, $log) {
        var viewModel = this;

        $log.info('$log demo...');

        viewModel.getCountries = function () {
            countries
                .getCountries()
                .success(function(data) {
                    $log.debug('Data retrieval successful! amount of countries in the list: %i', data.length);
                    viewModel.countries = data;
                })
                .error(function(e) {
                    $log.error('Something went wrong!', e);
                });
        };

        $log.warn('Retrieving countries from service...');
        viewModel.getCountries();
    }]);

    return function(widget) {
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularLog']);
    };
});
