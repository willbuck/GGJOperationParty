widgetFactories.pumpHeart = function setupPump(widget){
    
    widget.type = 'pump';
    widget.name = 'Heart';
    
	var charge = 0.0;
	var buttonState = false;
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = "red";
		ctx.fillRect(0, 0, 300, 300);
		
		ctx.fillStyle = "green";
		var height = charge*300;
		ctx.fillRect(0, 300 - height, 300, height);
		
		var img = widget.images[buttonState ? 'PumpHeart0.png' : 'PumpHeart1.png'];
		ctx.drawImage(img, 0, 0);
	}
	
	widget.update = function(dt){
		var rate = -1.0/3.0;
		var new_charge = Math.clamp01(charge + rate*dt);
		
		if(new_charge != charge){
			charge = new_charge;
			
			if(charge == 1){
				charge = 0;
				widget.valueChanged('Pump');
			}
			
			draw();
		}
	}
	
	widget.canvas.onmousedown = function(e){
		buttonState = true;
		charge = Math.max(charge + 0.2, 0);
		draw();
	}
	
	widget.canvas.onmouseup = function(e){
		buttonState = false;
	}
	
	draw();
}
