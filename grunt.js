module.exports = function(grunt) {

  // Project configuration.
  // go from assets > css > dist/css
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    clean: {
      folder: "tmp/*"
    },
    mincss: {
      compress: {
        files : {
          "less/dist/css/style.css": [
            "less/css/style.css"
          ],
          "sass/dist/css/style.css": [
            "sass/css/style.css"
          ],
          "stylus/dist/css/style.css": [
            "stylus/css/style.css"
          ]
        }
      }
    },
    jshint: {
      options: {
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    less: {
      all: {
        src: 'less/assets/style.less',
        dest: 'less/css/style.css'
      }
    },
    recess: {
        less: {
            src: ['less/css/style.css'],
            options: {
              strictPropertyOrder: false
            }
        },
        sass: {
            src: ['sass/css/style.css'],
            options: {
              strictPropertyOrder: false
            }
        },
        stylus: {
            src: ['stylus/css/style.css'],
            options: {
              strictPropertyOrder: false
            }
        },
        dist: {
            src: ['less/dist/css/style.css', 'sass/dist/css/style.css', 'stylus/dist/css/style.css'],
            options: {
              strictPropertyOrder: false
            }
        }
    },
    sass: {
      dist: {
        files: {
          'sass/css/style.css': 'sass/assets/style.scss'
        }
      }
    },
    stylus: {
      compile: {
        files: {
          'stylus/css/style.css': 'stylus/assets/style.styl'
        }
      }
    },
    watch: {
      all: {
        files: ['<config:lint.all>'],
        tasks: 'lint'
      },
      less: {
        files: ['less/assets/**/*.less'],
        tasks: 'less recess:less'
      },
      sass: {
        files: ['sass/assets/**/*.scss'],
        tasks: 'sass recess:sass'
      },
      stylus: {
        files: ['stylus/assets/**/*.styl'],
        tasks: 'stylus recess:stylus'
      }
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-sass');

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.registerTask('lintcss', 'recess:dist');
  grunt.registerTask('build', 'less stylus mincss recess:dist');
};