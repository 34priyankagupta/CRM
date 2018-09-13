(function () {
    var app = angular.module("app");

    app.config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("main", {
                    url: "",
                    views: {
                        'mainCover': {
                            templateUrl: 'resources/pages/customer-main.html'
                        }
                    }
                })
                .state("root", {
                    url: "/",
                    controller: "mainRootController"
                })
                .state("customerLayout", {
                    views: {
                        '': {
                            templateUrl: 'resources/pages/customer-layout.html'
                        }
                    }
                })
                .state("customerList", {
                    parent: 'customerLayout',
                    url: '/customers',
                    views: {
                        'customerList': {
                            controller: 'customerListController',
                            templateUrl: 'resources/pages/customerList.html'
                        }
                    }
                })
                .state("addCustomer", {
                    parent: 'customerLayout',
                    url: '/addCustomer',
                    views: {
                        'addCustomer': {
                            controller: 'addCustomerController',
                            templateUrl: 'resources/pages/addCustomer.html'
                        }
                    }
                })
                .state("about", {
                    parent: "customerLayout",
                    url: '/about',
                    views: {
                        'about': {
                            templateUrl: 'resources/pages/about.html'
                        }
                    }
                })

            // $urlRouterProvider.otherwise("/customers");
        }
    ])
}());