/**
 * @file Directive for use with AngularJS.
 *
 * @copyright Copyright 2015 by Backbase - All rights reserved
 *
 * @author Backbase
 * @version 0.1
 */
define(['angular'], function(angular) {
    'use strict';

    var module = angular.module("directive.widget.select", []);

    /**
     * @name select
     * Templating directive:
     * Select
    */
    module.directive("angularSelect", [function() {
        return {
            restrict: "E",
            link: function(scope) {
                console.log("initialized select with scope:", scope);
            },
            templateUrl: '/portalserver/static/angularbundle/directives/select/select.html',
            replace: true
        };
    }]);

    return module;
});
