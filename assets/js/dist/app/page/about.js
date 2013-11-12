define("app/ui/testimonials/load",["jquery","util/mediaqueries"],function(t,i){var n,e;return{init:function(){n=this,e=t(".js-masonry"),e.length&&this._initMediaQueries()},_initMediaQueries:function(){i.register([{queries:"screen and (min-width: 660px)",match:function(){void 0===e.data("masonry")&&require(["app/ui/testimonials/testimonials"],function(t){t.init()})}}])}}}),function(t){t.fn.brotator=function(i){var n={animation:"fade",animationSpeed:500,easing:"linear",autorotate:!0,timeout:8e3,content:".content",item:".item",menu:".media-index",menuItem:".media-index-item",menuUpdate:"default",next:".next",previous:".previous",hasMenu:!1,menuClick:!0,hasButtons:!0,contentSetup:null,wait:!0,lazyloader:!1,zIndex:2,complete:null,namespace:null};return this.each(function(){i&&t.extend(n,i);var e=n.namespace+Math.floor(10001*Math.random())||"/"+this.id,a=t(this),o=a.find(n.content),r=o.find(n.item).size();if("destroy"===i){var s=a.data("brotator"),u=a.data("brotator_timer"),c=a.data("brotator_menu"),d=a.data("brotator_buttons"),l=a.data("brotator_content"),f=a.data("namespace");return u&&u.clearAutoTimer.apply(s[0],Array.prototype.splice.call(arguments,1)),c&&c.clearEvents(),d&&d.clearEvents(),l.reset(),t.unsubscribe(f+"/transition/start"),t.unsubscribe(f+"/transition/end"),t.unsubscribe(f+"/lazyloader/get"),t.unsubscribe(f+"/state/updated"),a.data("brotator",""),a.data("brotator_timer",""),a.data("brotator_menu",""),a.data("brotator_buttons",""),a.data("brotator_content",""),a.data("namespace",""),void 0}var m={timeoutID:null,initTriggers:function(){a.on("start.timer.brotator",function(){n.autorotate=!0,m.init.call(m)}),a.on("stop.timer.brotator",function(){n.autorotate=!1,m.clearAutoTimer.call(m)})},clearTriggers:function(){a.off("start.timer.brotator"),a.off("stop.timer.brotator")},init:function(){this.setAutoRotate(),t.subscribe(e+"/transition/start",function(t,i){i&&m.clearAutoTimer()}),t.subscribe(e+"/transition/end",function(){n.autorotate&&m.setAutoRotate()})},setAutoRotate:function(){var i=n.timeout;n.wait||(i=50,n.wait=!0),m.timeoutID=setTimeout(function(){t.publish(e+"/transition/start",[p.next])},i),a.data("timer",m.timeoutID)},clearAutoTimer:function(){var t=a.data("timer");t&&(clearTimeout(t),n.autorotate=!1)}},p={current:0,next:1,previous:r-1,inTransition:!1,updateState:function(i){this.updateProp("current",i);var n=r-1>i?i+1:0,a=0===i?r-1:i-1;this.updateProp("next",n),this.updateProp("previous",a),this.updateProp("inTransition",!1),t.publish(e+"/state/updated",[{next:n,current:p.current}])},updateProp:function(t,i){this[t]=i},init:function(){t.subscribe(e+"/transition/start",function(){p.updateProp("inTransition",!0)}),t.subscribe(e+"/transition/end",function(t){p.updateState(t)})}},h={elem:t(n.menu),init:function(){t.subscribe(e+"/transition/start",function(t){h.updateMenu[n.menuUpdate](t)}),n.menuClick&&this.clickEvent()},clearEvents:function(){h.elem.off("click",n.menuItem)},clickEvent:function(){var i=h.elem;i.on("click",n.menuItem,function(n){if(n.preventDefault(),-1===this.className.indexOf("is-selected")&&!p.inTransition){var a=i.find("li").index(t(this).closest("li"));t.publish(e+"/transition/start",[a,!0])}})},updateMenu:{"default":function(t){var i=h.elem.find(".is-selected"),n=h.elem.find("li").eq(t);i.removeClass("is-selected "),n.find("a").addClass("is-selected ")}}},b={init:function(){this.clickEvent()},nextButton:a.find(n.next),previousButton:a.find(n.previous),clearEvents:function(){t.each([this.nextButton,this.previousButton],function(){t(this).off("click")})},clickEvent:function(){t.each([this.nextButton,this.previousButton],function(){t(this).click(function(i){if(i.preventDefault(),!p.inTransition){var n=-1!==this.className.indexOf("next")?p.next:p.previous;t.publish(e+"/transition/start",[n,!0])}})})}},g={imgCache:{},init:function(){this.initCache(),this.initSubscriptions()},initCache:function(){o.find(n.item).each(function(){var i=t(this);if(i.find("img[data-original]").length){var n=i.find("img").attr("data-original");n&&(g.imgCache[n]=i.find("img")[0])}})},initSubscriptions:function(){t.subscribe(e+"/lazyloader/get",function(t){var i=o.find("li").eq(t.next);i.find("img[data-original]").length&&!g.isImageLoaded(i)&&g.processImg(i)}),t.subscribe(e+"/state/updated",function(t){var i=o.find("li").eq(t.next);i.find("img[data-original]").length&&!g.isImageLoaded(i)&&g.processImg(i)})},processImg:function(t){var i=t.find("img"),n=i.attr("data-original");i[0].src=n},isImageLoaded:function(t){var i=t.find("img");return-1!==i[0].src.indexOf(i.attr("data-original"))},checkCache:function(t){return g.imgCache[t]},getImg:function(t){var i;return g.checkCache(t)?i=g.imgCache[t]:(i=new Image,i.src=t,i.className="rotator-header-image",g.imgCache[t]=i),i},insertImg:function(t,i){t.prepend(i)}},v={count:o.find("li").length,reset:function(){var i=o.find("li").first();o.attr("style",""),o.find("li").each(function(){t(this).attr("style","")}),i.is(".is-selected")||(o.find(".is-selected").removeClass("is-selected"),o.find("li").first().addClass("is-selected"))},init:function(){n.contentSetup&&v.contentSetup[n.contentSetup](),t.subscribe(e+"/transition/start",function(i){a.trigger("brotator.transition.start",{next:i}),n.lazyloader&&t.publish(e+"/lazyloader/get",[{next:i}]),v.animations[n.animation](i)})},postTransition:function(t,i){t.removeClass("is-selected"),i.addClass("is-selected"),n.complete&&n.complete.call(i[0])},contentSetup:{responsive:function(){o.css({width:100*v.count+"%"}),o.find("li").each(function(){t(this).css({width:100/v.count+"%",display:"block"})})}},animations:{fade:function(i){var a=o.find(n.item),r=a.eq(p.current),s=a.eq(i);Modernizr.csstransitions&&Modernizr.csstransforms?(r.removeClass("is-fading-in").addClass("is-fading-out"),setTimeout(function(){s.removeClass("is-fading-out").addClass("is-fading-in")},150),setTimeout(function(){v.postTransition(r,s),t.publish(e+"/transition/end",[i])},1e3)):(r.css({"z-index":1}).animate({opacity:"0"},n.animationSpeed,n.easing),s.css({display:"block",opacity:"0","z-index":n.zIndex}).animate({opacity:"1"},n.animationSpeed,n.easing,function(){r.attr("style",""),v.postTransition(r,s),t.publish(e+"/transition/end",[i])}))},slide:function(i){var a=o.find(n.item),r=a.eq(p.current),s=a.eq(i),u=100*i;Modernizr.csstransitions?(o.css({left:-1*u+"%"}),v.postTransition(r,s),setTimeout(function(){t.publish(e+"/transition/end",[i])},500)):o.animate({left:-1*u+"%"},n.animationSpeed,n.easing,function(){v.postTransition(r,s),t.publish(e+"/transition/end",[i])})}}};return"stopAutoRotate"===i?m.clearAutoTimer.apply(this,Array.prototype.splice.call(arguments,1)):"startAutoRotate"===i?m.setAutoRotate.apply(this,Array.prototype.splice.call(arguments,1)):("string"!=typeof i&&(n.hasMenu&&h.init(),n.hasButtons&&b.init(),n.autorotate&&m.init(),m.initTriggers(),n.lazyloader&&g.init(),p.init(),v.init()),a.data("brotator")||(a.data("brotator",t(this)),a.data("brotator_timer",m),a.data("brotator_menu",h),a.data("brotator_buttons",b),a.data("brotator_content",v),a.data("namespace",e)),void 0)})}}(jQuery),define("brotator",["jquery","easing","pubsub"],function(t){return function(){var i;return i||t.jQuery}}(this)),define("app/ui/rotator/rotator",["jquery","brotator","throttledebounce"],function(t){var i,n,e,a,o;return{init:function(){i=this,n=t(".js-rotator"),e=n.find(".js-rotator__item"),a=n.find(".js-rotator__next, .js-rotator__prev"),o=n.find(".js-rotator__content"),i._setItemPadding(e.first()),i._setAnimationClass(e.first()),i._initEvents(),n.brotator({autorotate:!1,content:".js-rotator__content",item:".js-rotator__item",menu:".js-rotator__menu",menuItem:".js-rotator__menu-item",next:".js-rotator__next",previous:".js-rotator__prev",hasMenu:!0,menuClick:!0,hasButtons:!0,contentSetup:null,complete:function(){}})},_initEvents:function(){n.on("brotator.transition.start",function(t,n){var a=n.next,o=e.eq(a);i._setItemPadding(o)}),t(window).on("resize",t.throttle(250,function(){var t=e.filter(".is-selected");i._setItemPadding(t)})),n.find(".js-next").on("click",this._showNextItem)},_setItemPadding:function(t){var i=t.outerHeight(),n=t.outerWidth(),a=100*(i/n)+"%";e.filter(".is-first-item").removeClass("is-first-item"),o.css({"padding-bottom":a})},_showNextItem:function(t){t.preventDefault(),n.find(".js-rotator__next").trigger("click")},_setAnimationClass:function(t){t.addClass("is-fading-in"),setTimeout(function(){o.addClass("bottom-slide")},500)}}}),define("app/page/about",["jquery","app/ui/testimonials/load","app/ui/rotator/rotator"],function(t,i,n){i.init(),n.init()});
//# sourceMappingURL=about.js.map