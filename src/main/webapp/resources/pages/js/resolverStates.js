(function () {
    const app = angular.module("app");

    app.config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("deleteCustomer", {
                    url: "/deleteCustomer/:id",
                    controller: "deleteCustomerController",
                    resolve: {
                        deleteCustomerResolver: function ($stateParams, customerFactory, $state, Notification) {
                            const id = $stateParams.id;
                            var a = confirm("Are you sure that you want to delete this customer permanently?");
                            if (a)
                                return customerFactory.deleteCustomer(id);
                            else{                                
                                $state.go("customerList");
                            }
                        }
                    }
                })
                .state("updateCustomer", {
                    parent: 'customerLayout',
                    url: "/updateCustomer/:id",
                    views: {
                        'updateCustomer': {
                            controller: "updateCustomerController",
                            templateUrl: 'resources/pages/updateCustomer.html'
                        }
                    },
                    resolve: {
                        detailCustomerResolver: function ($stateParams, customerFactory) {
                            const id = $stateParams.id;
                            console.log("in resolver", customerFactory.getCustomer(id));
                            return customerFactory.getCustomer(id);
                        }
                    }
                })
        }
    ])
}())