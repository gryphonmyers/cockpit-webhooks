<?php

namespace Webhooks\Controller;

/**
 * Base module controller
 */
class Webhooks extends \Cockpit\Controller {
    public function index()
    {
        $locales = $this->app->db->getKey("cockpit/settings", "cockpit.locales", []);

        // data: name, sortfield, sortorder, slug, _id
        return $this->render('webhooks:views/index.php', [
            'locales'      => $locales
        ]);
    }
}


?>
