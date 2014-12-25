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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['uglify', 'cssmin', 'sass']);
}
