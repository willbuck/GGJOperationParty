var TemplateUtil = (function() {
    var loadWidget = function(widgetElement, widgetData) {
        var widget,
            template = Handlebars.templates['canvasWidget'];
        
        $(widgetElement).html(template());
        
        console.log('canvas?', $(widgetElement).find('canvas')[0]);
        
        createWidget($(widgetElement).find('canvas')[0], widgetData);
        
        /*setupWidget($(widgetElement).find('canvas')[0], function (widget) {
            setupButtonPushOn(widget);
        });*/
    };


    var loadGameScreen = function(template, data) {
        console.log('Loading game screen: ' + template);
        var template = Handlebars.templates[template];
        $('#modalContent').html(template(data));
    };
    return {loadWidget: loadWidget, loadGameScreen: loadGameScreen};
})();
