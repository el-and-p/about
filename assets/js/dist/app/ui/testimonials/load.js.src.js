define(
	[
		'jquery',
		'util/mediaqueries'
	],

	function ( $, MediaQueries ) {

		var TestimonialsLoad;
		var $testimonials;

		return {

			init: function () {
				TestimonialsLoad = this;
				$testimonials= $( '.js-masonry' );
				if($testimonials.length){
					this._initMediaQueries();
				}
			},
			_initMediaQueries: function(){
				MediaQueries.register([{
					queries: 'screen and (min-width: 660px)',
					match: function(){
						if($testimonials.data('masonry') === undefined) {
							require(['app/ui/testimonials/testimonials'], function(Testimonials){
								Testimonials.init();
							});
						}
					}
				}]);
			}

		};

	}
);


