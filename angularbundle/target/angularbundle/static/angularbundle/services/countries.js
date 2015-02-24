(function() {
  "use strict";

  // @formatter:off
  var dependencies = [
    "angular"
  ];
  // @formatter:on

  define("countries-factory", dependencies, function(angular) {
    angular
      .module('countriesFactory',[])
      .factory('countries', countries);

      countries.$inject = ['$http'];

      function countries($http) {
        return {
            getCountries: getCountries
        };

        function getCountries() {
            return $http.get('http://restcountries.eu/rest/v1/all')
                .then(getCountriesComplete)
                .catch(getCountriesFailed);

            function getCountriesComplete(response) {
                return response.data;
            }

            function getCountriesFailed(error) {
                // logger.error('XHR Failed for getCountries.' + error.data);
            }
        }
      }
  });
})();