<?php
$app->on('admin.init', function() use ($app) {
    $app->bindClass('Webhooks\\Controller\\Webhooks', 'webhooks');
    $app->on('app.layout.header', function() {
        echo $this->assets(["webhooks:assets/js/admin.js"]);
    });
    // Menu item
    $app('admin')->menu('top', [
        'url'    => $app->routeUrl('/webhooks'),
        'label'  => '<i class="uk-icon-globe"></i>',
        'title'  => "Webhooks",
        'active' => (strpos($this['route'], '/webhooks') === 0)
    ], -1);
});
?>
