!function(e,t){var n="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e.fn.imagesLoaded=function(i){function r(){var t=e(f),n=e(d);a&&(d.length?a.reject(l,t,n):a.resolve(l)),e.isFunction(i)&&i.call(s,l,t,n)}function o(t,i){t.src===n||-1!==e.inArray(t,c)||(c.push(t),i?d.push(t):f.push(t),e.data(t,"imagesLoaded",{isBroken:i,src:t.src}),u&&a.notifyWith(e(t),[i,l,e(f),e(d)]),l.length===c.length&&(setTimeout(r),l.unbind(".imagesLoaded")))}var s=this,a=e.isFunction(e.Deferred)?e.Deferred():0,u=e.isFunction(a.notify),l=s.find("img").add(s.filter("img")),c=[],f=[],d=[];return e.isPlainObject(i)&&e.each(i,function(e,t){"callback"===e?i=t:a&&a[e](t)}),l.length?l.bind("load.imagesLoaded error.imagesLoaded",function(e){o(e.target,"error"===e.type)}).each(function(i,r){var s=r.src,a=e.data(r,"imagesLoaded");a&&a.src===s?o(r,a.isBroken):r.complete&&r.naturalWidth!==t?o(r,0===r.naturalWidth||0===r.naturalHeight):(r.readyState||r.complete)&&(r.src=n,r.src=s)}):r(),a?a.promise(s):s}}(jQuery);
//# sourceMappingURL=jquery.imagesloaded.js.map