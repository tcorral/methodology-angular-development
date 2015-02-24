(function() {
    "use strict";

    // @formatter:off
    var dependencies = [
        "angular"
    ];
    // @formatter:on

    define(dependencies, function(angular) {

        var module = angular.module('angularControllerAs', []);
        // Example Controller As
        module.controller('PersonController', PersonController);

        function PersonController(){
            var vm = this;
            vm.name = 'Name';
            vm.lastName = 'Lastname';
        };

        return function(widget) {
            module.value("widget", widget);
            angular.bootstrap(widget.body,["angularControllerAs"]);
        };
    });
})();