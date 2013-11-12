/* app/page/listing */

define(
	[
		'jquery',
		'util/scroller',
		'app/page/detail',
		'app/ui/grid/content',
		'app/ui/grid/positioner',
		'app/ui/grid/modal'
	],

	function ( $, Scroller, ModalContent, GridContent, GridPositioner, GridModal ) {

		Scroller.init();
		ModalContent.init();
		GridContent.init();
		GridPositioner.init();
		GridModal.init();

	}
);

