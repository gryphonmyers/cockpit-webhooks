(function(App, angular) {

    'use strict';

    /**
     * Webhook
     *
     * @class
     */
     var defaults = {
         selectedCollection: {},
         selectedEvent: {},
         httpCallback: "",
         postData: true
     };

    App.module.factory('Webhook', [function WebhookFactory() {
        return Webhook;
    }]);

    function Webhook(opts){
        opts = angular.extend(defaults, opts || {});
        this.selectedEvent = opts.selectedEvent;
        this.selectedCollection = opts.selectedCollection;
        this.httpCallback = opts.httpCallback;
        this.postData = opts.postData;
    }

})(window.App, window.angular);
