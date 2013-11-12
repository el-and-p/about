define([

	'jquery',
	'app/ui/grid/positioner',
	'pubsub'

], function($){

	describe('the Grid Modal Positioner', function( $, GridModalPositioner ) {

		var $body;
		var $gridItems;
		var positionClicked = {
			item: 0
		};
		var responsiveViews = {
			'one-grid' : '320px',
			'two-grid': '700px',
			'three-grid': '1000px'
		};

		function clearUpStyles () {
			$body.attr('style', '');
		}

		function clickGridItemNumber(number){
			positionClicked.item = number;
			$.publish('/content/new', [positionClicked] );

		}

		before(function(){
			preloadFixtures('trips-and-services.html');
		});

		beforeEach(function(){
			loadFixtures('trips-and-services.html');
			$body = $('body');
			$gridItems = $('.js-grid__item');
		});

		afterEach(function(){
			clearUpStyles();
		});

		xdescribe('the one grid view', function() {

			it("should correctly find the last item in a row if the first grid__item is clicked", function() {

				//Setup
				var $firstGridItem = $gridItems.eq(0);
				$body.width(responsiveViews['one-grid']);

				//Work
				GridModalPositioner.init();
				clickGridItemNumber(0);

				//Assertion
				expect($firstGridItem).to.have['class']('js-grid__end');

			});

		});

	});

});


