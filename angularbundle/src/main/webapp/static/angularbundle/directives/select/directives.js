define(function (require, exports, module) {
    'use strict';

    /*
     * @ngInject
     */
    exports.abSelect = function ($log) {
        var getTemplate = function() {
            return [
                '<div>' +
                '   <p ng-if="!viewModel.countries">loading countries list...</p>' +
                '   <select class="form-control" ng-model="countrySelector" ng-options="country.name for country in viewModel.countries" ng-if="viewModel.countries">' +
                '       <option ng-disabled="true" ng-selected="true" value="">Select a country...</option>' +
                '   </select>' +
                '</div>'
            ].join('');
        };
        return {
            restrict: 'E',
            link: function (scope) {
                $log.info('initialized select with scope:', scope);
            },
            template: getTemplate(),
            replace: true
        };
    };
});