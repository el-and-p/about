define(["jquery","util/mediaqueries"],function(t,e){var i;return{init:function(){i=this,this._initMediaQueries()},_initMediaQueries:function(){e.register([{queries:e.queries["nav-small"],shouldDegrade:!1,match:function(){require(["app/ui/nav/small"],function(t){t.init()})},unmatch:function(){require(["app/ui/nav/small"],function(t){t.unbind()})}},{queries:e.queries["nav-large"],shouldDegrade:!0,match:function(){require(["app/ui/nav/large"],function(t){t.init()})},unmatch:function(){require(["app/ui/nav/large"],function(t){t.unbind()})}}])}}});
//# sourceMappingURL=load.js.map