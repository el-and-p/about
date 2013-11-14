!function(t,e){function n(e,n){this.pluginName=i,this.element=e,this.options=t.extend({},r,n),this._heightCalc=this.options.outerHeight?"outerHeight":"height",this._tallest=0,this._defaults=r,this._name=i,this._elems=[],this.init()}var i="evenSteven",r={outerHeight:!1,columns:0,selector:"",resize:!1,forceHeight:null,complete:null};n.prototype.init=function(){this.retrieveNodes(),this.runCalculations(),this.options.resize&&(this.initResizeEvent(),this.initTriggers())},n.prototype.runCalculations=function(){this.options.columns?this.setColumnHeights():this.setAllHeights(),this.options.complete&&this.options.complete()},n.prototype.retrieveNodes=function(){var e=this._elems;t(this.element).each(function(){e.push(t(this))})},n.prototype.setAllHeights=function(){this.calculateHeights(),this.setHeights()},n.prototype.setColumnHeights=function(){for(var t=0,e=this._elems.length;e>t;t+=this.options.columns)this.calculateHeights(t),this.setHeights(t)},n.prototype.setHeights=function(t){for(var e=null!=t?t:0,n=null!=t?t+this.options.columns:this._elems.length;n>e;e++){var i=this._elems[e];if(!i)return;this._elems[e].height(this._tallest)}},n.prototype.calculateHeights=function(t){if(this.options.forceHeight)return this._tallest=this.options.forceHeight,void 0;this._tallest=0;for(var e=null!=t?t:0,n=null!=t?t+this.options.columns:this._elems.length;n>e;e++){var i=this._elems[e];if(!i)return;var r=i[this._heightCalc]();r>this._tallest&&(this._tallest=r)}},n.prototype.resetHeights=function(){for(var t=0,e=this._elems.length;e>t;t++){var n=this._elems[t];if(!n)return;n.css("height","")}},n.prototype.update=function(e){e&&(this.options=t.extend({},this.options,e)),this.resetHeights(),this.runCalculations()},n.prototype.runResizeEvent=function(t){t&&t.data&&t.data.plugin&&"evenSteven"===t.data.plugin.pluginName&&t.data.plugin.update()},n.prototype.initResizeEvent=function(){t(e).on("resize",{plugin:this},t.throttle(250,this.runResizeEvent))},n.prototype.removeResizeEvent=function(){t(e).off("resize",this.runResizeEvent)},n.prototype.initTriggers=function(){t(this).on("on.resize.evensteven",this.initResizeEvent),t(this).on("off.resize.evensteven",this.removeResizeEvent)},n.prototype.removeTriggers=function(){t(this).off("on.resize.evensteven",this.initResizeEvent),t(this).off("off.resize.evensteven",this.removeResizeEvent)},n.prototype.removeData=function(){t(this.element).removeData("plugin_"+i)},n.prototype.destroy=function(){this.removeTriggers(),this.removeResizeEvent(),this.resetHeights(),this.removeData()},t.fn[i]=function(e){var r;if("destroy"===e){if(r=t(this).data("plugin_"+i),!r)return;return r.destroy(),void 0}return t.data(this,"plugin_"+i)||(r=new n(this,e),t(this).data("plugin_"+i,r)),r}}(jQuery,window,document);
//# sourceMappingURL=jquery.evensteven.js.map