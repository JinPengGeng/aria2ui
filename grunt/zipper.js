
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');
const { mkdir, ls, rm } = require('shelljs');
const project_root = path.join(__dirname, "..");
const dist_root = path.join(project_root, 'dist');
const build_root = path.join(project_root, 'build');

module.exports = (grunt) => {
    grunt.registerTask("zipper", function () {
        grunt.task.requires("packager:all");

        mkdir('-p', dist_root);

        let folders = ls(build_root);
        for (let folder of folders) {
            const zip = new AdmZip();
            
            zip.addLocalFolder(path.join(build_root, folder));
            let zip_name = `${folder}.zip`;
            let zip_path = path.join(dist_root, zip_name);
            zip.writeZip(zip_path);
            console.log(`wrote: ${zip_path}`)
        }
    });
};