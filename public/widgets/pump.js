function setupPump(widget){
	var charge = 0.0;
	var pump = widget.images['tmp-bellows.png'];
	
	var bottomEdge = 250;
	var topEdge = bottomEdge - pump.height;
	var topMin = 50;
	var topMax = topEdge;
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 300, 300);
		
		ctx.fillStyle = "white";
		var height = charge*300;
		ctx.fillRect(0, 300 - height, 300, height);
		
		var scale = (bottomEdge - topEdge)/pump.height;
		widget.ctx.setTransform(1, 0, 0, scale, 150, bottomEdge);
		widget.ctx.drawImage(pump, -pump.width/2, -pump.height);
	}
	
	widget.update = function(dt){
		var rate = -1.0/3.0;
		var new_charge = Math.clamp01(charge + rate*dt);
		
		if(new_charge != charge){
			charge = new_charge;
			
			if(charge == 1){
				charge = 0;
				widget.valueChanged("Pumped");
			}
			
			draw();
		}
	}
	
	var dragging = false;
	widget.canvas.onmousedown = function(e){
		if(Math.abs(150 - e.offsetX) < 80 && Math.abs(e.offsetY - topEdge) < 40){
			dragging = true;
		}
	}
	
	widget.canvas.onmouseup = function(){
		dragging = false;
	}
	
	widget.canvas.onmousemove = function(e){
		if(!dragging) return;
		
		var y = e.offsetY;
		var new_top = Math.clamp(y, topMin, topMax);
		charge +=  Math.max(new_top - topEdge, 0)/(topMax - topMin)/4;
		
		topEdge = new_top;
		draw();
	}
	
	draw()
}
