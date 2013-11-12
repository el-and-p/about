/* app/ui/rotator/rotator */

define(
	[
		'jquery',
		'brotator',
		'throttledebounce'
	],

	function ($) {

		var Rotator;
		var $rotator;
		var $items;
		var $buttons;
		var $currentItem;
		var $viewport;

		return {
			init: function() {
				Rotator = this;
				$rotator = $('.js-rotator');
				$items = $rotator.find( '.js-rotator__item' );
				$buttons = $rotator.find('.js-rotator__next, .js-rotator__prev');
				$viewport = $rotator.find('.js-rotator__content');
				Rotator._setItemPadding($items.first());
				Rotator._setAnimationClass($items.first());
				Rotator._initEvents();
				$rotator.brotator({
					autorotate: false,
					content: '.js-rotator__content',
					item: '.js-rotator__item',
					menu: '.js-rotator__menu',
					menuItem: '.js-rotator__menu-item',
					next: '.js-rotator__next',
					previous: '.js-rotator__prev',
					hasMenu: true,
					menuClick: true,
					hasButtons: true,
					contentSetup: null,
					complete: function(){

					}
				});
			},
			_initEvents: function(){
				$rotator.on('brotator.transition.start', function( event, data ){
					var next = data.next;
					var $next = $items.eq(next);
					Rotator._setItemPadding($next);
				});
				$(window).on('resize', $.throttle(250, function(){
					var $currentSelected = $items.filter('.is-selected');
					Rotator._setItemPadding($currentSelected);
				}));
				$rotator.find( '.js-next' ).on( 'click', this._showNextItem );
			},
			_setItemPadding: function($item){
				var height = $item.outerHeight();
				var width = $item.outerWidth();
				var percentage = (height / width)*100 + '%';
				$items.filter('.is-first-item').removeClass('is-first-item');
				$viewport.css({
					'padding-bottom': percentage
				});
			},
			_showNextItem: function( event ) {
				event.preventDefault();
				$rotator.find( '.js-rotator__next' ).trigger( 'click' );
			},
			_setAnimationClass: function( $item ){
				$item.addClass('is-fading-in');
				setTimeout(function(){
					$viewport.addClass('bottom-slide');
				}, 500);
			}
		};
	}
);

