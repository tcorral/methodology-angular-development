(function() {
  "use strict";

  // @formatter:off
  var dependencies = [
      "angular"
  ];
  // @formatter:on

  define("angular-widget-factory", dependencies, function(angular) {

    angular.module('factory', []).factory("mediator", mediator);

    function mediator(){
      return {
        obj: {
          value: ""
        }
      };
    };
  });
})();