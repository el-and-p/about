!function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (!d.getElementById(id)) {
		js = d.createElement(s); js.id = id;
		js.src = "http://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);
	}
} (document, "script", "twitter-wjs");
var options = {
	"url": "/assets/css/ui/objects/plugins/twitter-iframe.css"
};
CustomizeTwitterWidget(options);
