/* util/contentManager */

define(
	[
		'jquery'
	],

	function ( $ ) {

		var cache = {};

		return {
			getContent: function(url){
				var dfd = $.Deferred();
				if(cache[url]) {
					dfd.resolveWith(this, [cache[url]]);
				} else {
					$.ajax({
						url: url
					}).done(function(response){
						dfd.resolveWith(this, [response]);
						cache[url] = response;
					});
				}
				return dfd.promise();
			}
		};
	}
);

