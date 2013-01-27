function setupSlider(widget){
	widget.value = 0;
	widget.x = 150;
	widget.minY = 50;
	widget.maxY = 250;
	widget.stops = 2;
	widget.quant = (widget.maxY - widget.minY)/widget.stops;
	
	function sliderPos(){
		return {
			x:widget.x,
			y:(widget.stops - widget.value)*widget.quant + widget.minY,
		};
	}
	
	var slider = widget.images['tmp-slider.png'];
	
	function draw(pos){
		widget.ctx.setTransform(1, 0, 0, 1, 0, 0)
		widget.ctx.drawImage(widget.images['tmp-slider-bg.png'], 0, 0);
		
		var pos = sliderPos();
		widget.ctx.setTransform(1, 0, 0, 1, pos.x, pos.y)
		widget.ctx.drawImage(slider, -slider.width/2, -slider.height/2);
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
			widget.valueChanged("slider set to " + value);
			
			draw();
		}
	}
	
	draw()
}
