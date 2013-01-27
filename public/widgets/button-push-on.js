widgetFactories.buttonPushOn = function setupButtonPushOn(widget){
	var buttonState = false;
	widget.ctx.drawImage(widget.images['tmp-button-up.png'], 0, 0);
	
	widget.canvas.onclick = function(e){
		buttonState = !buttonState;
		if(buttonState){
			widget.ctx.drawImage(widget.images['tmp-button-down.png'], 0, 0);
		} else {
			widget.ctx.drawImage(widget.images['tmp-button-up.png'], 0, 0);
		}
	}
}