const packager = require('electron-packager');
const { extend, cloneDeep } = require('lodash');
const fs = require('fs');
const path = require('path');
const {rm} = require('shelljs');
const project_root = path.join(__dirname, "..");
const icon_root = path.join(project_root, "icons");
const pkg = JSON.parse(fs.readFileSync(path.join(project_root, 'package.json'), 'utf8'));
const icon = path.join(icon_root, 'arrow-alt-circle-down');
const out_dir = path.join(project_root, 'build');

module.exports = (grunt) => {
    grunt.registerTask("packager", async function () {
        grunt.task.requires("icons");
        let done = this.async();

        if (fs.existsSync(out_dir))
            rm('-rf', out_dir);
        
        let default_options = {
            appCopyright: `Copyright (c) 2018 ${pkg.author}`,
            icon: icon,
            dir: path.join(__dirname, '..'),
            ignore: [ 
                /grunt/g, 
                /icons\/.*\.svg$/g,
                /\.git.*/g,
                /\.npmignore$/g,
                /Gruntfile\.js$/g
            ],
            out: out_dir
        };

        let options = extend(cloneDeep(grunt.config.get("packager")), default_options);
        
        if (options.platform === 'darwin' || options.all || (!options.platform && process.platform === 'darwin')) {
            options.appBundleId = 'com.zacharyrtboyd.aria2ui';
            options.appCategoryType = 'public.app-category.utilities';
        }

        let paths = await packager(options);

        console.log(`created:\n${paths.join("\n")}`);
        done();
    });
};