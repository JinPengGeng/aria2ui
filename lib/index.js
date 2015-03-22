var App = require('broadway').App,
	app = new App();

process.title = "aria2ui";

app.log = console;

module.exports = app;