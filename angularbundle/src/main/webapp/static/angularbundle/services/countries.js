define(['angular'], function(angular) {
    'use strict';

    var module = angular.module('CountriesService', [])

    module.factory('CountriesFactory', ['$http', function($http) {

        function _getCountries() {
            return $http.get('http://restcountries.eu/rest/v1/all');
        }

        return {
            getCountries: _getCountries
        };

    }]);

    return module;
});
