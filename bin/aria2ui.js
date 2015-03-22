#!/usr/bin/env node

var path = require('path'),
	fs = require('fs');

(require('shelljs/global'))

var base_path = path.join(path.dirname(fs.realpathSync(__filename)), '..');
var nw = path.join(base_path, 'node_modules', '.bin', 'nw');

exec(nw+' '+base_path, { async: false, silent: false }, function (code, output) {});