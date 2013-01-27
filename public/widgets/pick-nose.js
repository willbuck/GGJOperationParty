widgetFactories.pickNose = function(widget){
    
    widget.type = 'pickNose';
    widget.name = 'Nose';
	
	var ctx = widget.ctx;
	ctx.clearRect(0, 0, 300, 300);
	ctx.drawImage(widget.images['PickNose0.png'], 0, 0);
	
	widget.canvas.onmousedown = function(e){
		ctx.clearRect(0, 0, 300, 300);
		ctx.drawImage(widget.images['PickNose1.png'], 0, 0);
	}
	
	widget.canvas.onmouseup = function(e){
		ctx.clearRect(0, 0, 300, 300);
		ctx.drawImage(widget.images['PickNose0.png'], 0, 0);
		
		widget.valueChanged('Pick');
	}
}
