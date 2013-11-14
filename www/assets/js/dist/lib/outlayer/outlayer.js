!function(t){function e(t,e){for(var n in e)t[n]=e[n];return t}function n(t){return"[object Array]"===c.call(t)}function i(t){var e=[];if(n(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0,r=t.length;r>i;i++)e.push(t[i]);else e.push(t);return e}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,n){return e+"-"+n}).toLowerCase()}function o(n,o,c,p,d,m){function g(t,n){if("string"==typeof t&&(t=s.querySelector(t)),!t||!f(t))return a&&a.error("Bad "+this.settings.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.options),this.option(n);var i=++y;this.element.outlayerGUID=i,b[i]=this,this._create(),this.options.isInitLayout&&this.layout()}function v(t,n){t.prototype[n]=e({},g.prototype[n])}var y=0,b={};return g.prototype.settings={namespace:"outlayer",item:m},g.prototype.options={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(g.prototype,c.prototype),g.prototype.option=function(t){e(this.options,t)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._getItems(this.element.children)},g.prototype._getItems=function(t){for(var e=this._filterFindItemElements(t),n=this.settings.item,i=[],r=0,o=e.length;o>r;r++){var s=e[r],a=new n(s,this,this.options.itemOptions);i.push(a)}return i},g.prototype._filterFindItemElements=function(t){t=i(t);for(var e=this.options.itemSelector,n=[],r=0,o=t.length;o>r;r++){var s=t[r];if(f(s))if(e){d(s,e)&&n.push(s);for(var a=s.querySelectorAll(e),u=0,l=a.length;l>u;u++)n.push(a[u])}else n.push(s)}return n},g.prototype.getItemElements=function(){for(var t=[],e=0,n=this.items.length;n>e;e++)t.push(this.items[e].element);return t},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=p(this.element)},g.prototype._getMeasurement=function(t,e){var n,i=this.options[t];i?("string"==typeof i?n=this.element.querySelector(i):f(i)&&(n=i),this[t]=n?p(n)[e]:i):this[t]=0},g.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},g.prototype._getItemsForLayout=function(t){for(var e=[],n=0,i=t.length;i>n;n++){var r=t[n];r.isIgnored||e.push(r)}return e},g.prototype._layoutItems=function(t,e){if(!t||!t.length)return this.emitEvent("layoutComplete",[this,t]),void 0;this._itemsOn(t,"layout",function(){this.emitEvent("layoutComplete",[this,t])});for(var n=[],i=0,r=t.length;r>i;i++){var o=t[i],s=this._getItemLayoutPosition(o);s.item=o,s.isInstant=e,n.push(s)}this._processLayoutQueue(n)},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(t){for(var e=0,n=t.length;n>e;e++){var i=t[e];this._positionItem(i.item,i.x,i.y,i.isInstant)}},g.prototype._positionItem=function(t,e,n,i){i?t.goTo(e,n):t.moveTo(e,n)},g.prototype._postLayout=function(){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))},g.prototype._getContainerSize=l,g.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var n=this.size;n.isBorderBox&&(t+=e?n.paddingLeft+n.paddingRight+n.borderLeftWidth+n.borderRightWidth:n.paddingBottom+n.paddingTop+n.borderTopWidth+n.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},g.prototype._itemsOn=function(t,e,n){function i(){return r++,r===o&&n.call(s),!0}for(var r=0,o=t.length,s=this,a=0,u=t.length;u>a;a++){var l=t[a];l.on(e,i)}},g.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},g.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},g.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,n=t.length;n>e;e++){var i=t[e];this.ignore(i)}}},g.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,n=t.length;n>e;e++){var i=t[e],r=h(this.stamps,i);-1!==r&&this.stamps.splice(r,1),this.unignore(i)}},g.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=i(t)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var n=this.stamps[t];this._manageStamp(n)}}},g.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},g.prototype._manageStamp=l,g.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,i=p(t),r={left:e.left-n.left-i.marginLeft,top:e.top-n.top-i.marginTop,right:n.right-e.right-i.marginRight,bottom:n.bottom-e.bottom-i.marginBottom};return r},g.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},g.prototype.bindResize=function(){this.isResizeBound||(n.bind(t,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){n.unbind(t,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function t(){e.resize()}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},g.prototype.resize=function(){var t=p(this.element),e=this.size&&t;e&&t.innerWidth===this.size.innerWidth||(this.layout(),delete this.resizeTimeout)},g.prototype.addItems=function(t){var e=this._getItems(t);if(e.length)return this.items=this.items.concat(e),e},g.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},g.prototype.prepended=function(t){var e=this._getItems(t);if(e.length){var n=this.items.slice(0);this.items=e.concat(n),this._resetLayout(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(n)}},g.prototype.reveal=function(t){if(t&&t.length)for(var e=0,n=t.length;n>e;e++){var i=t[e];i.reveal()}},g.prototype.hide=function(t){if(t&&t.length)for(var e=0,n=t.length;n>e;e++){var i=t[e];i.hide()}},g.prototype.getItem=function(t){for(var e=0,n=this.items.length;n>e;e++){var i=this.items[e];if(i.element===t)return i}},g.prototype.getItems=function(t){if(t&&t.length){for(var e=[],n=0,i=t.length;i>n;n++){var r=t[n],o=this.getItem(r);o&&e.push(o)}return e}},g.prototype.remove=function(t){t=i(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var n=0,r=e.length;r>n;n++){var o=e[n];o.remove();var s=h(this.items,o);this.items.splice(s,1)}}},g.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,n=this.items.length;n>e;e++){var i=this.items[e];i.destroy()}this.unbindResize(),delete this.element.outlayerGUID,u&&u.removeData(this.element,this.settings.namespace)},g.data=function(t){var e=t&&t.outlayerGUID;return e&&b[e]},g.create=function(t,n){function i(){g.apply(this,arguments)}return e(i.prototype,g.prototype),v(i,"options"),v(i,"settings"),e(i.prototype.options,n),i.prototype.settings.namespace=t,i.data=g.data,i.Item=function(){m.apply(this,arguments)},i.Item.prototype=new m,i.prototype.settings.item=i.Item,o(function(){for(var e=r(t),n=s.querySelectorAll(".js-"+e),o="data-"+e+"-options",l=0,c=n.length;c>l;l++){var f,h=n[l],p=h.getAttribute(o);try{f=p&&JSON.parse(p)}catch(d){a&&a.error("Error parsing "+o+" on "+h.nodeName.toLowerCase()+(h.id?"#"+h.id:"")+": "+d);continue}var m=new i(h,f);u&&u.data(h,t,m)}}),u&&u.bridget&&u.bridget(t,i),i},g.Item=m,g}var s=t.document,a=t.console,u=t.jQuery,l=function(){},c=Object.prototype.toString,f="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},h=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n;return-1};"function"==typeof define&&define.amd?define(["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],o):t.Outlayer=o(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window);
//# sourceMappingURL=outlayer.js.map