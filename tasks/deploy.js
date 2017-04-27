/*
Converts html files to php, deletes html files and copies build directory to server
*/

var shell = require("shelljs");
module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-sync");

  grunt.config.merge({
    // Task that copies 'build' directory to the staging/production server
    sync: {
      staging: {
        files: [
          { expand: true, cwd: 'build/', src: ['**'], dest: process.env.STAGING_PATH + '<%= grunt.data.json.project.staging_path %>'}
        ],
        failOnError: true, // Fail the task when copying is not possible. Default: false
        updateAndDelete: true, // Remove all files from dest that are not found in src. Default: false
        compareUsing: "md5" // compares via md5 hash of file contents, instead of file modification time. Default: "mtime"
      },
      production:{
        files: [
          { expand: true, cwd: 'build/', src: ['**'], dest: process.env.PRODUCTION_PATH + '<%= grunt.data.json.project.production_path %>' }
        ],
        failOnError: true, // Fail the task when copying is not possible. Default: false
        updateAndDelete: true, // Remove all files from dest that are not found in src. Default: false
        compareUsing: "md5", // compares via md5 hash of file contents, instead of file modification time. Default: "mtime"
        verbose: true
      }
    },
    // Converts .html files to .php
    copy: {
      production: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**/*.html'],
          dest: 'build/',
          rename: function (dest, src) {
            return dest + src.replace('.html','.php');
          }
        }]
      }
    }
  });

  grunt.registerTask("delete", "Removes .html files", function() {
    shell.rm("-rf", "build/*.html");
  });

};
