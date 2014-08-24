'use strict';

angular
    .module('ngWebsocket.directive', [
        'ngWebsocket'
    ])
    .directive('ngWebsocket', function ($websocket) {
        return {
            restrict: 'A',
            scope: {
                data: '=ngWebsocket',
                model: '=ngModel'
            },
            link: function (scope, element, attrs) {
                var ws = scope.data.websocket,
                    url = scope.data.url,
                    event = scope.data.event,
                    fromServer = false;

                if (typeof event === 'undefined') throw new Error('[ngWebSocket]: directive needs an event (String)');
                if (typeof url === 'undefined' && typeof ws === 'undefined') throw new Error('[ngWebSocket]: directive needs a valid websocket ($websocket) or url (String)');
                if (typeof attrs.ngModel === 'undefined') throw new Error('[ngWebSocket]: directive needs an ng-model associated');

                if (typeof url === 'string' && url.length > 0) {
                    ws = $websocket.$new(url);

                    // TODO: setup onerror, onopen handlers
                }

                // Incoming updates
                ws.$on(event, function (data) {
                    scope.model = data;
                    fromServer = true;
                    scope.$apply('ngModel');
                });

                // Outgoing updates
                scope.$watch('model', function (newModel) {
                    if (typeof newModel !== 'undefined' && !fromServer) ws.$emit(event, newModel);

                    fromServer = false;
                });
            }
        };
    });