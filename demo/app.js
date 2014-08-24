'use strict';

angular
    .module('demo', [
        'ngWebsocket',
        'ngWebsocket.directive'
    ])
    .config(function ($websocketProvider) {
        //$websocketProvider.baseUrl('ws://localhost');
    })
    .run(function ($websocket, $rootScope) {
        var ws = $websocket.$new('ws://localhost:12345');

        ws.$on('$message', function (message) {
            console.log('$message');
            console.log(message);
        });

        ws.$on('test', function (message) {
            console.log('test');
            console.log(message);
        });

        ws.$on('$open', function () {
            console.log('Websocket opened');

            ws.$emit('test', {hi: 'dude'})
                .$emit('test', 'asd');
        });

        $rootScope.websocket = ws;
    });