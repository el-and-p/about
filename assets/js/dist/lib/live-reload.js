define(["socket-io"],function(t){!function(){var e=!0&&localStorage&&console&&console.log&&!0;e&&"yes"===localStorage.getItem("/docpad-livereload/reloaded")&&(localStorage.removeItem("/docpad-livereload/reloaded"),console.log("LiveReloaded at",new Date));var n=function(){var n=t.connect("/docpad-livereload");n.on("regenerated",function(){e&&localStorage.setItem("/docpad-livereload/reloaded","yes"),document.location.reload()})};"undefined"!=typeof t?n():console.log("io is undefined")}()});
//# sourceMappingURL=live-reload.js.map