var _ = require('underscore')
    , User = require('../models/User.js')
    , userRoles = require('../../client/js/routingConfig').userRoles;

module.exports = {
	index: function (req, res) {
		var users = User.findAll();
		_.each(users, function (user) {
			delete user.password;
			delete user.facebook;
            delete user.google;
		});
		res.json(users);
	},

	random_question: function (req, res) {
		res.json({message: 'Hello question'});
	}


}