define(["jquery","templayed"],function(e){return{compileTemplate:function(t,n){var i=e(t).html();return templayed(i)(n)},compileAndInsertTemplate:function(t,n,i,r){var o,s=e(n).html(),a="append"===r?"append":"html";o=this._compileTemplate(s,i),t[a](o)}}});
//# sourceMappingURL=template.js.map