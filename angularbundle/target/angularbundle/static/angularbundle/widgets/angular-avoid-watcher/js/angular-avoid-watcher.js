(function() {
  "use strict";

  // @formatter:off
  var dependencies = [
    "angular",
    "angular-widget-factory"
  ];
  // @formatter:on

  define(dependencies, function(angular) {

    var module = angular.module('angularAvoidWatch', ['factory']);

    // Controller 1
    module.controller('Controller1', Controller1);

    // how to use $inject
    Controller1.$inject = ['mediator'];

    function Controller1(mediator){
      this.variable1 = mediator.obj;
    }

    // Controller2
    function Controller2(mediator){
      this.variable2 = mediator.obj;
    }

    Controller2.$inject = ['mediator'];

    module.controller('Controller2', Controller2);

    return function(widget) {
      module.value("widget", widget);
      angular.bootstrap(widget.body,["angularAvoidWatch"]);
    };
  });
})();