function setupPump(widget){
	var pump = widget.images['tmp-bellows.png'];
	
	var bottomEdge = 250;
	var topEdge = bottomEdge - pump.height;
	var topMin = 50;
	var topMax = topEdge;
	
	var halfCycle = false;
	
	function draw(){
		widget.ctx.setTransform(1, 0, 0, 1, 0, 0)
		widget.ctx.drawImage(widget.images['tmp-slider-bg.png'], 0, 0);
		
		var scale = (bottomEdge - topEdge)/pump.height;
		widget.ctx.setTransform(1, 0, 0, scale, 150, bottomEdge);
		widget.ctx.drawImage(pump, -pump.width/2, -pump.height);
	}
	
	var dragging = false;
	widget.canvas.onmousedown = function(e){
		if(Math.abs(150 - e.offsetX) < 50 && Math.abs(e.offsetY - topEdge) < 20){
			dragging = true;
		}
	}
	
	widget.canvas.onmouseup = function(){
		dragging = false;
	}
	
	widget.canvas.onmousemove = function(e){
		if(!dragging) return;
		
		var y = e.offsetY;
		topEdge = Math.min(Math.max(topMin, y), topMax);
		
		halfCycle = halfCycle || topEdge == topMin;
		if(halfCycle && topEdge == topMax){
			halfCycle = false;
			console.log("pumped");
		}
		
		draw();
	}
	
	draw()
}
