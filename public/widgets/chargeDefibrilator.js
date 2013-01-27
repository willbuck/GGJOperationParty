function setupChargeDefibrilator(widget){
	var buttonState = false;
	var charge = 0.0;
	
	function draw(){
		var ctx = widget.ctx;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 300, 300);
		
		ctx.fillStyle = "white";
		var height = charge*300;
		ctx.fillRect(0, 300 - height, 300, height);
		
		var button = widget.images[buttonState ? 'red-button.png' : 'green-button.png'];
		ctx.setTransform(1, 0, 0, 1, 150, 150)
		ctx.drawImage(button, -button.width/2, -button.height/2);
		
		ctx.fillStyle = "black";
		var size = 30;
		ctx.font = size + "px sans-serif";
		var txt = "Defibrilator";
		ctx.fillText(txt, -ctx.measureText(txt).width/2, size/2);
	}
	
	var timeout = null;
	widget.update = function(dt){
		var rate = (buttonState ? 1 : -1)/1.0;
		var new_charge = Math.clamp01(charge + rate*dt);
		
		if(new_charge != charge){
			charge = new_charge;
			
			if(charge == 1){
				charge = 0;
				widget.valueChanged("Defibrilator charged");
			}
			
			draw();
		}
	}
	
	widget.canvas.onmousedown = function(e){
		buttonState = true;
		draw();
	}
	
	widget.canvas.onmouseup = function(e){
		buttonState = false;
		draw();
	}
	
	draw();
}
