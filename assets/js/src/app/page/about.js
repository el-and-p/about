/* app/page/about */

define(
	[
		'jquery',
		'app/ui/testimonials/load',
		'app/ui/rotator/rotator'
	],

	function ( $, TestimonialsLoad, Rotator ) {

		TestimonialsLoad.init();
		Rotator.init();
	}
);

