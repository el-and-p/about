define(
	[
		'jquery',
		'util/mediaqueries',
		'app/ui/tabs/tabs',
		'evensteven',
		'pubsub'
	],

	function ( $, MediaQueries, Tabs ) {

		var Equalisation;

		return {

			init: function () {
				Equalisation = this;
				this._initMediaQueries();
			},
			_initMediaQueries: function(){
				MediaQueries.register([{
					queries: 'screen and (min-width: 800px) and (max-width: 999px)',
					shouldDegrade: false,
					match: function(){
						Equalisation._equaliseInner();
					},
					unmatch: function(){
						Equalisation._destroyInner();
					}
				},{
					queries: 'screen and (min-width: 1000px)',
					shouldDegrade: false,
					match: function(){
						Equalisation._equaliseInner();
						Equalisation._equaliseOuter();
					},
					unmatch: function(){
						Equalisation._destroyInner();
						Equalisation._destroyOuter();
					}
				}]);
			},
			_equaliseInner: function(){
				$('.js-evensteven--inner').evenSteven({
					resize: true,
					forceHeight: function(){

						var height;

						function calculateHeight() {
							var $outerColumn = $( '.js-evensteven--outer' );
							var $heading = $outerColumn.find('h2').first();
							var outerHeight = $outerColumn.outerHeight();
							var headingHeight = $heading.outerHeight( true );
							return outerHeight - headingHeight;
						}

						if( $( '.js-modal--inline' ).find('.js-tabbery').length ) {
							Tabs.initVars();
							Tabs.setTabsHeight();
							height = calculateHeight();
						} else {
							height = calculateHeight();
						}

						return height;
					}
				});
			},
			_destroyInner: function(){
				Tabs.removeTabsHeight();
				$('.js-evensteven--inner').evenSteven('destroy');
			},
			_equaliseOuter: function(){
				$('.js-evensteven--outer').evenSteven({
					resize: true,
					outerHeight: true
				});
			},
			_destroyOuter: function(){
				$('.js-evensteven--outer').evenSteven('destroy');
			}
		};
	}
);
