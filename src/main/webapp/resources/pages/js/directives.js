(function () {
    const app = angular.module('app');

    app.directive("mainSpinner", function () {
        return {
            restrict: "AEC",
            templateUrl: 'resources/pages/spinner.html'
        }
    })

    app.directive('ngFiles', ['$parse', function ($parse) {

        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, {
                    $files: event.target.files
                });
            });
        };

        return {
            link: fn_link
        }
    }])

    app.directive("flexDropdownHead", ["$document", function ($document) {
        return {
            restrict: 'C',
            link: function (scope, elem, attr) {
                elem.bind('click', function () {
                    elem.toggleClass('nowShowDropdown');
                });
            }
        }
    }]);

    app.directive("navButton", ["$document", function ($document) {
        return {
            restrict: 'C',
            link: function (scope, elem, attr) {

                elem.bind("click", function () {
                    if (!elem.hasClass('active')) {
                        elem.addClass('active');
                    }

                    $document.bind("click", function () {
                        if (elem.hasClass('active')) {
                            elem.removeClass('active');
                        }
                    })

                })
            }
        };
    }]);


    app.directive('progressfile', ["$document", function ($document) {

        return {
            restrict: 'C',
            link: function (scope, element, attr) {
                element.bind('click', function () {
                    if (!element.hasClass("progress")) {
                        element.addClass("progress");
                    }
                })
            }
        };

    }]);

    app.directive('customerDetails', function(){
        console.log("inside customer list");
        return {
            restrict: 'E',
            scope: {
                info: "=obj"
            },
            templateUrl: 'resources/pages/customerDetail.html'
        }
    })

    // app.directive("foundError", function(){
    //     return {
    //         restrict: "A",
    //         scope: {
    //             info: "=error"
    //         },
    //         template: "<label><em>{{info.r.data.Message}}</em></label>"
    //     }
    // });


}());