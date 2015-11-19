define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.CountryController = function (CountriesFactory) {
        var viewModel = this;

        $log.info('$log demo...');

        viewModel.getCountries = function () {
            CountriesFactory
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
    };
});