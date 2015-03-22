var shelljs = require('shelljs'),
	osenv = require('osenv'),
	path = require('path'),
	os = require('os'),
	fs = require('fs');

var plugin = {
	init: function (done) { var app = this;
		var config_dir_path = (path.join(osenv.home(), '.aria2'));
		var	config_path = path.join(config_dir_path, 'aria2c.conf');
		if (!fs.existsSync(config_path)) {
			shelljs.mkdir('-p', config_dir_path);
			fs.writeFileSync(config_path, '');
		}

		if (os.platform() === 'win32') {
			var bin_dir = path.join(__dirname, '..', 'bin');
			app.aria2c_options.location = path.join(bin_dir, 'aria2-'+(
				os.arch() === 'x64' ? '64' : '32'
			),'aria2c.exe');
		}

		var cmd_string = [ app.aria2c_options.location, 
			'--stop-with-process='+app.pid,
			' --enable-rpc',
			'--conf-path='+config_path,
			'--dir='+osenv.home()
		].concat(app.argv.slice(0)).join(' ');
		
		try {
			
			app.aria2_process = shelljs.exec(cmd_string,
				{ async: true, silent: false },
				function (code, output) {
					aria2.close();
				}
			);
			app.aria2_id = app.aria2_process.id;
		}
		catch (error) {
			global.console.log(error)
		}
		
		app.once('aria2.onopen', done);
		app.once('aria2.onclose', process.exit);
		var Aria2 = require('aria2');
		var aria2 = new Aria2();
		
		aria2.onopen = function () {
			app.emit('aria2.onopen');
		};

		aria2.open();

		app.aria2 = aria2; 
		[]
			.concat(Aria2.methods)
			.concat(Aria2.notifications)
			.concat(Aria2.events)
		.forEach(function(event){
			app.on('aria2.'+event, app.aria2[event]);
		});
	},
	attach: function (options) { var app = this;
		app.aria2c_options = options;
	}
};

module.exports = plugin;