module.exports = (grunt) => {
    require('./grunt/icons')(grunt);
    require('./grunt/packager')(grunt);

    grunt.config.init({
        'packager': {

        }
    });

    grunt.registerTask('default', ['icons', 'packager']);
};