define(["implementations"],function(t){return{load:function(e,n,i,r){var o,s,a,u=t[e],l="[object Array]"==Object.prototype.toString.call(u);if(r.isBuild&&l)for(o=0,s=u.length;s>o;o++)u[o].implementation&&n([u[o].implementation],i);else{if(l)for(o=0,s=u.length;s>o;o++){var c=u[o];if(c.isAvailable()){if("undefined"!=typeof c.module)return i(c.module()),void 0;a=c.implementation;break}}else{if("undefined"!=typeof u.module)return i(u.module()),void 0;a=u}n([a],i)}}}});
//# sourceMappingURL=feature.js.map