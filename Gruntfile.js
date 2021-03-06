module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {},
      dist: {
        files: {
          'assets/javascript/geekpark.min.js': 'src/geekpark.js'
        }
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'assets/css/geekpark.css': 'src/geekpark.scss'
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      compress: {
        files: {
          'assets/css/geekpark.min.css': [ "assets/css/geekpark.css" ]
        }
      }
    },
    watch:{
      sass:{
        files: 'src/geekpark.scss',
        tasks:['sass','cssmin']
      },
      js:{
        files: 'src/geekpark.js',
        tasks:['uglify']
      },
      all: {
        files: ['src/*.*','*.html'],
        options: {
          livereload: true,
          interval: 1500
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['uglify', 'cssmin', 'watch']);
}
