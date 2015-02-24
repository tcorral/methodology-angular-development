(function() {
    "use strict";

    // @formatter:off
    var dependencies = [
        "angular",
        "countries-factory"
    ];
    // @formatter:on

    define(dependencies, function(angular) {

        var module = angular.module('angularConsumeFactory', ['countriesFactory']);

        module.controller('CountryController', CountryController);

        CountryController.$inject = ['countries'];

        function CountryController(countries){

            var vm = this;

            getCountries();

            function getCountries() {
                return countries.getCountries()
                    .then(function(data) {
                        vm.countries = data;
                        return vm.countries;
                    });
            }
        }

        return function(widget) {
            module.value("widget", widget);
            angular.bootstrap(widget.body,["angularConsumeFactory"]);
        };
    });
})();