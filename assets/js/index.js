/**
 * Webhooks Controller
 *
 */
(function($, angular, App) {
    /**
     * WebhooksController
     * @class
     */
    App.module
        .config(['$interpolateProvider', function($interpolateProvider){
            //Set the interpolate provider to prevent conflict with Lexy in view
            $interpolateProvider.startSymbol("#{");
            $interpolateProvider.endSymbol("}");
        }])
        .controller('webhooksController', [
            '$scope', '$http', 'Webhook', 'webhookService',
            function($scope, $http, Webhook, webhookService) {
                $scope.events = Object.keys(App._events);
                $scope.collections = null;
                $scope.webhookService = webhookService;

                $scope.getCollectionById = function(id) {
                    for(var i = 0; i < $scope.collections.length; i++) {
                        if (id == $scope.collections[i]["_id"]) {
                            return $scope.collections[i];
                        }
                    }
                    return null;
                };

                $scope.addWebhook = function(){
                    var webhook = new Webhook({
                        selectedCollection: $scope.collections[0],
                        selectedEvent: $scope.events[0]
                    });
                    $scope.webhookService.webhooks.push(webhook);
                };

                $scope.clearWebhooks = function() {
                    App.Ui.confirm(App.i18n.get("Are you sure?"), function(){
                        $scope.webhookService.webhooks.forEach(function(webhook, i){
                            if (webhook["_id"]) {
                                $http.post(App.route("/api/datastore/removeentry"), {
                                        "table": {
                                            _id: $scope.webhookService.tableID
                                        },
                                        "entryId": webhook["_id"]
                                    }, {responseType:"json"}).success(function(data){
                                        $scope.webhookService.webhooks = [];
                                        App.notify(App.i18n.get("Entry removed"), "success");
                                    });
                            }
                        });
                    });
                };

                $scope.submitForm = function(form){
                    if(form.$valid) {
                        if ($scope.webhookService.webhooks.length) {
                            $scope.webhookService.webhooks.forEach(function(webhook, i){
                                $http.post(App.route('/api/datastore/saveentry'), {
                                            table: {
                                                _id: $scope.webhookService.tableID
                                            },
                                            entry: webhook
                                        },{
                                            responseType: 'json'
                                        }
                                    )
                                    .success(function(data) {
                                        if (i == $scope.webhookService.webhooks.length - 1) {
                                            App.notify("Webhooks saved.", "success");
                                        }
                                    })
                                    .error(App.module.callbacks.error.http);
                            });
                        }
                    } else {
                        App.notify("Not saved - make sure all fields are completed.");
                    }
                };

                $http.post(App.route('/api/collections/find'),
                        {},
                        {
                            responseType: 'json'
                        }
                    )
                    .success(function(data) {
                        $scope.collections = data;
                        $scope.selectedCollection = $scope.collections[0];
                    })
                    .error(App.module.callbacks.error.http);
            }
        ]);
})(window.jQuery, window.angular, window.App);
