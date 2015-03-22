var App = require('broadway').App,
	app = new App();

app.log = console;

app.use(require('./server'));
app.init(function (){});

module.exports = app;