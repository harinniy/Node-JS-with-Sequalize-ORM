'use strict';

import express from 'express';
import Helper from 'app/helper';
import api_config from 'app/config/api';
import axios from 'axios';

let router = express.Router();
// default / get route
router.get('/', (req, res) => {
	res.json({
		code: 200,
		message: 'I am alive and listening',
		resources: [
			{
				resource: 'users',
				status: 'in development',
				url: Helper.resource('/users'),
			}

		]
	})
});

module.exports = router
