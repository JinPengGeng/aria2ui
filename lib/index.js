var App = require('broadway').App,
	app = new App();

process.title = "Aria2";

app.log = console;

module.exports = app;