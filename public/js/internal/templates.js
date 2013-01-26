console.log('Start handlebars');
var template = Handlebars.templates['test'];
$("#templateDropzone").html(template({playerName: 'Will'}));
console.log('Done handlebars');


