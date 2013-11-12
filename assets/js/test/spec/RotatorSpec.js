define([

	'jquery',
	'app/ui/rotator/rotator'

], function($, Rotator){

	describe('the Rotator', function() {

		before(function(){
			preloadFixtures('rotator.html');
		});

		beforeEach(function(){
			loadFixtures('rotator.html');
		});

		describe('the buttons', function(){

			it('should change the current selected item when clicked next', function() {

				//Setup
				var $newItem;
				var $nextButton = $('.js-rotator__next');
				var $previousButton = $('.js-rotator__prev');
				var $items = $('.js-rotator__items');
				var $currentSelected = $items.filter('.is-selected');
				var $itemNextToSelected = $currentSelected.next('.js-rotator__item');

				//Work
				Rotator.init();
				$nextButton.trigger('click');
				$newItem.find('is-selected');

				//Assertion
				expect($newItem).to.not.eql($currentSelected);
			});

		});

	});

});


