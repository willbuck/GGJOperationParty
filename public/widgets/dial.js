function setupDial(widget){
	widget.value = 0;
	
	function draw(angle){
		widget.ctx.setTransform(1, 0, 0, 1, 0, 0)
		widget.ctx.drawImage(widget.images['/widgets/tmp-dial-bg.png'], 0, 0);
		
		var c = Math.cos(angle);
		var s = Math.sin(angle);
		widget.ctx.setTransform(c, s, -s, c, 150, 150)
		widget.ctx.drawImage(widget.images['/widgets/tmp-dial.png'], -150, -150);
	}
	
	var dragging = false;
	widget.canvas.onmousedown = function(e){
		var radius = 100;
		var x = e.offsetX - 150;
		var y = e.offsetY - 150;
		if(x*x + y*y < radius*radius){
			dragging = true;
		}
	}
	
	widget.canvas.onmouseup = function(){
		dragging = false;
	}
	
	widget.canvas.onmousemove = function(e){
		if(!dragging) return;
		
		var angle = Math.atan2(e.offsetX - 150, 150 - e.offsetY);
		var clamped = Math.min(Math.max(-Math.PI/2, angle), Math.PI/2) + Math.PI/2;
		
		var quant = Math.PI/4;
		var value = Math.round(clamped/quant);
		
		if(widget.value != value){
			widget.value = value;
			console.log("value set to: " + value);
			
			draw(value*quant);
		}
	}
	
	draw(0)
}
