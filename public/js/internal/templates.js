var loadWidget = function(widgetName, widgetPosition, widgetData) {
    var template = Handlebars.templates[widgetName];
    $(widgetPosition).html(template(widgetData));
};


// Begin
console.log('Start handlebars');
//loadWidget('test', '#templateDropzone', {playerName: 'Joe'});
console.log('Done handlebars');

