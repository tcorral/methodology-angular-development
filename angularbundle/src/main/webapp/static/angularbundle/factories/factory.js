define(['angular'], function(angular) {
    'use strict';

    var module = angular.module('WidgetFactory', [])

    module.factory('Mediator', [function() {
        return {
            obj: {
                value: ""
            }
        };
    }]);

    return module;
});
