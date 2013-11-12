/* app/ui/modal/modal */

define(
	[
		'jquery',
		'util/template'
	],

	function ( $, Template ) {

		var Modal;
		var $modals;
		var $buttons;

		return {

			init: function () {
				Modal = this;
				$modals = $('.js-modal');
				$buttons = $( '.js-modal__btn' );
				this._initEvents();
				this._initSubscriptions();
			},
			_initEvents: function(){
				$buttons.on( 'click', this._processClickEvent );
				$modals.on( 'click','.js-modal--animatable__close', this._processCloseEvent );
				$modals.on( 'webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionEnd', this._processTransitionEnd );
			},
			_initSubscriptions: function(){
				$.subscribe( '/weather/ready', this._renderWeather );
			},
			_processClickEvent: function( event ) {
				event.preventDefault();
				var $thisModal = $(this).next( '.js-modal' );
				if( $thisModal.is('#js-weather__modal') ) {
					Modal._initWeather( $thisModal );
				} else {
					Modal._initTwitter( $thisModal );
				}
				Modal._closeOtherModal();
				Modal._showHideModal( $thisModal );
			},
			_initWeather: function( $thisModal ){
				if( $thisModal.attr( 'data-weather-ready' ) === 'false' && !$thisModal.is( 'is-visible' ) ) {
					require(['app/ui/weather/data'], function( WeatherData ){
						WeatherData.init();
					} );
				}
			},
			_initTwitter: function( $thisModal ) {
				if( $thisModal.attr( 'data-twitter-ready' ) === 'false' && !$thisModal.is( 'is-visible' ) ) {
					require(['twitter']);
				}
			},
			_processCloseEvent: function( event ) {
				event.preventDefault();
				var $thisModal = $(this).closest( '.js-modal' );
				Modal._showHideModal( $thisModal, 'remove' );
			},
			_processTransitionEnd: function( event ) {
				var $weatherModal = $(this);
				if( $weatherModal.is( '.is-closing' ) ) {
					$weatherModal.removeClass( 'is-closing' );
				}
			},
			_renderWeather: function( data ) {
				var compiledTemplate = Template.compileTemplate( '#js-template-weather', data );
				var $weatherModal = $( '#js-weather__modal' );
				$weatherModal.attr( 'data-weather-ready', 'true' );
				$weatherModal.find('.js-modal__body').html( compiledTemplate );
			},
			_showHideModal: function( $thisModal, actionOverride ) {
				var action = actionOverride ? actionOverride : 'add';
				if( !actionOverride && $thisModal.is( '.is-visible' ) ) {
					action = 'remove';
				}
				$thisModal[action + 'Class']( 'is-visible' );
				if( action === 'remove' ) {
					$thisModal.addClass( 'is-closing' );
				}

			},
			_closeOtherModal: function(){
				$modals.each(function(){
					var $thisModal = $(this);
					if( $thisModal.is( '.is-visible' ) ) {
						$thisModal.find('.js-modal--animatable__close').trigger('click');
					}
				});
			}

		};

	}
);


