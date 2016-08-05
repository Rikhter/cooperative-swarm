module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['main/test/**/*.js']
      }
    },
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

  grunt.registerTask('default', ['mochaTest', 'copy']);
};
