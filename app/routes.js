
import express from 'express';

import ValidAuthTokenMiddleware from 'app/global/middlewares/ValidAuthToken';
import defaultServiceRoutes from 'app/services/default/routes';
import UsersServiceRoutes from 'app/services/training/routes/common';


let routes = function(app) {
    app.use('/', defaultServiceRoutes);
    app.use('/auth', AuthServiceRoutes);
    // user service routes
    app.use('/users', UsersServiceRoutes);
}

export default routes;
