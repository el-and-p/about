define([],function(){function t(t){var e;for(e=0;e<t.length;e+=1)t[e](l)}function e(){var e=c;u&&e.length&&(c=[],t(e))}function n(){u||(u=!0,s&&clearInterval(s),e())}function i(t){return u?t(l):c.push(t),i}var r,o,s,a="undefined"!=typeof window&&window.document,u=!a,l=a?document:null,c=[];if(a){if(document.addEventListener)document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1);else if(window.attachEvent){window.attachEvent("onload",n),o=document.createElement("div");try{r=null===window.frameElement}catch(f){}o.doScroll&&r&&window.external&&(s=setInterval(function(){try{o.doScroll(),n()}catch(t){}},30))}"complete"===document.readyState&&n()}return i.version="2.0.1",i.load=function(t,e,n,r){r.isBuild?n(null):i(n)},i});
//# sourceMappingURL=domReady.js.map