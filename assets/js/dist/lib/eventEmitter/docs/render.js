var dust=require("../node_modules/dustjs-linkedin"),fs=require("fs");dust.helper=require("../node_modules/dustjs-helpers"),fs.readFile("docs/api.dust.js",function(t,e){if(t)throw t;dust.loadSource(e),fs.readFile("docs/data.json",function(t,e){if(t)throw t;for(var i=JSON.parse(e),n=[],o=0;o<i.length;o+=1)i[o].isPrivate||i[o].ignore||n.push(i[o]);dust.render("api",n,function(t,e){if(t)throw t;fs.writeFile("docs/api.md",e)})})});
//# sourceMappingURL=render.js.map