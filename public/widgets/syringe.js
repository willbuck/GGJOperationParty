widgetFactories.syringe = function(widget){
	widget.value = 0;
	widget.x = 150;
	widget.minY = 30;
	widget.maxY = 230;
	widget.stops = 5;
	widget.quant = (widget.maxY - widget.minY)/widget.stops;

    widget.type = 'slider';
    widget.name = 'syringe';
	
	function sliderPos(){
		return {
			x:widget.x,
			y:(widget.stops - widget.value)*widget.quant + widget.minY,
		};
	}
	
	var slider = widget.images['syringe-plunger.png'];
	
	function draw(pos){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.drawImage(widget.images['syringe-bg.png'], 0, 0);
		
		var pos = sliderPos();
		ctx.setTransform(1, 0, 0, 1, pos.x, pos.y)
		ctx.drawImage(slider, -slider.width/2, -32);
		
		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.drawImage(widget.images['syringe-fg.png'], 0, 0);
		
		ctx.font = "30px sans-serif";
		ctx.fillStyle = "black";
		ctx.fillText("" + widget.value + " CCs", 25, 150);
	}
	
	var dragging = false;
	widget.canvas.onmousedown = function(e){
		var radius = 40;
		var pos = sliderPos();
		
		var x = e.offsetX - pos.x;
		var y = e.offsetY - pos.y;
		if(x*x + y*y < radius*radius){
			dragging = true;
		}
	}
	
	widget.canvas.onmouseup = function(){
		dragging = false;
	}
	
	widget.canvas.onmousemove = function(e){
		if(!dragging) return;
		
		var y = e.offsetY - widget.minY;
		var clamped = Math.min(Math.max(0, y), widget.maxY - widget.minY);
		var value = widget.stops - Math.round(clamped/widget.quant);
		
		if(widget.value != value){
			widget.value = value;
			widget.valueChanged("syringe to " + value);
			
			draw();
		}
	}
	
	draw();
}
