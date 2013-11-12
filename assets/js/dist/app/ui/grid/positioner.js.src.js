define(
	[
		'jquery',
		'pubsub',
		'throttledebounce'
	],

	function ( $ ) {

		var GridPositioner;
		var $gridItems;
		var itemInfo;
		var $modal;

		return {

			init: function () {
				GridPositioner = this;
				$gridItems = $('.js-grid__item');
				$modal = $( '.js-modal--inline' );
				this._initEvents();
				this._initSubscriptions();
			},
			_initEvents: function(){
				$(window).on('resize', $.throttle(250, this._resizeGrid));
			},
			_initSubscriptions: function(){
				$.subscribe('/content/new', this._processNewContentEvent);
			},
			_resizeGrid: function(){
				var $selectedItem = $gridItems.filter('.is-selected');
				if( $selectedItem.length ){
					var data = {
						index: $gridItems.index($selectedItem)
					};
					GridPositioner._generatePositioningData(data, false);
					$.publish('/modal/resize', [itemInfo]);
				}
			},
			_processNewContentEvent: function(data) {
				GridPositioner._generatePositioningData(data, true);
				$.publish('/modal/show', [itemInfo]);
			},
			_generatePositioningData: function(data, cleanUpPrevious){
				/*
				 * sample data object
				 * {
				 *		index: 0
				 * }
				 * */
				var $rowItems = [];
				var itemPosition = data.index;
				var $clickedItem = $gridItems.eq(itemPosition);
				var $lastItemInRow = GridPositioner._getLastItemInRow($clickedItem);
				if (cleanUpPrevious){
					GridPositioner._cleanUpPreviousItem();
				}
				GridPositioner._setCurrentClass($clickedItem);
				GridPositioner._setLastClass($lastItemInRow);
				itemInfo = GridPositioner._getLastItemData($lastItemInRow, $clickedItem);

			},
			_cleanUpPreviousItem: function(){
				$gridItems.filter('.is-selected').attr('style', '').removeClass('is-selected');
				$gridItems.filter('.js-grid__item--end').removeClass('js-grid__item--end');
			},
			_setCurrentClass: function($clickedItem){
				$clickedItem.addClass('is-selected');
			},
			_getLastItemInRow: function($clickedItem) {
				var $firstItemNextRow = $clickedItem;
				var $nextItems = $clickedItem.nextAll();
				var currentOffsetTop = $clickedItem.offset().top;
				$nextItems.each(function(){
					var $nextItem = $(this);
					var nextItemOffset = $nextItem.offset().top;
					if(nextItemOffset != currentOffsetTop) {
						$firstItemNextRow = $nextItem;
						return false;
					}

					if(!$nextItem.next().length){
						$firstItemNextRow = $nextItem;
					}
				});

				return $nextItems.length ? $firstItemNextRow.prev() : $firstItemNextRow;
			},
			_setLastClass: function( $lastItemInRow ){
				$lastItemInRow.addClass('js-grid__item--end');
			},
			_getLastItemData: function($lastItemInRow, $clickedItem){
				var tmp = {};
				var lastItemTop = $lastItemInRow.offset().top;
				var lastItemHeight = $lastItemInRow.outerHeight();
				var modalHeight = $modal.outerHeight();
				var modalTop = $modal.offset().top;
				var clickedItemTop = $clickedItem.position().top;
				var newModalPosition = lastItemTop + lastItemHeight + 40;
				// tmp.offset = !$modal.is(':visible') || modalTop > clickedItemTop ? newModalPosition : newModalPosition - modalHeight;
				tmp.offset = newModalPosition;
				tmp.position = this._getClickedItemPosition( $clickedItem );
				return tmp;
			},
			_getClickedItemPosition: function($clickedItem){
				var itemPosition = {
					"arrow-one-0": 'arrow-one-center',
					"arrow-two-0": 'arrow-two-left',
					"arrow-two-1": 'arrow-two-right',
					"arrow-three-0": 'arrow-three-left',
					"arrow-three-1": 'arrow-three-center',
					"arrow-three-2": 'arrow-three-right'
				};
				var offset = $clickedItem.offset().top;
				$rowItems = $gridItems.filter(function(){
					return $(this).offset().top === offset;
				});

				var position;
				var index = $rowItems.index($clickedItem);

				if($rowItems.length === 3) {
					return itemPosition["arrow-three-"+index];
				}

				if($rowItems.length === 2) {
					return itemPosition["arrow-two-"+index];
				}

				return itemPosition["arrow-one-"+index];

			}
		};

	}
);



