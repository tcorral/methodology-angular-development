/**
 * @file Directive for use with AngularJS.
 *
 * @copyright Copyright 2015 by Backbase - All rights reserved
 *
 * @author Backbase
 * @version 0.1
 */

(function() {
  "use strict";

  // @formatter:off
  var dependencies = [
    "angular"
  ];
  // @formatter:on

  define(dependencies, function(angular) {

    /**
     * @name select
     * Templating directive:
     * Select
     */
    function implementation() {
      return {
        restrict: "E",
        link: function(scope) {
          console.log("initialized select with scope:", scope);
        },
        templateUrl: '/portalserver/static/hellobundle/directives/select/select.html',
        replace: true
      };
    }

    // @formatter:off
    angular
      .module("directive.widget.select", [])
      .directive("angularSelect", implementation);
    // @formatter:on
  });
})();
