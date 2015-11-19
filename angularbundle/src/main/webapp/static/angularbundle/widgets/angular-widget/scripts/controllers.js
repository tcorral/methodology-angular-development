define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.PersonController = function () {
        var viewModel = this;
        viewModel.name = 'John';
        viewModel.lastName = 'Doe';
    };

    /*
     * @ngInject
     */
    exports.CountryController = function (CountriesFactory) {
        var viewModel = this;

        viewModel.getCountries = function () {
            CountriesFactory
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

    /*
     * @ngInject
     */
    exports.SomeController = function (MediatorFactory) {
        var viewModel = this;
        viewModel.variable1 = MediatorFactory.obj;
    };

    /*
     * @ngInject
     */
    exports.AnotherController = function (CountriesFactory) {
        var viewModel = this;
        viewModel.variable2 = MediatorFactory.obj;
    };
});