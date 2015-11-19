define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.CountryController = function (CountriesFactory) {
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
    };
});