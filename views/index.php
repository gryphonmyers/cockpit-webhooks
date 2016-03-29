<?php
/**
 * Main view
 */
?>
@start('header')
    {{ $app->assets(['webhooks:assets/js/Webhook.factory.js']) }}
    {{ $app->assets(['webhooks:assets/js/index.js']) }}
@end('header')

<div ng-controller="webhooksController">
    <nav class="uk-navbar">
        <span class="uk-hidden-small uk-navbar-brand">Webhooks</span>
    </nav>

    <form name="webhookForm" class="uk-form" ng-submit="submitForm(webhookForm)">
        <div class="uk-grid">
            <div class="uk-width-medium-1-1">
                <div class="app-panel">
                    <div ng-show="webhookService.webhooks" class="uk-form-row">
                        <div ng-show="webhookService.webhooks.length">
                            <table class="uk-table uk-table-striped">
                                <thead>
                                    <tr>
                                        <th width="10%">Collection</th>
                                        <th width="10%">Event</th>
                                        <th>Endpoint</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="webhook in webhookService.webhooks">
                                        <td>
                                            <div class="uk-form-controls">
                                                <select ng-model="webhook.selectedCollection" required="required"
                                                    ng-options="collection as collection.name for collection in collections track by collection._id">
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="uk-form-controls">
                                                <select ng-model="webhook.selectedEvent" required="required"
                                                    ng-options="eventName for eventName in events">
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="uk-form-controls">
                                                <input style="width:100%;" type="text" ng-model="webhook.httpCallback">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div ng-show="!webhookService.webhooks.length">
                            <span class="uk-text-large">You have no saved webhooks.</span>
                        </div>
                    </div>
                    <div ng-show="webhookService.webhooks" class="uk-form-row">
                        <div class="uk-form-controls">
                            <button type="button" class="uk-button uk-button-success" ng-click="addWebhook()">
                                <i class="uk-icon-plus-circle"></i>
                            </button>
                            <button type="submit" class="uk-button uk-button-primary">Save</button>
                            <button type="button" class="uk-button uk-button-danger" ng-click="clearWebhooks()">Clear</button>
                        </div>
                    </div>
                    <div ng-if="webhookService.webhooks && !collections.length" class="uk-alert-warning uk-alert-large">
                        <h2>@lang('import.title.No collections')</h2>
                        <p>
                            <a href="@route('collections/collection')">@lang('import.title.Click here to create one')</a>
                        </p>
                    </div>
                    <div ng-if="!webhookService.webhooks" class="uk-icon-spin"></div>
                </div>
            </div>
        </div>
    </form>

    </select>
</div>
