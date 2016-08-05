module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['main/test/**/*.js']
      }
    },
    clean: ['dist/*'],
    copy: {
      main: {
        expand: true,
        flatten: true,
        src: [
          'main/src/**',
          'main/node_modules/ModuleResolver/src/ModuleResolver.js'
        ],
        dest: 'dist/',
        filter: 'isFile'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['mochaTest', 'clean', 'copy']);
};
