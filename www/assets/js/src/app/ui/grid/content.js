define(
	[
		'jquery',
		'util/contentManager',
		'pubsub'
	],

	function ( $, ContentManager ) {

		var GridContent;
		var $grid;
		var $gridItems;

		return {

			init: function () {
				GridContent = this;
				$grid = $('.grid');
				$gridItems = $grid.children('.js-grid__item');
				this._initEvents();
			},
			_initEvents: function(){
				$grid.on('click', '.js-grid__item', this._processShowContentEvent);
			},
			_processShowContentEvent: function(event){
				event.preventDefault();
				var $thisGridItem = $(this);
				if( !$thisGridItem.is('.is-selected') ) {
					var index = $gridItems.index($thisGridItem);
					var url = $thisGridItem.find('a').first()[0].href;
					ContentManager.getContent(url)
						.done(GridContent._processContent);
					$.publish('/content/new', [{
						index: index
					}]);
				}
			},
			_processContent: function(content) {
				var $contentHTML = $(content).find('.js-content');
				var processedHTML = $("<div />").append($contentHTML.clone()).html();
				var html = {
					html: processedHTML
				};
				$.publish('/content/ready', [html]);
			}
		};

	}
);


