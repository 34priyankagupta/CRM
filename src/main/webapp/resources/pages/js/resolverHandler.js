(function () {
    const app = angular.module('app');
    app.run(["$rootScope", function ($rootScope) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                console.log("in $stateChangeStart");
                if (toState.resolve) {
                    $rootScope.stateChangingStart = true;
                }
            });
        $rootScope.$on("$stateChangeSuccess",
            function (e, toState, toParams, fromState, fromParams) {
                console.log("in $stateChangeSuccess");
                if (toState.resolve) {
                    $rootScope.stateChangingStart = false;
                }
            })
    }])


    // testing

    // app.run(function ($trace) {
    //     console.log("testing transition!!!!!");
    //     $trace.enable('TRANSITION');
    // })
}());
