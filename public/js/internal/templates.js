var loadWidget = function(widgetName, widgetPosition, widgetData) {
    var template = Handlebars.templates[widgetName];
    $(widgetPosition).html(template(widgetData));
};

var loadGameScreen = function(template, data) {
    console.log('Loading game screen: ' + template);
    var template = Handlebars.templates[template];
    $('#modalContent').html(template(data));
};

// Begin
console.log('Start handlebars');

console.log('Done handlebars');

