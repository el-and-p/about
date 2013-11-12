define(
	[
		'jquery',
		'util/mediaqueries',
		'masonry'
	],

	function ( $, MediaQueries, Masonry ) {

		var Testimonials;
		var $testimonials;
		var masonry;

		return {

			init: function () {
				Testimonials = this;
				$testimonials= $( '.js-masonry' );
				this._initMediaQueries();
				
				masonry = new Masonry($testimonials[0],{
					columnWidth: 'li',
					itemSelector: 'li'
				});
			},
			_initMediaQueries: function(){
				MediaQueries.register([{
					queries: 'screen and (min-width: 660px)',
					unmatch: function(){
						masonry.destroy();
					}
				}]);
			}
		};

	}
);

