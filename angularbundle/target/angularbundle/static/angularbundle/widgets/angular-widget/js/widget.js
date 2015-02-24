(function() {
  "use strict";

  // @formatter:off
  var dependencies = [
    "angular",
    "angular-widget-factory",
    "countries-factory",
    "select"
  ];
  // @formatter:on

  define(dependencies, function(angular) {

    var module = angular.module('angularWidget', ['factory','countriesFactory','directive.widget.select']);
    // Example to avoid $scope Person
    module.controller('PersonController', PersonController);

    function PersonController(){
      var vm = this;
      vm.name = 'Christian';
      vm.lastName = 'Baldinato';
    };

    // Example to consume a factory Country
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

    // Simple example to avoid using a watch
    // Controller 1

    module.controller('Controller1', Controller1);

    Controller1.$inject = ['mediator'];

    // how to use $inject
    function Controller1(mediator){
      this.variable1 = mediator.obj;
    }

    // Controller2

    function Controller2(mediator){
      this.variable2 = mediator.obj;
    }

    Controller2.$inject = ['mediator'];

    module.controller('Controller2', Controller2);
    // end of example

//    module.controller("controller1", ["mediator", function(mediator) {
//
//
//    }])
//
//    .controller("controller2", ["mediator", function(mediator) {
//
//      this.variable2 = mediator.obj;
//    }])
//    .controller("controller3", ["mediator", function(mediator) {
//
//      this.variable3 = mediator.obj;
//    }]);

    return function(widget) {
      module.value("widget", widget);
      angular.bootstrap(widget.body,["angularWidget"]);
    };
  });
})();