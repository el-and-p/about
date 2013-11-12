define(
	[
		'jquery'
	],

	function ( $ ) {

		var Detail;

		return {

			init: function () {
				Detail = this;
				this._initSubscriptions();
				if( !$('.js-listing').length ) {
					this._setUp();
				}
			},
			_initSubscriptions: function(){
				$.subscribe('/detail/init', this._setUp);
			},
			_setUp: function(){
				Detail._initEqualisation();
				Detail._initTabs();
			},
			_initEqualisation: function(){
				require(['app/ui/equalisation/equalisation'], function( Equalisation ){
					Equalisation.init();
				});
			},
			_initTabs: function(){
				if($('.js-tabbery').length){
					require(['app/ui/tabs/load'], function(TabsLoad){
						TabsLoad.init();
					});
				}
			}
		};

	}
);


