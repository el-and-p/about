define(["jquery"],function(t){var e,i,n,o,s,a,r;return{init:function(){function i(){t("#js-megamenu").data("nav")?setTimeout(i,50):(e.initVars(),e.bind())}e=this,i()},initVars:function(){"undefined"==typeof i&&(e=this,i=t("#js-megamenu"),n=i.find(".js-megamenu--dropdown"),o=i.find(".js-megamenu__heading"),s=t(".js-megamenu__toggle"),a=t("#js-megamenu__search"),r=t(".js-search__toggle"))},bind:function(){this._setData(),s.on("click",this._toggleSmallMenu),o.on("click",this._openSubMenuLink),n.on("click",this._openSubMenu),r.on("click",this._toggleSmallSearch)},unbind:function(){s.off("click",this._toggleSmallMenu),o.off("click",this._openSubMenuLink),n.off("click",this._openSubMenu),r.off("click",this._toggleSmallSearch),this._resetMenu(),this._removeData()},_toggleSmallMenu:function(t){t.preventDefault(),a.is(".is-expanded")&&r.trigger("click"),i.toggleClass("is-expanded is-collapsed"),s.toggleClass("is-expanded"),i.is(".is-collapsed")&&i.find(".is-expanded").removeClass("is-expanded")},_toggleSmallSearch:function(t){t.preventDefault(),s.is(".is-expanded")&&s.trigger("click"),a.toggleClass("is-expanded"),r.toggleClass("is-expanded")},_openSubMenu:function(){var e=t(this);e.is(".is-expanded")||i.children(".is-expanded").removeClass("is-expanded"),e.toggleClass("is-expanded")},_openSubMenuLink:function(){n.off("click",this._openSubMenu)},_setData:function(){i.data("nav","true")},_removeData:function(){i.removeData("nav")},_resetMenu:function(){t(".no-touch").length&&i.is(".is-expanded")&&(i.toggleClass("is-expanded is-collapsed"),i.find(".is-expanded").removeClass("is-expanded"))}}});
//# sourceMappingURL=small.js.map