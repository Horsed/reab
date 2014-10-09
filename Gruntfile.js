module.exports = function(grunt) {

  grunt.initConfig({
    qunit: {
      all: ['test/index.html']
    },

    watch: {
      js: {
        files: ['**/*.js'],
        tasks: ['qunit'],
        options: {
          spawn: false,
        },
      },
      coffee: {
        files: ['**/*.md'],
        tasks: ['coffee'],
        options: {
          spawn: false,
        },
      },
    },

    coffee: {
      compile: {
        files: {
          'reab.js': 'README.md',
          'test/tests.js': 'test/tests.md',
        }
      },
    },

    concurrent: {
      dev: {
        tasks: ['watch:js', 'watch:coffee'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('test:watch', ['watch:js']);
  grunt.registerTask('coff', ['coffee']);
  grunt.registerTask('coff:watch', ['watch:coffee']);
  grunt.registerTask('dev', ['concurrent:dev']);

};