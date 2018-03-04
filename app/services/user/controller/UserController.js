'use strict';

import UserTransformer from 'app/services/user/transformer/UserTransformer';
var sequalizeDB = require("../../../global/database");
var User = sequalizeDB.User;

class userController {

	static findById(id, callback) {

		User.find({ where: { id: id } }).success(function (user) {
			callback(null, user);
		}.error(function (err) {
			callback(err);
		}));
	}
	static findOne(options, callback) {

		User.find({ where: { id: id } }).success(function (user) {
			callback(null, user);
		}.error(function (err) {
			callback(err);
		}));
	}

	static registerDefault(user, callback) {
		if (!user.name || !user.email || !user.password || !user.verify_password) {
			callback('invalid data provided');
			return;
		} else {
			User.find({ 'email': user.email }, (error, existing_user) => {
				if (existing_user.length != 0) {
					callback('User with this email address already exists.');
				} else {
					let newUser = new User({
						provider: 'default',
						name: user.name,
						email: user.email,
						password: user.password,
						phone: user.phone,
						status: 1,
					});
					newUser.save((error, new_user) => {
						if (error) {
							callback(error);
						}
						callback(null, UserTransformer.transform(new_user));
						Email.welcome(new_user);// send welcome email to user
						return UserTransformer.transform(new_user);
					});
				}
			});
		}
	}
	static registerSocial(user, callback) {

		User.findOne({ 'email': user.email }, (error, existing_user) => {
			if (existing_user) {
				callback(null, UserTransformer.transform(existing_user));
			} else {
				let newUser = new User({
					provider: user.provider,
					name: user.name,
					email: user.email,
					profile_picture: user.profile_picture,
					email_verified: true,
					status: 1,
					social: user.meta,
				});
				newUser.save((error, new_user) => {
					// if (error) {}
					callback(null, UserTransformer.transform(new_user));
					Email.welcome(new_user);
					return UserTransformer.transform(new_user);
				});
			}
		});
	}
	static resetPassword(email, callback) {

		User.findOne({ 'email': email }, (error, found_user) => {
			if (found_user) {

				let password = Math.random().toString(36).slice(2);
				found_user.password = password;

				found_user.save(function (err) {
					if (err) {
						callback('error occoured while updating record');
					} else {
						callback(null, 'done');
						Email.password_reset(found_user, password);
					}
				});
				// callback( null, 'done' );
			} else {
				callback('invalid email provided');
			}
		});
	}
	static update(id, data, callback) {
		User.findById(id, (error, user) => {
			if (user) {
				if (data.name) { user.name = data.name; }
				// if ( data.email ) { user.email = data.email; }
				if (data.gender) { user.gender = data.gender; }
				if (data.birthday) { user.birthday = data.birthday; }
				if (data.phone) { user.phone = data.phone; }
				if (data.type && data.type < 3) { user.type = data.type; }

				if (data.profile_picture) { user.profile_picture = data.profile_picture; }



				user.save(function (err, updated_user) {
					if (err) {
						callback('error occoured while updating record');
					} else {
						callback(null, updated_user);
					}
				});

			} else {
				callback('user not found');
			}
		});
	}
}

export default userController;