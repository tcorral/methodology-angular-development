(function() {
    "use strict";

    // @formatter:off
    var dependencies = [
        "angular",
        "angular-logX"
    ];
    // @formatter:on

    define(dependencies, function(angular,logX) {

        console.log(logX);

        var module = angular.module('angularLogX', []);
        // Example --- logX
        module.controller('PersonControllerLog', PersonControllerLog);

        // PersonControllerLog.$inject = ['$log'];

        function PersonControllerLog(){

            // $log = $log.getInstance( "PersonControllerLog", "color:#c44550; font-size:1.2em; background-color:#d3ebaa;" );

            var vm = this;
            vm.name = 'Name';
            vm.lastName = 'Lastname';
        };

        return function(widget) {
            module.value("widget", widget);
            angular.bootstrap(widget.body,["angularLogX"]);
        };
    });
})();