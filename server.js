'use strict';

import 'app-module-path/register';
import { addPath } from 'app-module-path';
addPath(__dirname);
import path from 'path';
import config_server from 'app/config/server';
import AppRoutes from 'app/routes';
import AppMiddleware from 'app/middleware';
import express from 'express';
import winston from 'winston'
import swagger from 'app/swagger';
import models from "./models";
let app = express();
app.use(express.static(path.join(__dirname, 'public')));
//---------------------------------------------//
// invoke routes, MIddleware, Mongo connect here
new AppMiddleware(app);
new AppRoutes(app, express);
new swagger(app);

//Sync Database
models.sequelize.sync({
    force : false,
    logging : console.log
}).then(function () {
    console.log('Nice! Database looks fine')

}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

//---------------------------------------------//
let server = app.listen(
    app.get('port'),
    () => {
        const port = process.env.port || server.address().port;
        winston.log('info', `GenNext API running at http://localhost:${port}`)
        console.log('runing...')
    }
);
export default app;
