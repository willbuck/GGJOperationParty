function setupButtonMomentary(widget){
	widget.ctx.drawImage(widget.images['tmp-button-up.png'], 0, 0);
	
	widget.canvas.onmousedown = function(e){
		widget.ctx.drawImage(widget.images['tmp-button-down.png'], 0, 0);
	}
	
	widget.canvas.onmouseup = function(e){
		widget.ctx.drawImage(widget.images['tmp-button-up.png'], 0, 0);
	}
}
