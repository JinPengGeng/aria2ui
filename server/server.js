var portfinder = require('portfinder'),
	express = require('express');

var plugin = {
	init: function (done) {
		var app = this;
		
		app.once('port', function (port) {
			app.web_port = port;
			app.web.listen(port, function (err){
				if (err)
					app.log.error(err.toString());
				done();
			});
		});
	},
	attach: function (options) {
		var app = this;

		app.web = express();
		app.web.use(express.static(process.cwd()));
	}
};

module.exports = plugin;