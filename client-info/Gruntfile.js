'use strict';

module.exports = function (grunt) {
    // Load all grunt npm tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-easy-rpm");
    grunt.loadNpmTasks('grunt-nexus-deployer');

    var build_number_suffix = typeof process.env.BUILD_NUMBER == "string" ? process.env.BUILD_NUMBER : 'SNAPSHOT';

    grunt.initConfig( grunt.util._.extend(require('rx-grunt-tasks')(grunt) , {
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        widgetName: 'client-info',
        widgetDescriptor: '<%= widgetName %>.xml',
        widgetFolder: 'src/',
        widgetVersion: '1.0.0',
        artifactId: "<%= widgetName %>-bin",
        beforeMakerTasks: {
            widget: ['copy:make']
        },
        afterMakerTasks: {},
        customBlocksDir: './node_modules/rx-grunt-tasks/custom-blocks/',
        destPath: 'dest/',
        destFile: '<%= widgetName %>.html',
        open : {
            dev : {
                path: 'http://127.0.0.1:9000/<%= destPath %><%= destFile %>',
                app: process.env.OPEN_BROWSER || 'Chrome'
            }

        },
        clean: {
            bower: ['bower_components'],
            build: ['.grunt-cache', 'dest', 'webapp', 'webapp-dev'],
            compress: ['<%= widgetName %>.zip'],
            rpm: ['build', '<%= widgetName %>-widget-*.noarch.rpm', 'tmp-*']
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    livereload: true
                }
            }
        },
        json_generator: {
            widget_ver: {
                dest: "webapp/src/widget-ver.json", // Destination file
                options: {
                    jobName : process.env.JOB_NAME,
                    buildNumber : process.env.BUILD_NUMBER,
                    gitBranch : process.env.GIT_BRANCH,
                    gitCommit : process.env.GIT_COMMIT
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= widgetName %>.zip'
                },
                files: [
                    {expand: true, cwd: 'webapp/src', src: ['**'], dest: '<%= widgetName %>/'}
                ]
            }
        },
        easy_rpm: {
            options: {
                name: '<%= widgetName %>-bin-widget',
                version: "<%=  widgetVersion %>",
                release: build_number_suffix,
                buildArch: "noarch",
                vendor:    "RooX Solutions",
                license:   "Proprietary Software",
                url:       "http://rooxteam.com"
            },
            release: {
                files: [
                    {cwd: 'webapp/src/', src: "**", dest: "/opt/nginx/www/widgets/<%= widgetName %>", user: "nginx", group: "nginx", mode: "774"}
                ]
            }
        },
        nexusDeployer: {
            zip: {
                options: {
                    groupId: "com.rooxteam.widgets",
                    artifactId: "<%= artifactId %>",
                    version: "<%=  widgetVersion %>-"+build_number_suffix,
                    packaging: 'zip',
                    classifier: '',
                    auth: {
                        username: process.env.NEXUS_USERNAME,
                        password: process.env.NEXUS_PASSWORD
                    },
                    pomDir: 'build/pom',
                    url: 'http://nexus.rooxintra.net/content/repositories/releases',
                    artifact: '<%= widgetName %>.zip',
                    noproxy: 'localhost',
                    cwd: ''
                }
            },
            rpm: {
                options: {
                    groupId: "com.rooxteam.widgets",
                    artifactId: "<%= artifactId %>",
                    version: "<%=  widgetVersion %>-"+build_number_suffix,
                    packaging: 'rpm',
                    classifier: 'rpm',
                    auth: {
                        username: process.env.NEXUS_USERNAME,
                        password: process.env.NEXUS_PASSWORD
                    },
                    pomDir: 'build/pom',
                    url: 'http://nexus.rooxintra.net/content/repositories/releases',
                    artifact: '<%= widgetName %>-bin-widget-<%=  widgetVersion %>-'+build_number_suffix+'.noarch.rpm',
                    noproxy: 'localhost',
                    cwd: ''
                }
            }
        },
        copy: {
            make: {
                files: [
                    {expand: true,
                        cwd: '<%= widgetFolder %>',
                        src: [
                            'js/backport-js/**',
                            'js/**/*.js',
                            'vendor/**',
                            'css/**/*.css',
                            'less/**',
                            'css/*.less',
                            'css/vendors/**',
                            'fonts/**',
                            'i/**',
                            'locale/**',
                            'screenshots/**',
                            'img/**',
                            'templates/**'],
                        dest: '<%= destPath %>'}
                ]
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/combined.css": "css/combined.less"
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
              options: {                       // Target options
                 style: 'expanded'
              },
              files: {                         // Dictionary of files
               
               '<%= destPath %>/css/main.css': '<%= widgetFolder %>/sass/main.scss'
              }
            },
            webapp: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files

                    'webapp/src/css/main.css': '<%= widgetFolder %>/sass/main.scss'
                }
            }
        },
        jscs: {
            main: [ '<%= widgetFolder %>/js/**/*.js' ],
            options: {
                config: ".jscsrc",
                esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
                verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
                fix: true, // Autofix code style violations when possible.
                requireCurlyBraces: [],
                excludeFiles: [ '<%= widgetFolder %>/js/vendors/**/*.js' ]
            }
        },
        watch: {
            options: {livereload: true},
            templates: {
                files: ['templates/*.tl'],
                tasks: ['clearConfigWidgetBody', 'make:widget'],
                options: {
                    spawn: false,
                    cwd: '<%= widgetFolder %>'
                },
            },
            xml: {
                files: ['*.xml', 'main.html'],
                tasks: ['clearConfigWidgetBody', 'make:widget'],
                options: {
                    spawn: false,
                    cwd: '<%= widgetFolder %>'
                },
            },
            // locale: {
            //     files: ['locale/**'],
            //     tasks: ['clearConfigLocales','clearConfigWidgetBody','make:widget'],
            //     options: {
            //         spawn: false,
            //         cwd: '<%= widgetFolder %>'
            //     }
            // },
            react: {
                files: ['js/**/*.js'],
                tasks: ['clearConfigWidgetBody', 'make:widget', 'xmlwatcher'],
                options: {
                    spawn: false,
                    cwd: '<%= widgetFolder %>'
                }
            },
          sass: {
            files: 'sass/**/*.scss',
            tasks: ['sass:dist'],
            options: {
                spawn: false,
                cwd: '<%= widgetFolder %>'
            },
          },
            css: {
                files: ['css/**/*.css'],
                tasks: ['clearConfigWidgetBody','xmlwatcher'],
                options: {
                    spawn: false,
                    cwd: '<%= widgetFolder %>'
                }
            },
            screens: {
                files: ['screenshots/**'],
                tasks: ['make:widget'],
                options: {
                    spawn: false,
                    cwd: '<%= widgetFolder %>'
                }
            }
        },
        run: {
            bower_install: {
                args: ['./node_modules/npm-bower-upload/bower.js']
            }
        },
        uncss: {
            dist: {
                files: {
                    'css/dist.css': ['optimization.html']
                }
            }
        },
        unjar:{
            default: {
                'src': 'bower_components/**/*.jar',
                'dest': 'bower_components/tmp'
            }
        },
        dependency: {
            show_widget: {
                src: 'bower_components/**/feature.xml'
            },
            show_feature: {
                src: 'bower_components/**/feature.xml'
            }
        },
        concat: {},
        maker: {
            features: {
                src: ['bower_components/**/feature.xml']
            },
            widget: {
                src: '<%= widgetFolder %><%= widgetDescriptor %>'
            },
            watch: {}
        },
        rxinline: {
            prod: {
                options:{
                    resInlinePrefix: '__MODULE_BASE_URL__/',
                    cssmin: true,
                    uglify: false,
                    tag: ''
                }
            }
        },
        widget: {
            mid: 1,
            configJson: 'widget.conf.json',
            dest: '<%= destPath %><%= destFile %>',  // destination file (usually index.html)
            deps: {}, // widget dependencies
            body: '',
            wrsDefaults: [
                'com.rooxteam.auth',
                'com.rooxteam.container',
                'com.rooxteam.iso.date',
                'com.rooxteam.sharedcontext',
                'com.rooxteam.sso',
                'com.rooxteam.webapi',
                'core.config',
                'core.io',
                'core.json',
                'core.legacy',
                'core.log',
                'core.prefs',
                'core.util',
                'globals',
                'locked-domain',
                'opensocial-base',
                'opensocial-jsonrpc',
                'opensocial-reference',
                'org.jquery.core-1.7.2',
                'osapi',
                'security-token',
                'shindig.auth'
            ]
        },
        features: {},
        execute: {
            bw: {
                src: ['node_modules/rx-bower-upload/execute.js']
            },
            unjar: {
                src: ['node_modules/rx-bower-upload/unjar.js']
            }
        }
    }));

    grunt.registerTask('clearConfigLocales', function () {
        grunt.config.set('widget.deps.locales', null);
    });

    grunt.registerTask('runtests', ['make', 'karma']);

    grunt.registerTask('start', ['bwupload', 'make', 'connect', 'sass:dist', 'open:dev', 'watch']);

    grunt.registerTask('default', ['make', 'connect', 'open:dev', 'watch']);

    grunt.registerTask('build_ci', ['sass:webapp', 'build:prod', 'json_generator', 'compress', 'easy_rpm', 'nexusDeployer']);

};
