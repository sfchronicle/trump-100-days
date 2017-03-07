module.exports = function(grunt) {

  //load tasks
  grunt.loadTasks("./tasks");

  grunt.registerTask("content", "Load content from data files", ["state", "json", "csv", "markdown"]);
  grunt.registerTask("template", "Build HTML from content/templates", ["content", "build"]);
  grunt.registerTask("static", "Build all files", ["clean", "assets", "bundle", "less", "template"]);
  grunt.registerTask("default", ["clean", "static", "connect:dev", "watch"]);
  grunt.registerTask('deploy', "Deployed project", function(target) {
    if (target) {
      grunt.task.run (['static', 'copy', 'delete', 'sync:' + target]);
    } else {
      grunt.task.run(['static', 'copy', 'delete', 'sync:staging']);
    }
  });
};
