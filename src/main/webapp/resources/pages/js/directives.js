(function () {
    var app = angular.module('app');

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
            restrict: "C",
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
                    console.log("added");
                })
            }
        };
    }]);

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