define(
	[
		'jquery',
		'enquire'
	],
/**
* Mediaqueries module. Module which runs on every detail page on the site.
* @module util/mediaqueries 
* @requires module:jquery
*/
	function($) {

		

		var shouldDegrade;

		return {
			queries: {
				"nav-small": "screen and (max-width: 639px)",
				"nav-large": "screen and (min-width: 640px)"
			},

			init: function() {
				//We only want to fire mediaqueries for mediaquery capable browsers. i.e. Not Old IE which gets a fixed view
				shouldDegrade = !$('.oldie').length;
			},

			register: function(config) {
				if (Object.prototype.toString.call(config) === '[object Array]') {
					for (var i = 0; i < config.length; i++) {
						var currentConfig = config[i];
						this._addToHandler(currentConfig);
					}
				} else {
					this._addToHandler(config);
				}

			},

			_addToHandler: function(config) {
				//Init JS mediaquery handlers using Enquire.JS
				enquire.register(config.queries, {
					match: config.match,
					unmatch: config.unmatch,
					deferSetup: true
				}, config.shouldDegrade);
			}
		};
	}
);