module.exports = (grunt) => {
    require('./grunt/icons')(grunt);
    require('./grunt/packager')(grunt);
    require('./grunt/zipper')(grunt);

    grunt.config.init({
        'packager': {

        }
    });

    grunt.registerTask('build', ['icons', 'packager']);
    grunt.registerTask('build-all', ['icons', 'packager:all']);
    grunt.registerTask('dist', ['build-all', 'zipper']);
    grunt.registerTask('default', ['build']);
};