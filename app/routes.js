
import express from 'express';

import ValidAuthTokenMiddleware from 'app/global/middlewares/ValidAuthToken';
import defaultServiceRoutes from 'app/services/default/routes';


let routes = function(app) {
    app.use('/', defaultServiceRoutes);
    // user service routes
}

export default routes;
