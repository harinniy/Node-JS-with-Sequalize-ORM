// Application routes

import express from 'express';

import defaultServiceRoutes from 'app/services/default/routes';
let routes = function(app) {
    // user auth login routes
    app.use('/', defaultServiceRoutes);
    // user service routes
}

export default routes;
