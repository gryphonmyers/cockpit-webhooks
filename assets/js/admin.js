(function($, angular, App) {
    App.module
        .service('webhookService', ['$http', function($http){
            var webhookService = {
                webhooks : [],
                tableID : '',
                showNotifications: true
            };
            function getWebhooks(){
                $http.post(App.route('/api/datastore/entries'),{
                            table: {
                                _id: webhookService.tableID
                            }
                        },{
                            responseType: 'json'
                        }
                    )
                    .success(function(data) {
                        if (data) {
                            angular.copy(data, webhookService.webhooks);
                        } else {
                            App.notify("Failed to get webhooks. Try again.", "error");
                        }
                    })
                    .error(App.module.callbacks.error.http);
            }
            (function getWebhooksTableID(){
                $http.post(App.route('/api/datastore/findOne'),{
                            name: "webhooks"
                        },{
                            responseType: 'json'
                        }
                    )
                    .success(function(data) {
                        if (!Object.keys(data).length) {
                            //WEBHOOKS TABLE DOESN'T EXIST, SO WE NEED TO CREATE IT
                            $http.post(App.route('/api/datastore/save'), {
                                        table: {
                                            name: "webhooks"
                                        }
                                    }, {
                                        responseType: 'json'
                                    }
                                )
                                .success(function(data) {
                                    webhookService.tableID = data["_id"];
                                    getWebhooks();
                                })
                                .error(App.module.callbacks.error.http);
                        } else {
                            webhookService.tableID = data["_id"];
                            getWebhooks();
                        }
                    })
                    .error(App.module.callbacks.error.http);
            })();
            return webhookService;
        }])
        .run(['webhookService', '$http', function(webhookService, $http){
            App.on("entry.save", function(e){
                hitEndpoints("entry.save", e);
            });

            App.on("entry.remove", function(e){
                hitEndpoints("entry.remove", e);
            });

            function hitEndpoints(eventName, e){
                webhookService.webhooks.filter(function(webhook){
                    return webhook.selectedEvent == eventName && webhook.selectedCollection._id == e.params.collection._id;
                }).forEach(function(webhook){
                    if (webhook.httpCallback) {
                        var payload = webhook.postData ? e.params : null;
                        $http.post(webhook.httpCallback, payload)
                            .success(function(){
                                if (webhookService.showNotifications) {
                                    App.notify("Successfully posted to: " + webhook.httpCallback, "success");
                                }
                            })
                            .error(App.module.callbacks.error.http);
                    }
                });
            }
        }]);
})(window.jQuery, window.angular, window.App);
