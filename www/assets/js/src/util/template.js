// util/template
define(
	[
		'jquery',
		'templayed'
	],

	function ( $ ) {

		var Template;

		return {
			compileTemplate: function ( templateId, vars ) {
				var template = $( templateId ).html();
				return templayed(template)(vars);
			},
			compileAndInsertTemplate: function ($container, templateId, vars, action) {
				var compiledTemplate;
				var template = $( templateId ).html();
				var insertionType = action === 'append' ? 'append' : 'html';
				compiledTemplate = this._compileTemplate( template, vars );
				$container[insertionType](compiledTemplate);
			}
		};
	}
);


