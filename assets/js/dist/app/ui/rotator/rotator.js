define(["jquery","brotator","throttledebounce"],function(t){var e,i,n,o,s;return{init:function(){e=this,i=t(".js-rotator"),n=i.find(".js-rotator__item"),o=i.find(".js-rotator__next, .js-rotator__prev"),s=i.find(".js-rotator__content"),e._setItemPadding(n.first()),e._setAnimationClass(n.first()),e._initEvents(),i.brotator({autorotate:!1,content:".js-rotator__content",item:".js-rotator__item",menu:".js-rotator__menu",menuItem:".js-rotator__menu-item",next:".js-rotator__next",previous:".js-rotator__prev",hasMenu:!0,menuClick:!0,hasButtons:!0,contentSetup:null,complete:function(){}})},_initEvents:function(){i.on("brotator.transition.start",function(t,i){var o=i.next,s=n.eq(o);e._setItemPadding(s)}),t(window).on("resize",t.throttle(250,function(){var t=n.filter(".is-selected");e._setItemPadding(t)})),i.find(".js-next").on("click",this._showNextItem)},_setItemPadding:function(t){var e=t.outerHeight(),i=t.outerWidth(),o=100*(e/i)+"%";n.filter(".is-first-item").removeClass("is-first-item"),s.css({"padding-bottom":o})},_showNextItem:function(t){t.preventDefault(),i.find(".js-rotator__next").trigger("click")},_setAnimationClass:function(t){t.addClass("is-fading-in"),setTimeout(function(){s.addClass("bottom-slide")},500)}}});
//# sourceMappingURL=rotator.js.map