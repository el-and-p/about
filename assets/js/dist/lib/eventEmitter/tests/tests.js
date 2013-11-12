!function(){function t(t){var e=t.slice(0);return e.sort(function(t,e){return e>t?-1:1}),e.join()}mocha.setup("tdd");var e=chai.assert;suite("getListeners",function(){var t;setup(function(){t=new EventEmitter}),test("initialises the event object and a listener array",function(){t.getListeners("foo"),e.deepEqual(t._events,{foo:[]})}),test("does not overwrite listener arrays",function(){var n=t.getListeners("foo");n.push("bar"),e.deepEqual(t._events,{foo:["bar"]}),t.getListeners("foo"),e.deepEqual(t._events,{foo:["bar"]})}),test("allows you to fetch listeners by regex",function(){var n=[];t.addListener("foo",function(){n.push(1)}),t.addListener("bar",function(){return n.push(2),"bar"}),t.addListener("baz",function(){return n.push(3),"baz"});var i=t.getListeners(/ba[rz]/);e.strictEqual(i.bar.length+i.baz.length,2),e.strictEqual(i.bar[0].listener(),"bar"),e.strictEqual(i.baz[0].listener(),"baz")})}),suite("flattenListeners",function(){var t,n=function(){},i=function(){},s=function(){};setup(function(){t=new EventEmitter}),test("takes an array of objects and returns an array of functions",function(){var r=[{listener:n},{listener:i},{listener:s}],o=t.flattenListeners(r);e.deepEqual(o,[n,i,s])}),test("if given an empty array, an empty array is returned",function(){var n=t.flattenListeners([]);e.deepEqual(n,[])})}),suite("addListener",function(){var n,i=function(){},s=function(){};setup(function(){n=new EventEmitter}),test("adds a listener to the specified event",function(){n.addListener("foo",i),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[i])}),test("does not allow duplicate listeners",function(){n.addListener("bar",i),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[i]),n.addListener("bar",s),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[i,s]),n.addListener("bar",i),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[i,s])}),test("allows you to add listeners by regex",function(){var i=[];n.defineEvents(["bar","baz"]),n.addListener("foo",function(){i.push(1)}),n.addListener(/ba[rz]/,function(){i.push(2)}),n.emitEvent(/ba[rz]/),e.strictEqual(t(i),"2,2")})}),suite("addOnceListener",function(){var t,n,i=function(){n++};setup(function(){t=new EventEmitter,n=0}),test("once listeners can be added",function(){t.addOnceListener("foo",i),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[i])}),test("listeners are only executed once",function(){t.addOnceListener("foo",i),t.emitEvent("foo"),t.emitEvent("foo"),t.emitEvent("foo"),e.strictEqual(n,1)}),test("listeners can be removed",function(){t.addOnceListener("foo",i),t.removeListener("foo",i),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[])}),test("can not cause infinite recursion",function(){t.addOnceListener("foo",function(){n+=1,this.emitEvent("foo")}),t.trigger("foo"),e.strictEqual(n,1)})}),suite("removeListener",function(){var t,n=function(){},i=function(){},s=function(){},r=function(){},o=function(){},a=function(){};setup(function(){t=new EventEmitter}),test("does nothing when the listener is not found",function(){var i=t.getListeners("foo").length;t.removeListener("foo",n),e.lengthOf(t.getListeners("foo"),i)}),test("can handle removing events that have not been added",function(){e.notProperty(t,"_events"),t.removeEvent("foo"),e.property(t,"_events"),e.isObject(t._events)}),test("actually removes events",function(){t.removeEvent("foo"),e.notDeepProperty(t,"_events.foo")}),test("removes listeners",function(){var o=t.getListeners("bar");t.addListener("bar",n),t.addListener("bar",i),t.addListener("bar",s),t.addListener("bar",s),t.addListener("bar",r),e.deepEqual(t.flattenListeners(o),[n,i,s,r]),t.removeListener("bar",s),e.deepEqual(t.flattenListeners(o),[n,i,r]),t.removeListener("bar",a),e.deepEqual(t.flattenListeners(o),[n,i,r]),t.removeListener("bar",n),e.deepEqual(t.flattenListeners(o),[i,r]),t.removeListener("bar",r),e.deepEqual(t.flattenListeners(o),[i]),t.removeListener("bar",i),e.deepEqual(t.flattenListeners(t._events.bar),[])}),test("removes with a regex",function(){t.addListeners({foo:[n,i,s,r,o],bar:[n,i,s,r,o],baz:[n,i,s,r,o]}),t.removeListener(/ba[rz]/,s),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[o,r,s,i,n]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[o,r,i,n]),e.deepEqual(t.flattenListeners(t.getListeners("baz")),[o,r,i,n])})}),suite("getListenersAsObject",function(){var t;setup(function(){t=new EventEmitter,t.addListener("bar",function(){}),t.addListener("baz",function(){})}),test("returns an object for strings",function(){var n=t.getListenersAsObject("bar");e.isObject(n),e.lengthOf(n.bar,1)}),test("returns an object for regexs",function(){var n=t.getListenersAsObject(/ba[rz]/);e.isObject(n),e.lengthOf(n.bar,1),e.lengthOf(n.baz,1)})}),suite("defineEvent",function(){var t;setup(function(){t=new EventEmitter}),test("defines an event when there is nothing else inside",function(){t.defineEvent("foo"),e.isArray(t._events.foo)}),test("defines an event when there are other events already",function(){var n=function(){};t.addListener("foo",n),t.defineEvent("bar"),e.deepEqual(t.flattenListeners(t._events.foo),[n]),e.isArray(t._events.bar)}),test("does not overwrite existing events",function(){var n=function(){};t.addListener("foo",n),t.defineEvent("foo"),e.deepEqual(t.flattenListeners(t._events.foo),[n])})}),suite("defineEvents",function(){var t;setup(function(){t=new EventEmitter}),test("defines multiple events",function(){t.defineEvents(["foo","bar"]),e.isArray(t._events.foo,[]),e.isArray(t._events.bar,[])})}),suite("removeEvent",function(){var t,n=function(){},i=function(){},s=function(){},r=function(){},o=function(){};setup(function(){t=new EventEmitter,t.addListener("foo",n),t.addListener("foo",i),t.addListener("bar",s),t.addListener("bar",r),t.addListener("baz",o),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[n,i]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[s,r]),e.deepEqual(t.flattenListeners(t.getListeners("baz")),[o])}),test("removes all listeners for the specified event",function(){t.removeEvent("bar"),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[n,i]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[]),e.deepEqual(t.flattenListeners(t.getListeners("baz")),[o]),t.removeEvent("baz"),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[n,i]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[]),e.deepEqual(t.flattenListeners(t.getListeners("baz")),[])}),test("removes all events when no event is specified",function(){t.removeEvent(),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[]),e.deepEqual(t.flattenListeners(t.getListeners("baz")),[])}),test("removes listeners when passed a regex",function(){var n=[];t.removeEvent(),t.addListener("foo",function(){return n.push(1),"foo"}),t.addListener("bar",function(){return n.push(2),"bar"}),t.addListener("baz",function(){return n.push(3),"baz"}),t.removeEvent(/ba[rz]/);var i=t.getListeners("foo");e.lengthOf(i,1),e.strictEqual(i[0].listener(),"foo")})}),suite("emitEvent",function(){var n;setup(function(){n=new EventEmitter}),test("executes attached listeners",function(){var t=!1;n.addListener("foo",function(){t=!0}),n.emitEvent("foo"),e.isTrue(t)}),test("executes attached with a single argument",function(){var t=null;n.addListener("bar",function(e){t=e}),n.emitEvent("bar",[50]),e.strictEqual(t,50),n.emit("bar",60),e.strictEqual(t,60)}),test("executes attached with arguments",function(){var t=null;n.addListener("bar2",function(e,n){t=e+n}),n.emitEvent("bar2",[40,2]),e.strictEqual(t,42)}),test("executes multiple listeners",function(){var i=[];n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){i.push(2)}),n.addListener("baz",function(){i.push(3)}),n.addListener("baz",function(){i.push(4)}),n.addListener("baz",function(){i.push(5)}),n.emitEvent("baz"),e.strictEqual(t(i),"1,2,3,4,5")}),test("executes multiple listeners after one has been removed",function(){var i=[],s=function(){i.push("R")};n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){i.push(2)}),n.addListener("baz",s),n.addListener("baz",function(){i.push(3)}),n.addListener("baz",function(){i.push(4)}),n.removeListener("baz",s),n.emitEvent("baz"),e.strictEqual(t(i),"1,2,3,4")}),test("executes multiple listeners and removes those that return true",function(){var i=[];n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){return i.push(2),!0}),n.addListener("baz",function(){return i.push(3),!1}),n.addListener("baz",function(){return i.push(4),1}),n.addListener("baz",function(){return i.push(5),!0}),n.emitEvent("baz"),n.emitEvent("baz"),e.strictEqual(t(i),"1,1,2,3,3,4,4,5")}),test("can remove listeners that return true and also define another listener within them",function(){var i=[];n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){return n.addListener("baz",function(){i.push(2)}),i.push(3),!0}),n.addListener("baz",function(){return i.push(4),!1}),n.addListener("baz",function(){return i.push(5),1}),n.addListener("baz",function(){return i.push(6),!0}),n.emitEvent("baz"),n.emitEvent("baz"),e.strictEqual(t(i),"1,1,2,3,4,4,5,5,6")}),test("executes all listeners that match a regular expression",function(){var i=[];n.addListener("foo",function(){i.push(1)}),n.addListener("bar",function(){i.push(2)}),n.addListener("baz",function(){i.push(3)}),n.emitEvent(/ba[rz]/),e.strictEqual(t(i),"2,3")}),test("global object is defined",function(){n.addListener("foo",function(){e.equal(this,n)}),n.emitEvent("foo")})}),suite("manipulateListeners",function(){var n,i=function(){},s=function(){},r=function(){},o=function(){},a=function(){};setup(function(){n=new EventEmitter}),test("manipulates multiple with an array",function(){n.manipulateListeners(!1,"foo",[i,s,r,o,a]),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[a,o,r,s,i]),n.manipulateListeners(!0,"foo",[i,s]),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[a,o,r]),n.manipulateListeners(!0,"foo",[r,a]),n.manipulateListeners(!1,"foo",[o,i]),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[o,i]),n.manipulateListeners(!0,"foo",[o,i]),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[])}),test("manipulates with an object",function(){n.manipulateListeners(!1,{foo:[i,s,r],bar:o}),n.manipulateListeners(!1,{bar:[a,i]}),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[r,s,i]),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[o,i,a]),n.manipulateListeners(!0,{foo:i,bar:[a,o]}),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[r,s]),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[i]),n.manipulateListeners(!0,{foo:[r,s],bar:i}),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[]),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[])}),test("does not execute listeners just after they are added in another listeners",function(){var i=[];n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){i.push(2)}),n.addListener("baz",function(){i.push(3),n.addListener("baz",function(){i.push(4)})}),n.addListener("baz",function(){i.push(5)}),n.addListener("baz",function(){i.push(6)}),n.emitEvent("baz"),e.strictEqual(t(i),"1,2,3,5,6")})}),suite("addListeners",function(){var n,i=function(){},s=function(){},r=function(){},o=function(){},a=function(){};setup(function(){n=new EventEmitter}),test("adds with an array",function(){n.addListeners("foo",[i,s,r]),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[r,s,i]),n.addListeners("foo",[o,a]),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[r,s,i,a,o])}),test("adds with an object",function(){n.addListeners({foo:i,bar:[s,r]}),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[i]),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[r,s]),n.addListeners({foo:[o],bar:a}),e.deepEqual(n.flattenListeners(n.getListeners("foo")),[i,o]),e.deepEqual(n.flattenListeners(n.getListeners("bar")),[r,s,a])}),test("allows you to add listeners by regex",function(){var i=[];n.defineEvents(["bar","baz"]),n.addListeners("foo",[function(){i.push(1)}]),n.addListeners(/ba[rz]/,[function(){i.push(2)},function(){i.push(3)}]),n.emitEvent(/ba[rz]/),e.strictEqual(t(i),"2,2,3,3")})}),suite("removeListeners",function(){var t,n=function(){},i=function(){},s=function(){},r=function(){},o=function(){};setup(function(){t=new EventEmitter}),test("removes with an array",function(){t.addListeners("foo",[n,i,s,r,o]),t.removeListeners("foo",[i,s]),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[o,r,n]),t.removeListeners("foo",[o,r]),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[n]),t.removeListeners("foo",[n]),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[])}),test("removes with an object",function(){t.addListeners({foo:[n,i,s,r,o],bar:[n,i,s,r,o]}),t.removeListeners({foo:i,bar:[s,r,o]}),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[o,r,s,n]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[i,n]),t.removeListeners({foo:[s],bar:[i,n]}),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[o,r,n]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[])}),test("removes with a regex",function(){t.addListeners({foo:[n,i,s,r,o],bar:[n,i,s,r,o],baz:[n,i,s,r,o]}),t.removeListeners(/ba[rz]/,[s,r]),e.deepEqual(t.flattenListeners(t.getListeners("foo")),[o,r,s,i,n]),e.deepEqual(t.flattenListeners(t.getListeners("bar")),[o,i,n]),e.deepEqual(t.flattenListeners(t.getListeners("baz")),[o,i,n])})}),suite("setOnceReturnValue",function(){var n;setup(function(){n=new EventEmitter}),test("will remove if left as default and returning true",function(){var i=[];n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){return i.push(2),!0}),n.addListener("baz",function(){return i.push(3),!1}),n.addListener("baz",function(){return i.push(4),1}),n.addListener("baz",function(){return i.push(5),!0}),n.emitEvent("baz"),n.emitEvent("baz"),e.strictEqual(t(i),"1,1,2,3,3,4,4,5")}),test("will remove those that return a string when set to that string",function(){var i=[];n.setOnceReturnValue("only-once"),n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){return i.push(2),!0}),n.addListener("baz",function(){return i.push(3),"only-once"}),n.addListener("baz",function(){return i.push(4),1}),n.addListener("baz",function(){return i.push(5),"only-once"}),n.addListener("baz",function(){return i.push(6),!0}),n.emitEvent("baz"),n.emitEvent("baz"),e.strictEqual(t(i),"1,1,2,2,3,4,4,5,6,6")}),test("will not remove those that return a different string to the one that is set",function(){var i=[];n.setOnceReturnValue("only-once"),n.addListener("baz",function(){i.push(1)}),n.addListener("baz",function(){return i.push(2),!0}),n.addListener("baz",function(){return i.push(3),"not-only-once"}),n.addListener("baz",function(){return i.push(4),1}),n.addListener("baz",function(){return i.push(5),"only-once"}),n.addListener("baz",function(){return i.push(6),!0}),n.emitEvent("baz"),n.emitEvent("baz"),e.strictEqual(t(i),"1,1,2,2,3,3,4,4,5,6,6")})}),suite("alias",function(){test("that it works when overwriting target method",function(){var t,n=EventEmitter.prototype.addListener,i=Math.random();EventEmitter.prototype.addListener=function(){t=i};var s=new EventEmitter;s.on(),e.strictEqual(t,i),EventEmitter.prototype.addListener=n})}),mocha.run()}.call(this);
//# sourceMappingURL=tests.js.map