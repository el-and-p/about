/* app/page/all */

define(
	[
		'jquery',
		'app/ui/form/form',
		'app/ui/modal/modal',
		'util/lazyload',
		'util/mediaqueries',
		'appendAround',
		'pubsub'
	],

	function ( $, Form, Modal, LazyLoad, MediaQueries ) {

		$('.js-append-around').appendAround();
		LazyLoad.init();
		Form.init();
		Modal.init();
		MediaQueries.init();
	}
);
