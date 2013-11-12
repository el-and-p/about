// util/scroller
define(
	[
		'jquery',
		'easing',
		'pubsub'
	],

	function ( $ ) {

		var Scroller;

		return {
			init: function(){
				this._initSubscriptions();
			},
			_initSubscriptions: function(){
				$.subscribe('/scroller/move', this._moveToElement);
			},
			_moveToElement: function(data){
				var $element =$( data.element );
				$( 'html,body' ).animate( { scrollTop: $element.offset().top - 80 }, 500, 'easeInOutExpo' );
			}
		};
	}
);

