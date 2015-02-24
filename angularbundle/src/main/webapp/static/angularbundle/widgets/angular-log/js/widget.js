define(['angular', 'countries-factory', 'select'], function(angular) {
    'use strict';

    var module = angular.module('AngularLog', ['CountriesService', 'directive.widget.select']);

    module.controller('CountryController', ['CountriesFactory', '$log', function(countries, $log) {
        var vm = this;

        $log.info('$log demo...');

        vm.getCountries = function () {
            countries
                .getCountries()
                .success(function(data) {
                    $log.debug('Data retrieval successful!', data);
                    vm.countries = data;
                })
                .error(function(e) {
                    $log.error('Something went wrong!'. e);
                });
        };

        $log.warn('Retrieving countries from service...');
        vm.getCountries();
    }]);

    return function(widget) {
        module.value('widget', widget);
        angular.bootstrap(widget.body, ['AngularLog']);
    };
});
