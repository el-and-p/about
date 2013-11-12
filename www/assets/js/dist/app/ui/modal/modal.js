define(["jquery","util/template"],function(t,e){var i,n,o;return{init:function(){i=this,n=t(".js-modal"),o=t(".js-modal__btn"),this._initEvents(),this._initSubscriptions()},_initEvents:function(){o.on("click",this._processClickEvent),n.on("click",".js-modal--animatable__close",this._processCloseEvent),n.on("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionEnd",this._processTransitionEnd)},_initSubscriptions:function(){t.subscribe("/weather/ready",this._renderWeather)},_processClickEvent:function(e){e.preventDefault();var n=t(this).next(".js-modal");n.is("#js-weather__modal")?i._initWeather(n):i._initTwitter(n),i._closeOtherModal(),i._showHideModal(n)},_initWeather:function(t){"false"!==t.attr("data-weather-ready")||t.is("is-visible")||require(["app/ui/weather/data"],function(t){t.init()})},_initTwitter:function(t){"false"!==t.attr("data-twitter-ready")||t.is("is-visible")||require(["twitter"])},_processCloseEvent:function(e){e.preventDefault();var n=t(this).closest(".js-modal");i._showHideModal(n,"remove")},_processTransitionEnd:function(){var e=t(this);e.is(".is-closing")&&e.removeClass("is-closing")},_renderWeather:function(i){var n=e.compileTemplate("#js-template-weather",i),o=t("#js-weather__modal");o.attr("data-weather-ready","true"),o.find(".js-modal__body").html(n)},_showHideModal:function(t,e){var i=e?e:"add";!e&&t.is(".is-visible")&&(i="remove"),t[i+"Class"]("is-visible"),"remove"===i&&t.addClass("is-closing")},_closeOtherModal:function(){n.each(function(){var e=t(this);e.is(".is-visible")&&e.find(".js-modal--animatable__close").trigger("click")})}}});
//# sourceMappingURL=modal.js.map