//app/ui/weather/data
define(
	[
		'jquery',
		'pubsub'
	],
	function ( $ ) {

		

		//YAHOO WEATHER API http://developer.yahoo.com/weather/
		//Auckland Weather ID from http://woeid.rosselliot.co.nz/lookup/christchurch
		//YQL Lookup to get YAHOO Weather data http://developer.yahoo.com/yql/console/?q=select%20*%20from%20weather.forecast%20where%20location%3D%22UKXX0117%22&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys#h=select%20*%20from%20weather.forecast%20where%20woeid%3D2502265
		var date = null;
		var TIMESTAMP = null;
		var WEATHER_URL = null;
		var degreesCharacter = '&deg;';
		var WOEID = $( '#js-weather__modal' ).data( 'woeid' );

		//Yahoo Weather Icon mapping config
		var weatherIconMap = {
			tornado: 'tornado',
			tropicalstorm: 'lightning-4',
			hurricane: 'wind',
			severethunderstorms: 'lightning-4',
			thunderstorms: 'lightning-4',
			mixedrainandsnow: 'snowy-3',
			mixedrainandsleet: 'snowy-3',
			mixedsnowandsleet: 'snowy-3',
			freezingdrizzle: 'rainy',
			lightdrizzle: 'rainy',
			drizzle: 'rainy',
			rain: 'rainy-4',
			showersinthevicinity: 'rainy-4',
			freezingrain: 'rainy-4',
			showers: 'rainy-4',
			snowflurries: 'snowy-3',
			lightsnowshowers: 'snowy-3',
			blowingsnow: 'snowy-3',
			snow: 'snowy-3',
			hail: 'weather-4',
			sleet: 'weather-4',
			dust: 'windy',
			foggy: 'windy',
			haze: 'windy',
			smoky: 'windy',
			blustery: 'wind',
			windy: 'wind',
			cold: 'snowflake',
			cloudy: 'cloud-2',
			mostlycloudy: 'cloud-2',
			mostlycloudynight: 'cloud-2',
			mostlycloudyday: 'cloud-2',
			mostlysunny: 'sun',
			partlycloudynight: 'cloud-2',
			partlycloudyday: 'cloud-2',
			clearnight: 'moon',
			sunny: 'sun',
			fair: 'sun',
			fairnight: 'moon',
			fairday: 'sun',
			mixedrainandhail: 'rainy-4',
			hot: 'sun',
			isolatedthunderstorms: 'lightning-2',
			scatteredthunderstorms: 'lightning-2',
			rainshower: 'rainy',
			lightrainshower: 'rainy',
			scatteredshowers: 'rainy',
			scatteredsnowshowers: 'rainy',
			heavysnow: 'snowy-3',
			partlycloudy: 'cloud-2',
			thundershowers: 'lightning-2',
			snowshowers: 'snowy-3',
			isolatedthundershowers: 'lightning-2',
			notavailable: ''
		};

		//Once data is returned from Yahoo we populate this object and allow it to be publicly accessed through pubsub message '/weather/ready'
		var weather = {
			date: '20th ',
			time: '12:00',
			icon: 'sun',
			forecast: {
				high: 18,
				low: 12,
				wind: 'SSW 9 knots'
			},
			bestDays: 'Mon, Wed & Fri'
		};

		return {

			init: function () {

				date = new Date();
				TIMESTAMP = this._generateTimestamp();
				WEATHER_URL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D' + WOEID + '&format=json&_maxage=3600&rnd=_' + TIMESTAMP;
				this._retrieveWeather();
			},

			_retrieveWeather: function () {
				var module = this;
				require( ['async!' + WEATHER_URL], function ( response ) {
					module._processResponse( response );
				} );
			},

			_processResponse: function ( response ) {
				this._setForecast( response );
			},

			_setForecast: function ( response ) {
				if ( !response || !response.query || !response.query.results || response.query.results.channel.description.toLowerCase().indexOf('error') > -1) {
					return;
				}
				var results = response.query.results;
				var channel = results.channel;
				var wind = channel.wind;
				var conditions = channel.item.condition;
				var todaysForecast = channel.item.forecast[0];
				var strippedForecast = this._parseForecast( todaysForecast.text );

				weather.time = this._currentTime();
				weather.forecast.high = this._convertToCelsius( todaysForecast.high ) + '°C';
				weather.forecast.low = this._convertToCelsius( todaysForecast.low ) + '°C';
				weather.forecast.text = todaysForecast.text;
				weather.forecast.wind = this._generateWindData( wind );
				weather.date = this._generateDate( todaysForecast.date );
				weather.bestDays = this._getBestDays();
				weather.icon = this._getWeatherIcon( strippedForecast );
				if ( !weather.icon ) {
					console.log( 'Icon needed for weather forecast:', strippedForecast );
				}
				$.publish( '/weather/ready', weather );
			},

			/* UTIL functions used to process the Yahoo Data */
			_getWeatherIcon: function ( forecast ) {
				return weatherIconMap[forecast] || '';
			},

			_parseForecast: function ( forecast ) {
				return forecast.toLowerCase().replace( /[\s\(\)]/g, '' );
			},

			_generateTimestamp: function () {
				return date.getUTCFullYear() + ( date.getUTCMonth() + 1 + '' ) + ( date.getUTCDate() + 1 + '' ) + date.getHours();
			},

			_generateDate: function(){
				var day = date.getDate();
				var month = date.getMonth();
				return day + this._getOrdinalSuffix( day ) + ' ' + this._getMonth( month );
			},

			_currentTime: function () {
				var minutes = ( date.getMinutes() + '' ).length == 1 ? '0' + date.getMinutes() : date.getMinutes();
				return date.getHours() + ':' + minutes;
			},

			_removeTimeFromResponse: function ( dateString ) {
				var reTime = /\d{1,2}:\d{1,2}\s?(am|pm)\s?/;
				return dateString.replace( reTime, '' );
			},

			_convertToCelsius: function ( fahrenheit ) {
				return Math.round( ( fahrenheit - 32 ) / 1.8 );
			},

			_generateWindData: function ( wind ) {
				var speed = wind.speed;
				var direction = wind.direction;
				return this._convertRadiansToDirection( direction ) + ' ' + this._convertMilesToKnots( speed );
			},

			_convertMilesToKnots: function( mph ) {
				return Math.round( mph * 0.868976 ) + ' knots ';
			},

			_convertRadiansToDirection: function( radians ) {
				var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
				return directions[Math.round( (radians % 360) /45 )];
			},

			_getMonth: function( month ){
				var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
				return months[ month ];
			},

			_getOrdinalSuffix: function( day ) {
				var hunRem = day % 100;
				var tenRem = day % 10;

				if ( hunRem - tenRem == 10 )
				{
					return "th";
				}
				switch ( tenRem )
				{
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
				}
			},

			_getBestDays: function(){
				return 'Mon, Wed & Fri';
			}

		};
	}
);
