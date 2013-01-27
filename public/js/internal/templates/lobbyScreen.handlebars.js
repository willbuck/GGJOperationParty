(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['lobbyScreen'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <span class=\"waiting\">";
  stack1 = typeof depth0 === functionType ? depth0.apply(depth0) : depth0;
  buffer += escapeExpression(stack1) + "</span>\n    ";
  return buffer;}

  buffer += "<h3>Welcome to Game: ";
  stack1 = depth0.lobby;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3>\n<p>Players currently in lobby:</p>\n<ul>\n    ";
  stack1 = depth0.players;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n<input type=\"button\" class=\"startGame\" value=\"I'm Ready!\">";
  return buffer;});
})();