(function () {
    const app = angular.module('app');

    app.directive("mainSpinner", function () {
        return {
            restrict: "AEC",
            templateUrl: 'resources/pages/spinner.html'
        }
    })

    // app.directive('ngFiles', ['$parse', function ($parse) {

    //     function fn_link(scope, element, attrs) {
    //         var onChange = $parse(attrs.ngFiles);
    //         console.log("1.  onchane internal function: ",onChange);
    //         element.on('change', function (event) {
    //             console.log("event captured: ",event);
    //             onChange(scope, {
    //                 $files: event.target.files
    //             });
    //         });
    //         console.log("2.   onchane internal function: ",onChange);
    //     };

    //     return {
    //         link: fn_link
    //     }
    // }])

    app.directive('ngFiles', ['$parse', function ($parse) {

        function fn_link(scope, element, attrs) {
            // console.log("ngFiles",ngFiles);
            console.log("attrs", attrs);
            console.log("attrs.ngFiles", attrs.ngFiles);
            var fileAdd = $parse(attrs.ngFiles);
            console.log("attrs.ngFiles after $parse", fileAdd);
            element.on('change', function (event) {
                console.log("event.target: ", event.target.files[0]);
                fileAdd(scope, {
                    files: event.target.files
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

    app.directive('customerDetails', function () {
        return {
            restrict: 'E',
            scope: {
                info: "=obj"
            },
            templateUrl: 'resources/pages/customerDetail.html'
        }
    })

    // app.directive("documentModel", function(){
    //     return{
            
    //     }
    // });

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