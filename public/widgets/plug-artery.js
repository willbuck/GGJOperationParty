widgetFactories.plugArtery = function setupChargeDefibrilator(widget){
    
    widget.type = 'plugArtery';
    widget.name = 'plug';
    
	var buttonState = false;
	var charge = 0.0;
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, 300, 300);
		ctx.fillStyle = "red";
		ctx.fillRect(0, 0, 300, 300);
		
		ctx.fillStyle = "green";
		var height = charge*300;
		ctx.fillRect(0, 300 - height, 300, height);
		
		ctx.drawImage(widget.images['plug-artery-bg.png'], 0, 0)
		
		if(buttonState){
			var button = widget.images['plug-artery-fg.png'];
			ctx.drawImage(button, 0, 0);
		}
	}
	
	var timeout = null;
	widget.update = function(dt){
		var rate = (buttonState ? 1 : -1)/1.0;
		var new_charge = Math.clamp01(charge + rate*dt);
		
		if(new_charge != charge){
			charge = new_charge;
			
			if(charge == 1){
				charge = 0;
				widget.valueChanged("Plugged");
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
