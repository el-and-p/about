define(
	[
		'jquery',
		'tabbery',
		'throttledebounce',
		'evensteven'
	],

	function ( $ ) {

		var Tab;
		var $tabs;
		var $tabButtons;
		var $tabMenu;
		var $tabsBody;
		var $modal;
		var $timetables;
		var $grids;

		return {
			initVars: function(){
				Tab = this;
				$modal = $('.js-modal--inline');
				$grids = $modal.find('.js-evensteven');
				$tabs = $( '.js-tabbery' );
				$tabButtons = $tabs.find('.js-tabbery__btn');
				$tabMenu = $tabs.find('.js-tabbery__menu');
				$tabsBody = $tabs.find('.js-tabbery__body');
			},
			init: function () {
				this._initEvents();
				$tabs.tabbery( {
					showClass: '.is-selected',
					tabMenu: '.js-tabbery__menu',
					tabMenuItem: 'a',
					tabContent: '.js-tabbery__body'
				} );
				this.setTabsHeight();
			},
			setTabsHeight: function(){
				var biggestHeight = Tab._getTablesHeight();
				$timetables.closest('.js-tabbery').each(function(){
					$(this).height(biggestHeight);
				});
			},
			removeTabsHeight: function(){
				$tabsBody.height('auto');
			},
			unbind: function(){
				$grids.evenSteven('destroy');
				// $(window).off('resize', this.setTabsHeight);
			},
			_getTablesHeight: function(){
				var biggestHeight = 0;
				var menuHeight = $tabMenu.height();
				$timetables = $tabsBody.find('.js-table--timetable');
				$timetables.each(function(){
					var $thisTimetable = $(this);
					var timetableHeight = $thisTimetable.height() + menuHeight;
					if(timetableHeight > biggestHeight) {
						biggestHeight = timetableHeight;
					}
				});
				return biggestHeight;
			},
			_initEvents: function(){
				if(Modernizr.csstransforms3d){
					$tabButtons.on('tabbery.click', this._flipTabBody);
				}
			},
			_flipTabBody: function(){
				$tabsBody.toggleClass('is-flipped');
			}

		};

	}
);
