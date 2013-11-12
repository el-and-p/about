define(
	[
		'jquery',
		'util/mediaqueries'
	],

	function ( $, MediaQueries ) {

		var TabsLoad;

		return {

			init: function () {
				TabsLoad = this;
				this._initMediaQueries();
			},
			_initMediaQueries: function(){
				MediaQueries.register([{
					queries: 'screen and (min-width: 500px) and (max-width: 799px)',
					shouldDegrade: false,
					match: function(){
						require(['app/ui/tabs/tabs'], function(Tabs){
							Tabs.initVars();
							Tabs.setTabsHeight();
						});
					},
					unmatch: function(){
						require(['app/ui/tabs/tabs'], function(Tabs){
							Tabs.removeTabsHeight();
						});
					}
				},{
					queries: 'screen and (min-width: 500px)',
					shouldDegrade: true,
					match: function(){
						require(['app/ui/tabs/tabs'], function(Tabs){
							Tabs.initVars();
							Tabs.init();
						});
					}
				},{
					queries: 'screen and (min-width: 800px)',
					shouldDegrade: true,
					match: function(){
						require(['app/ui/tabs/tabs'], function(Tabs){
							Tabs.initVars();
							Tabs.setTabsHeight();
						});
					},
					unmatch: function(){
						require(['app/ui/tabs/tabs'], function(Tabs){
							Tabs.unbind();
						});
					}
				}]);
			}
		};

	}
);

