(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['scoreBoard'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"scoreboard\">\n	<div class=\"teams\">\n		<p class=\"team-one-name\">\n			"
    + alias4(((helper = (helper = helpers.teamOneName || (depth0 != null ? depth0.teamOneName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"teamOneName","hash":{},"data":data}) : helper)))
    + "\n		</p>\n			<p class=\"team-one-score\">\n				"
    + alias4(((helper = (helper = helpers.teamOneScore || (depth0 != null ? depth0.teamOneScore : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"teamOneScore","hash":{},"data":data}) : helper)))
    + "\n			</p>\n				\n		<button type=\"button\" id=\"thread-icon\"><i class=\"far fa-comment-alt\"></i></button>\n										\n		<p class=\"team-two-name\">\n			"
    + alias4(((helper = (helper = helpers.teamTwoName || (depth0 != null ? depth0.teamTwoName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"teamTwoName","hash":{},"data":data}) : helper)))
    + "\n		</p>\n			<p class=\"team-two-score\">\n				"
    + alias4(((helper = (helper = helpers.teamTwoScore || (depth0 != null ? depth0.teamTwoScore : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"teamTwoScore","hash":{},"data":data}) : helper)))
    + "\n			<p>\n	</div>		\n</article>\n";
},"useData":true});
})();