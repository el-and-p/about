// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory
// except 'app' ones,
requirejs.config({
	shim: {
		matchMedia: {
			exports: 'matchMedia'
		},
		JSON: {
			exports: 'JSON'
		},
		getComputedStyle: {
			exports: 'getComputedStyle'
		},
		easing: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		ajaxInclude: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		lazyload: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		lazyscroll: {
			deps: ['jquery', 'throttledebounce', 'pubsub'],
			exports: 'jQuery'
		},
		appendAround: {
			deps: ['jquery', 'feature!getComputedStyle'],
			exports: 'jQuery'
		},
		throttledebounce: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		pubsub: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		evensteven: {
			deps: ['jquery', 'throttledebounce'],
			exports: 'jQuery'
		},
		phatfingaz: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		enquire: {
			deps: ['feature!matchMedia'],
			exports: 'enquire'
		},
		hoverIntent: {
			exports: 'jQuery'
		},
		tabbery: {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		brotator: {
			deps: ['jquery', 'easing', 'pubsub'],
			exports: 'jQuery'
		},
		customizeTwitter: {
			exports: 'CustomizeTwitterWidget'
		},
		twitter: {
			deps: ['customizeTwitter']
		},
		templayed: {
			exports: 'templayed'
		},
		'socket-io': {
			'exports': 'io'
		}
	},
	waitSeconds: 60
});
