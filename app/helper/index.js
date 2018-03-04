'use strict';

import config_server from '../config/server';
import path from 'path';

let Default = {
	resource( path ) {
		return `${config_server.HOST}${config_server.PORT ? `:${config_server.PORT}` : ''}${path}`;
	}
}
export default Default;
