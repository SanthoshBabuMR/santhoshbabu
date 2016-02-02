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
    clean: {
      target: [ "target/**/*" ]
    },
    watch: {
      jade: {
        files: ['src/public/views/**/*.jade'],
        tasks: ['newer:jade'],
        options: {
          debounceDelay: 500
        },
      },
    },
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer'); // aids other grunt tasks, by running tasks only on the file(s) modified;

  
  grunt.registerTask('compile-jade', 'convert Jade templates into html templates', ['newer:jade']);
  grunt.registerTask('clean-target', 'clean target directory for new build', ['clean']);
  grunt.registerTask('watch-jade', 'watch over jade templates for changes', ['watch:jade']);

  grunt.registerTask('default', 'create build', ['clean-target', 'copy', 'compile-jade']);
};
