define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.CountriesFactory = function ($http) {
        function _getCountries() {
            return $http.get('http://restcountries.eu/rest/v1/all');
        }

        return {
            getCountries: _getCountries
        };
    };
});