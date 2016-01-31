module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "src/public/views",
          src: ["**/*.jade"],
          dest: "target/public/views",
          expand: true,
          ext: ".html"
        } ]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'src/public', src: ['css/**/*', 'images/**/*'], dest: 'target/public/'}          
        ],
      },
      },
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');

  
  grunt.registerTask('compileJade', 'Convert Jade templates into html templates', ['jade']);

  grunt.registerTask('default', 'create build', ['copy', 'compileJade']);
};