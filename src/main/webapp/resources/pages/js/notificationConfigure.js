(function () {
    const app = angular.module('app');
    app.config(["NotificationProvider", function (NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 1000,
            startTop: 62,
            startRight: 10,
            verticalSpacing: 62
//            horizontalSpacing: 20
            // positionX: 'rigt',
            // positionY: 'bottom'
        });
    }])
}());