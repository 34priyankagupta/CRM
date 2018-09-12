(function(){
    const app = angular.module("app");

    app.filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        }
    })
}())