define(["jquery","pubsub"],function(t){var e=null,i=null,n=null,o=t("#js-weather__modal").data("woeid"),s={tornado:"tornado",tropicalstorm:"lightning-4",hurricane:"wind",severethunderstorms:"lightning-4",thunderstorms:"lightning-4",mixedrainandsnow:"snowy-3",mixedrainandsleet:"snowy-3",mixedsnowandsleet:"snowy-3",freezingdrizzle:"rainy",lightdrizzle:"rainy",drizzle:"rainy",rain:"rainy-4",showersinthevicinity:"rainy-4",freezingrain:"rainy-4",showers:"rainy-4",snowflurries:"snowy-3",lightsnowshowers:"snowy-3",blowingsnow:"snowy-3",snow:"snowy-3",hail:"weather-4",sleet:"weather-4",dust:"windy",foggy:"windy",haze:"windy",smoky:"windy",blustery:"wind",windy:"wind",cold:"snowflake",cloudy:"cloud-2",mostlycloudy:"cloud-2",mostlycloudynight:"cloud-2",mostlycloudyday:"cloud-2",mostlysunny:"sun",partlycloudynight:"cloud-2",partlycloudyday:"cloud-2",clearnight:"moon",sunny:"sun",fair:"sun",fairnight:"moon",fairday:"sun",mixedrainandhail:"rainy-4",hot:"sun",isolatedthunderstorms:"lightning-2",scatteredthunderstorms:"lightning-2",rainshower:"rainy",lightrainshower:"rainy",scatteredshowers:"rainy",scatteredsnowshowers:"rainy",heavysnow:"snowy-3",partlycloudy:"cloud-2",thundershowers:"lightning-2",snowshowers:"snowy-3",isolatedthundershowers:"lightning-2",notavailable:""},r={date:"20th ",time:"12:00",icon:"sun",forecast:{high:18,low:12,wind:"SSW 9 knots"},bestDays:"Mon, Wed & Fri"};return{init:function(){e=new Date,i=this._generateTimestamp(),n="http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D"+o+"&format=json&_maxage=3600&rnd=_"+i,this._retrieveWeather()},_retrieveWeather:function(){var t=this;require(["async!"+n],function(e){t._processResponse(e)})},_processResponse:function(t){this._setForecast(t)},_setForecast:function(e){if(e&&e.query&&e.query.results&&!(e.query.results.channel.description.toLowerCase().indexOf("error")>-1)){var i=e.query.results,n=i.channel,o=n.wind;n.item.condition;var s=n.item.forecast[0],a=this._parseForecast(s.text);r.time=this._currentTime(),r.forecast.high=this._convertToCelsius(s.high)+"°C",r.forecast.low=this._convertToCelsius(s.low)+"°C",r.forecast.text=s.text,r.forecast.wind=this._generateWindData(o),r.date=this._generateDate(s.date),r.bestDays=this._getBestDays(),r.icon=this._getWeatherIcon(a),r.icon||console.log("Icon needed for weather forecast:",a),t.publish("/weather/ready",r)}},_getWeatherIcon:function(t){return s[t]||""},_parseForecast:function(t){return t.toLowerCase().replace(/[\s\(\)]/g,"")},_generateTimestamp:function(){return e.getUTCFullYear()+(e.getUTCMonth()+1+"")+(e.getUTCDate()+1+"")+e.getHours()},_generateDate:function(){var t=e.getDate(),i=e.getMonth();return t+this._getOrdinalSuffix(t)+" "+this._getMonth(i)},_currentTime:function(){var t=1==(e.getMinutes()+"").length?"0"+e.getMinutes():e.getMinutes();return e.getHours()+":"+t},_removeTimeFromResponse:function(t){var e=/\d{1,2}:\d{1,2}\s?(am|pm)\s?/;return t.replace(e,"")},_convertToCelsius:function(t){return Math.round((t-32)/1.8)},_generateWindData:function(t){var e=t.speed,i=t.direction;return this._convertRadiansToDirection(i)+" "+this._convertMilesToKnots(e)},_convertMilesToKnots:function(t){return Math.round(.868976*t)+" knots "},_convertRadiansToDirection:function(t){var e=["N","NE","E","SE","S","SW","W","NW","N"];return e[Math.round(t%360/45)]},_getMonth:function(t){var e=["January","February","March","April","May","June","July","August","September","October","November","December"];return e[t]},_getOrdinalSuffix:function(t){var e=t%100,i=t%10;if(10==e-i)return"th";switch(i){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},_getBestDays:function(){return"Mon, Wed & Fri"}}});
//# sourceMappingURL=data.js.map