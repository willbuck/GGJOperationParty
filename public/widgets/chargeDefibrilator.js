widgetFactories.chargeDefibrilator = function setupChargeDefibrilator(widget){
    
    widget.type = 'chargeDefibrilator';
    widget.name = 'Defibrilator';
    
	var buttonState = false;
	var charge = 0.0;
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, 300, 300);
//		ctx.fillStyle = "red";
//		ctx.fillRect(0, 0, 300, 300);
//		
//		ctx.fillStyle = "green";
//		var height = charge*300;
//		ctx.fillRect(0, 300 - height, 300, height);
		
		ctx.drawImage(widget.images['Defib0.png'], 0, 0)
		
		if(buttonState){
			var button = widget.images['DefibButton.png'];
			ctx.setTransform(1, 0, 0, 1, 191, 144)
			ctx.drawImage(button, -button.width/2, -button.height/2);
		}
		
		var meter = widget.images['DefibLevel.png'];
		ctx.setTransform(1, 0, 0, 1, 107, 144)
		ctx.drawImage(meter, -meter.width/2, -meter.height/2, meter.width, charge*meter.height);
	}
	
	var timeout = null;
	widget.update = function(dt){
		var rate = (buttonState ? 1 : -1)/1.0;
		var new_charge = Math.clamp01(charge + rate*dt);
		
		if(new_charge != charge){
			charge = new_charge;
			
			if(charge == 1){
				charge = 0;
				widget.valueChanged("Charge");
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
