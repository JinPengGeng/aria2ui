var portfinder = require('portfinder'),
	path = require('path'),
	express = require('express');

var plugin = {
	init: function (done) {
		var app = this;
		
		app.web.listen(app.port, function (err){
			if (err){
				app.log.error(err.toString());
				app.emit('init:error', err);
			} else {
				app.log.info('listening on port '+port)
			}
			done();
		});
	},
	attach: function (options) { options = options || { port: 5000 };
		var app = this;
		app.port = options.port;
		app.web = express();
		var dir = path.join(__dirname, '..', 'webui-aria2');
		app.web.use(express.static(dir));
	}
};

module.exports = plugin;