!function(t){var e=document.documentElement,i=function(){};e.addEventListener?i=function(t,e,i){t.addEventListener(e,i,!1)}:e.attachEvent&&(i=function(e,i,n){e[i+n]=n.handleEvent?function(){var e=t.event;e.target=e.target||e.srcElement,n.handleEvent.call(n,e)}:function(){var i=t.event;i.target=i.target||i.srcElement,n.call(e,i)},e.attachEvent("on"+i,e[i+n])});var n=function(){};e.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:e.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var o={bind:i,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",o):t.eventie=o}(this),function(t){function e(t){"function"==typeof t&&(e.isReady?t():s.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==o.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var n=0,r=s.length;r>n;n++){var a=s[n];a()}}}function n(n){return n.bind(o,"DOMContentLoaded",i),n.bind(o,"readystatechange",i),n.bind(t,"load",i),e}var o=t.document,s=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],n)):t.docReady=n(t.eventie)}(this),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var n=t.prototype;n.getListeners=function(t){var e,i,n=this._getEvents();if("object"==typeof t){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.flattenListeners=function(t){var e,i=[];for(e=0;e<t.length;e+=1)i.push(t[e].listener);return i},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,i){var n,o=this.getListenersAsObject(t),s="object"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===e(o[n],i)&&o[n].push(s?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,i){var n,o,s=this.getListenersAsObject(t);for(o in s)s.hasOwnProperty(o)&&(n=e(s[o],i),-1!==n&&s[o].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,o,s=t?this.removeListener:this.addListener,r=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)s.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&("function"==typeof o?s.call(this,n,o):r.call(this,n,o));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if("string"===i)delete n[t];else if("object"===i)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.emitEvent=function(t,e){var i,n,o,s,r=this.getListenersAsObject(t);for(o in r)if(r.hasOwnProperty(o))for(n=r[o].length;n--;)i=r[o][n],i.once===!0&&this.removeListener(t,i.listener),s=i.listener.apply(this,e||[]),s===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},n.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof n[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,s=i.length;s>o;o++)if(e=i[o]+t,"string"==typeof n[e])return e}}var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=r.length;i>e;e++){var n=r[e];t[n]=0}return t}function n(t){function n(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var n=s(t);if("none"===n.display)return i();var u={};u.width=t.offsetWidth,u.height=t.offsetHeight;for(var c=u.isBorderBox=!(!a||!n[a]||"border-box"!==n[a]),d=0,l=r.length;l>d;d++){var h=r[d],f=n[h],p=parseFloat(f);u[h]=isNaN(p)?0:p}var m=u.paddingLeft+u.paddingRight,g=u.paddingTop+u.paddingBottom,v=u.marginLeft+u.marginRight,_=u.marginTop+u.marginBottom,y=u.borderLeftWidth+u.borderRightWidth,b=u.borderTopWidth+u.borderBottomWidth,w=c&&o,j=e(n.width);j!==!1&&(u.width=j+(w?0:m+y));var C=e(n.height);return C!==!1&&(u.height=C+(w?0:g+b)),u.innerWidth=u.width-(m+y),u.innerHeight=u.height-(g+b),u.outerWidth=u.width+v,u.outerHeight=u.height+_,u}}var o,a=t("boxSizing");return function(){if(a){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[a]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var n=s(t);o=200===e(n.width),i.removeChild(t)}}(),n}var o=document.defaultView,s=o&&o.getComputedStyle?function(t){return o.getComputedStyle(t,null)}:function(t){return t.currentStyle},r=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],n):t.getSize=n(t.getStyleProperty)}(window),function(t,e){function i(t,e){return t[a](e)}function n(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function o(t,e){n(t);for(var i=t.parentNode.querySelectorAll(e),o=0,s=i.length;s>o;o++)if(i[o]===t)return!0;return!1}function s(t,e){return n(t),i(t,e)}var r,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,n=t.length;n>i;i++){var o=t[i],s=o+"MatchesSelector";if(e[s])return s}}();if(a){var u=document.createElement("div"),c=i(u,"div");r=c?i:s}else r=o;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return r}):window.matchesSelector=r}(this,Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,i,n){function s(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var r=n("transition"),a=n("transform"),u=r&&a,c=!!n("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[r],l=["transform","transition","transitionDuration","transitionProperty"],h=function(){for(var t={},e=0,i=l.length;i>e;e++){var o=l[e],s=n(o);s&&s!==o&&(t[o]=s)}return t}();e(s.prototype,t.prototype),s.prototype._create=function(){this.css({position:"absolute"})},s.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.prototype.getSize=function(){this.size=i(this.element)},s.prototype.css=function(t){var e=this.element.style;for(var i in t){var n=h[i]||i;e[n]=t[i]}},s.prototype.getPosition=function(){var t=o(this.element),e=this.layout.options,i=e.isOriginLeft,n=e.isOriginTop,s=parseInt(t[i?"left":"right"],10),r=parseInt(t[n?"top":"bottom"],10);s=isNaN(s)?0:s,r=isNaN(r)?0:r;var a=this.layout.size;s-=i?a.paddingLeft:a.paddingRight,r-=n?a.paddingTop:a.paddingBottom,this.position.x=s,this.position.y=r},s.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var f=c?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};s.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),s=parseInt(e,10),r=o===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-n,c={},d=this.layout.options;a=d.isOriginLeft?a:-a,u=d.isOriginTop?u:-u,c.transform=f(a,u),this.transition({to:c,onTransitionEnd:this.layoutPosition,isCleaning:!0})},s.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},s.prototype.moveTo=u?s.prototype._transitionTo:s.prototype.goTo,s.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},s.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to),t.onTransitionEnd&&t.onTransitionEnd.call(this)},s.prototype._transition=function(t){var e=this.layout.options.transitionDuration;if(!parseFloat(e))return this._nonTransition(t),void 0;var i=t.to,n=[];for(var o in i)n.push(o);var s={};if(s.transitionProperty=n.join(","),s.transitionDuration=e,this.element.addEventListener(d,this,!1),(t.isCleaning||t.onTransitionEnd)&&(this.onTransitionEnd=function(){t.isCleaning&&this._removeStyles(i),t.onTransitionEnd&&t.onTransitionEnd.call(this)}),t.from){this.css(t.from);var r=this.element.offsetHeight;r=null}this.css(s),this.css(i),this.isTransitioning=!0},s.prototype.transition=s.prototype[r?"_transition":"_nonTransition"],s.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},s.prototype.onotransitionend=function(t){this.ontransitionend(t)},s.prototype.ontransitionend=function(t){t.target===this.element&&(this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1,this.onTransitionEnd&&(this.onTransitionEnd.call(this),delete this.onTransitionEnd),this.emitEvent("transitionEnd",[this]))},s.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var p={transitionProperty:"",transitionDuration:""};return s.prototype.removeTransitionStyles=function(){this.css(p)},s.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},s.prototype.remove=function(){if(!r||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},s.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},s.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:function(){this.css({display:"none"})}})},s.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},s}var n=document.defaultView,o=n&&n.getComputedStyle?function(t){return n.getComputedStyle(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],i):(t.Outlayer={},t.Outlayer.Item=i(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===d.call(t)}function n(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var n=0,o=t.length;o>n;n++)e.push(t[n]);else e.push(t);return e}function o(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,d,f,p,m){function g(t,i){if("string"==typeof t&&(t=r.querySelector(t)),!t||!l(t))return a&&a.error("Bad "+this.settings.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.options),this.option(i);var n=++_;this.element.outlayerGUID=n,y[n]=this,this._create(),this.options.isInitLayout&&this.layout()}function v(t,i){t.prototype[i]=e({},g.prototype[i])}var _=0,y={};return g.prototype.settings={namespace:"outlayer",item:m},g.prototype.options={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(g.prototype,d.prototype),g.prototype.option=function(t){e(this.options,t)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._getItems(this.element.children)},g.prototype._getItems=function(t){for(var e=this._filterFindItemElements(t),i=this.settings.item,n=[],o=0,s=e.length;s>o;o++){var r=e[o],a=new i(r,this,this.options.itemOptions);n.push(a)}return n},g.prototype._filterFindItemElements=function(t){t=n(t);for(var e=this.options.itemSelector,i=[],o=0,s=t.length;s>o;o++){var r=t[o];if(l(r))if(e){p(r,e)&&i.push(r);for(var a=r.querySelectorAll(e),u=0,c=a.length;c>u;u++)i.push(a[u])}else i.push(r)}return i},g.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=f(this.element)},g.prototype._getMeasurement=function(t,e){var i,n=this.options[t];n?("string"==typeof n?i=this.element.querySelector(n):l(n)&&(i=n),this[t]=i?f(i)[e]:n):this[t]=0},g.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},g.prototype._getItemsForLayout=function(t){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i];o.isIgnored||e.push(o)}return e},g.prototype._layoutItems=function(t,e){if(!t||!t.length)return this.emitEvent("layoutComplete",[this,t]),void 0;this._itemsOn(t,"layout",function(){this.emitEvent("layoutComplete",[this,t])});for(var i=[],n=0,o=t.length;o>n;n++){var s=t[n],r=this._getItemLayoutPosition(s);r.item=s,r.isInstant=e,i.push(r)}this._processLayoutQueue(i)},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];this._positionItem(n.item,n.x,n.y,n.isInstant)}},g.prototype._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},g.prototype._postLayout=function(){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))},g.prototype._getContainerSize=c,g.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},g.prototype._itemsOn=function(t,e,i){function n(){return o++,o===s&&i.call(r),!0}for(var o=0,s=t.length,r=this,a=0,u=t.length;u>a;a++){var c=t[a];c.on(e,n)}},g.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},g.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},g.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var n=t[e];this.ignore(n)}}},g.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var n=t[e],o=h(this.stamps,n);-1!==o&&this.stamps.splice(o,1),this.unignore(n)}},g.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n(t)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},g.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},g.prototype._manageStamp=c,g.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,n=f(t),o={left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom};return o},g.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},g.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){i.unbind(t,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function t(){e.resize()}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},g.prototype.resize=function(){var t=f(this.element),e=this.size&&t;e&&t.innerWidth===this.size.innerWidth||(this.layout(),delete this.resizeTimeout)},g.prototype.addItems=function(t){var e=this._getItems(t);if(e.length)return this.items=this.items.concat(e),e},g.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},g.prototype.prepended=function(t){var e=this._getItems(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},g.prototype.reveal=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++){var n=t[e];n.reveal()}},g.prototype.hide=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++){var n=t[e];n.hide()}},g.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];if(n.element===t)return n}},g.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i],s=this.getItem(o);s&&e.push(s)}return e}},g.prototype.remove=function(t){t=n(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,o=e.length;o>i;i++){var s=e[i];s.remove();var r=h(this.items,s);this.items.splice(r,1)}}},g.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];n.destroy()}this.unbindResize(),delete this.element.outlayerGUID,u&&u.removeData(this.element,this.settings.namespace)},g.data=function(t){var e=t&&t.outlayerGUID;return e&&y[e]},g.create=function(t,i){function n(){g.apply(this,arguments)}return e(n.prototype,g.prototype),v(n,"options"),v(n,"settings"),e(n.prototype.options,i),n.prototype.settings.namespace=t,n.data=g.data,n.Item=function(){m.apply(this,arguments)},n.Item.prototype=new m,n.prototype.settings.item=n.Item,s(function(){for(var e=o(t),i=r.querySelectorAll(".js-"+e),s="data-"+e+"-options",c=0,d=i.length;d>c;c++){var l,h=i[c],f=h.getAttribute(s);try{l=f&&JSON.parse(f)}catch(p){a&&a.error("Error parsing "+s+" on "+h.nodeName.toLowerCase()+(h.id?"#"+h.id:"")+": "+p);continue}var m=new n(h,l);u&&u.data(h,t,m)}}),u&&u.bridget&&u.bridget(t,n),n},g.Item=m,g}var r=t.document,a=t.console,u=t.jQuery,c=function(){},d=Object.prototype.toString,l="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},h=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(t,e){var n=t.create("masonry");return n.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},n.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},n.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},n.prototype._getItemLayoutPosition=function(t){t.getSize();var e=Math.ceil(t.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var n=this._getColGroup(e),o=Math.min.apply(Math,n),s=i(n,o),r={x:this.columnWidth*s,y:o},a=o+t.size.outerHeight,u=this.cols+1-n.length,c=0;u>c;c++)this.colYs[s+c]=a;return r},n.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},n.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this.options.isOriginLeft?n.left:n.right,s=o+i.outerWidth,r=Math.floor(o/this.columnWidth);r=Math.max(0,r);var a=Math.floor(s/this.columnWidth);a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?n.top:n.bottom)+i.outerHeight,c=r;a>=c;c++)this.colYs[c]=Math.max(u,this.colYs[c])},n.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},n.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.prototype.resize=function(){var t=this.containerWidth;this.getContainerWidth(),t!==this.containerWidth&&this.layout()},n}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++){var o=t[i];if(o===e)return i}return-1};"function"==typeof define&&define.amd?define("masonry",["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window),define("app/ui/testimonials/testimonials",["jquery","util/mediaqueries","masonry"],function(t,e,i){var n,o,s;return{init:function(){n=this,o=t(".js-masonry"),this._initMediaQueries(),s=new i(o[0],{columnWidth:"li",itemSelector:"li"})},_initMediaQueries:function(){e.register([{queries:"screen and (min-width: 660px)",unmatch:function(){s.destroy()}}])}}});
//# sourceMappingURL=testimonials.js.map