var TemplateUtil = (function() {
    var loadWidget = function(widgetName, widgetPosition, widgetData) {
        //var template = Handlebars.templates[widgetName];
        //$(widgetPosition).html(template(widgetData));
        var template = Handlebars.templates['canvasWidget'];
        $('#widget1').html(template());
        console.log($('#widget1 canvas')[0]);
        setupWidget($('#widget1 canvas')[0], widgetName);
    };


    var loadGameScreen = function(template, data) {
        console.log('Loading game screen: ' + template);
        var template = Handlebars.templates[template];
        $('#modalContent').html(template(data));
    };
    return {loadWidget: loadWidget, loadGameScreen: loadGameScreen};
})();
