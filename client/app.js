angular.module('myApp', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {

            //$locationProvider.html5Mode(true);

            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/', {
                    templateUrl: '/partials/home',
                    controller: 'HomeController'
                });
        }
]);