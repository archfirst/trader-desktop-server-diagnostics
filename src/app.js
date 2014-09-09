/* global _ */
'use strict';

angular.module('diagnostics', [ 'ngResource' ]);

angular.module('diagnostics')
    .constant('ServerUrl', 'http://localhost:8080');

angular.module('diagnostics')
    .controller('DiagnosticsController', function ($scope, TraderService) {
        $scope.getUsers = function () {
            $scope.users = TraderService.users();
        };

        $scope.getInstruments = function () {
            $scope.instruments = TraderService.instruments();
        };

        $scope.createOrders = function () {
            var orders = [
                {
                    side: 'Buy',
                    symbol: 'AAPL',
                    quantity: 99.99,
                    limitPrice: 998.99,
                    traderId: 'SS'
                },
                {
                    side: 'Sell',
                    symbol: 'SAPE',
                    quantity: 1314.99,
                    limitPrice: 474.23,
                    traderId: 'SS'
                }
            ];

            _.each(orders, function (order) {
                TraderService.createOrder(null, order);
            });

            $scope.refreshOrders();
        };

        $scope.refreshOrders = function () {
            $scope.orders = TraderService.orders();
        };

        $scope.clearOrders = function () {
            TraderService.clearOrders(function () {
                $scope.refreshOrders();
            });
        };
    });


angular.module('diagnostics')
    .factory('TraderService', function ($resource, ServerUrl) {

        return $resource(ServerUrl + '/rest/:type', null, {
            users: {
                method: 'GET',
                params: { type: 'users' },
                isArray: true
            },
            instruments: {
                method: 'GET',
                params: { type: 'instruments' },
                isArray: true
            },

            orders: {
                method: 'GET',
                params: { type: 'orders'},
                isArray: true
            },

            createOrder: {
                method: 'POST',
                params: { type: 'orders'}
            },

            clearOrders: {
                method: 'DELETE',
                params: { type: 'orders' }
            }
        });

    });