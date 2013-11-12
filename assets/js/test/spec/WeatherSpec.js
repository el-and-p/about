define([

	'jquery'

], function($){

	describe('Weather Spec', function() {

		var weatherData;
		var expectedWeatherObj = {
			date: '20th October',
			time: '12.00',
			icon: 'sun',
			forecast: {
				high: 18,
				low: 12,
				wind: 'SSW 9 knots'
			},
			bestDay: 'Mon, Wed & Fri'
		};

		before( function(){
			loadData( 'weather.json' );
		} );

		function loadData( url ) {
			$.ajax({
				url: '/assets//test/spec/data/' + url,
				async: false,
				dataType: 'json'
			}).done( function( response ){
				weatherData = response;
			} );
		}

		describe( 'the Weather data', function(){

			describe( 'the direction generator', function(){

				it('should return the correct directions for given radian values', function(){
					//Setup
					//Work
					//Assertion
					expect().to.equal( 'SSW' );
				});

			} );

		} );

		it("should return the correct output", function() {

			//Setup
			var answer = 'sample';

			//Work



			//Assertion
			// expect(answer).to.equal(result);
			console.log( weatherData );
		});

	});

});


