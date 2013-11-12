module.exports = function ( grunt ) {

	'use strict';

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		//Vars of directory/file locations for convenience
		files: {
			root: '../src',
			src: '<%= files.root %>',
			www: '../www',
			http: '../http',
			website: '../../../BitBucket/patocallaghan.bitbucket.org',
			assets: '<%= files.src %>/static/assets',
			css: {
				src: '<%= files.assets %>/scss/**/*.scss',
				dist: '<%= files.assets %>/css/**/*.css'
			},
			images: '<%= files.assets %>/images',
			scripts: {
				root: '<%= files.assets %>/js',
				all: '<%= files.scripts.root %>/**/*.js',
				src: '<%= files.scripts.root %>/src',
				dist: '<%= files.scripts.root %>/dist',
				test: '<%= files.scripts.root %>/test'
			},
			template: {
				src: '<%= files.root %>',
				dist: '<%= files.www %>'
			}
		},

		clean: {
			options: {
				force: true
			},
			all: ['<%= files.scripts.dist %>']
		},

		compass: {
			files: ['<%= files.css.src %>'],
			prod: {
				options: {
					basePath: '<%= files.root %>/static',
					bundleExec: true,
					config: 'compass/config.rb',
					environment: 'production',
					force: true
				}
			},
			dev: {
				options: {
					basePath: '<%= files.root %>/static',
					bundleExec: true,
					config: 'compass/config.rb'
				}
			}
		},

		concat: {
			options: {
				separator: '\n;'
			},
			dist: {
				src: [
					'<%= files.scripts.dist %>/lib/modernizr.prod.js',
					'<%= files.scripts.dist %>/lib/require.js'
				],
				dest: '<%= files.scripts.dist %>/bootstrap.js'
			}
		},

		connect: {
			server: {
				options: {
					port: 8001,
					base: '<%= files.http %>'
				}
			},
			test: {
				options: 9001,
				base: '<%= files.assets %>'
			}
		},

		copy: {
		},

		docs: {
			srcPath: '<%= files.template.src %>',
			outPath: '<%= files.template.dist %>',
			ignoreHiddenFiles: true,
			ignoreCommonPatterns: true,
			ignoreCustomPatterns: /(~$)|(.ignore$)|(.scss$)|(.swo|.swp)/
		},

		revver : {
			build: {
				files: {
					src: [
						'<%= files.scripts.dist %>/**/*.js',
						'!<%= files.scripts.dist %>/paths.js',
						'!<%= files.scripts.dist %>/**/*.src.js'
					],
					dest: '<%= files.scripts.dist %>/paths.js'
				},
				template: {
					intro: 'requirejs.config( { \n\tpaths: {',
					outro: '\n\t}\n});'
				},
				options: {
					rootDir: '../http',
					appDir: '<%= files.scripts.dist %>',
					baseUrl: 'lib',
					paths: {
						//Project Paths
						app: '../app',
						main: '../main',
						util: '../util',
						//LittleGlitch Libs
						brotator: 'littleglitch/jquery.brotator',
						evensteven: 'littleglitch/jquery.evensteven',
						expandcollapse: 'littleglitch/jquery.expandcollapse',
						phatfingaz: 'littleglitch/jquery.phatfingaz',
						tabbery: 'littleglitch/jquery.tabbery',
						//3rd Party Libs
						async: 'requirejs-plugins/async',
						easing: 'jquery.easing.1.3',
						feature: 'requirejs-plugins/feature',
						hoverIntent: 'jquery.hoverIntent',
						implementations: 'requirejs-plugins/amd-feature/dynamic',
						jquery: 'jquery-1.10.2',
						lazyload: 'jquery.lazyload.1.8.2',
						lazyscroll: 'jquery.lazyscroll',
						propertyParser: 'requirejs-plugins/propertyParser',
						pubsub: 'jquery.ba-tinypubsub',
						throttledebounce: 'jquery.ba-throttle-debounce.min',
						'socket-io': '/socket.io/socket.io',
						eventie: 'eventie',
						'doc-ready': 'doc-ready',
						eventEmitter: 'eventEmitter',
						'get-style-property': 'get-style-property',
						'get-size': 'get-size',
						'matches-selector': 'matches-selector',
						outlayer: 'outlayer'
					}
				}
			}
		},

		jshint: {
			files: [
				'Gruntfile.js',
				'<%= files.scripts.src %>/app/**/*.js',
				'<%= files.scripts.src %>/util/**/*.js',
				'<%= files.scripts.test %>/spec/**/*.js'
			],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
					require: true,
					enquire: false
				}
			}
		},

		mocha: {
			// Test files
			index: ['<%= files.scripts.test %>/test.html'],
			options: {
				log: true,
				reporter: 'Spec'
			}
		},

		requirejs: {
			prod: {
				options: {
					optimize: 'uglify2',
					generateSourceMaps: true,
					preserveLicenseComments: false,
					appDir: '<%= files.scripts.src %>',
					baseUrl: 'lib',
					mainConfigFile: '<%= files.scripts.src %>/main.js',
					dir: '<%= files.scripts.dist %>',
					paths: {
						//Project Paths
						app: '../app',
						util: '../util',
						//LittleGlitch Libs
						brotator: 'littleglitch/jquery.brotator',
						evensteven: 'littleglitch/jquery.evensteven',
						expandcollapse: 'littleglitch/jquery.expandcollapse',
						phatfingaz: 'littleglitch/jquery.phatfingaz',
						tabbery: 'littleglitch/jquery.tabbery',
						lazyscroll: 'littleglitch/jquery.lazyscroll',
						//3rd Party Libs
						async: 'requirejs-plugins/async',
						easing: 'jquery.easing.1.3',
						feature: 'requirejs-plugins/feature',
						hoverIntent: 'jquery.hoverIntent',
						implementations: 'requirejs-plugins/amd-feature/dynamic',
						jquery: 'jquery-1.10.2',
						lazyload: 'jquery.lazyload.1.8.2',
						propertyParser: 'requirejs-plugins/propertyParser',
						pubsub: 'jquery.ba-tinypubsub',
						throttledebounce: 'jquery.ba-throttle-debounce.min',
						'socket-io': '/socket.io/socket.io',
						eventie: 'eventie',
						'doc-ready': 'doc-ready',
						eventEmitter: 'eventEmitter',
						'get-style-property': 'get-style-property',
						'get-size': 'get-size',
						'matches-selector': 'matches-selector',
						outlayer: 'outlayer',
						masonry: 'masonry/masonry'
					},
					modules: [
					//module names are relative to baseUrl/paths config
					//First set up the common build layer.
						{
						//module names are relative to baseUrl
						name: '../main',
						//List common dependencies here. Only need to list
						//top level dependencies, "include" will find
						//nested dependencies.
						include: [	'feature',
									'jquery',
									'easing',
									'evensteven',
									'throttledebounce',
									'util/mediaqueries',
									'app/page/all'
							],
						exclude: [
							'matchMedia',
							'getComputedStyle'
							]
						},{
							name: 'app/page/listing',
							exclude: [
								'../main',
								'matchMedia',
								'getComputedStyle'
							]
						},{
							name: 'app/page/about',
							exclude: [
								'../main',
								'matchMedia',
								'getComputedStyle'
							]
						}, {
							name: 'app/ui/testimonials/testimonials',
							exclude: [
								'../main',
								'matchMedia',
								'getComputedStyle'
							]
						}
					]
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			docpad: {
				files: [
					'<%= docs.srcPath %>/**/*.html.eco',
					'<%= docs.srcPath %>/**/*.md',
					'<%= docs.srcPath %>/**/*.html'],
				tasks: ['docs']
			},
			mocha: {
				files: [
					'<%= mocha.index %>',
					'<%= files.scripts.src %>/app/**/*.js',
					'<%= files.scripts.src %>/util/**/*.js',
					'<%= files.scripts.test %>/spec/**/*.js'],
				tasks: ['mocha']
			},
			scripts: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			},
			scss: {
				files: '<%= files.css.dist %>',
				tasks: []
			}
		}

	} );

	grunt.loadNpmTasks( 'grunt-contrib-compass' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-docs' );
	grunt.loadNpmTasks( 'grunt-mocha' );
	grunt.loadNpmTasks( 'grunt-notify' );
	grunt.loadNpmTasks( 'grunt-requirejs-revver' );

	grunt.registerTask( 'test', ['connect:test', 'mocha'] );
	//grunt.registerTask( 'build', ['compass:prod', 'concat:contour', 'requirejs:prod', 'revver', 'concat:dist'] );
	grunt.registerTask( 'build', ['compass:prod', 'requirejs:prod', 'revver', 'concat:dist'] );
	grunt.registerTask( 'dev', ['connect', 'watch'] );
	grunt.registerTask( 'default', ['jshint', 'concat:dist'] );

};
