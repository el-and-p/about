!function(t){function e(t){var e=t.create("cellsByRow",{columnWidth:100,rowHeight:100});return e.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("rowHeight","outerHeight"),this.cols=Math.floor(this.size.innerWidth/this.columnWidth),this.cols=Math.max(this.cols,1),this.itemIndex=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=this.itemIndex%this.cols,n=Math.floor(this.itemIndex/this.cols),i=e*this.columnWidth,r=n*this.rowHeight;return this.itemIndex++,{x:i,y:r}},e.prototype._getContainerSize=function(){return{height:Math.ceil(this.itemIndex/this.cols)*this.rowHeight}},e}"function"==typeof define&&define.amd?define(["../outlayer"],e):t.CellsByRow=e(t.Outlayer)}(window);
//# sourceMappingURL=cells-by-row.js.map