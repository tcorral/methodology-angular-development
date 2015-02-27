define(['angular'], function(angular) {
    'use strict';

    var module = angular.module('DataStore', [])

    module.factory('MediatorFactory', [function() {
        return {
            obj: {
                value: ''
            }
        };
    }]);

    return module;
});
