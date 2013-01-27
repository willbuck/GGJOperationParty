widgetFactories.clear = function setupPump(widget){
    
    widget.type = 'clear';
    widget.name = 'Patient';
    
	var charge = 0.0;
	var slide = 0;
	var slideMax = 75;
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = "red";
		ctx.fillRect(0, 0, 300, 300);
		
		ctx.fillStyle = "green";
		var height = charge*300;
		ctx.fillRect(0, 0, charge*300, 300);
		
		ctx.drawImage(widget.images['clear-bg.png'], 0, 0);
		
		var img = widget.images[slide < slideMax ? 'clear-fg1.png' : 'clear-fg2.png'];
		ctx.drawImage(img, slide, 0);
	}
	
	widget.update = function(dt){
		var rate = (slide == slideMax ? 1 : -1)/0.5;
		var new_charge = Math.clamp01(charge + rate*dt);
		
		if(new_charge != charge){
			charge = new_charge;
			
			if(charge == 1){
				charge = 0;
				widget.valueChanged('Clear');
			}
			
			draw();
		}
	}
	
	var dragged = false;
	widget.canvas.onmousedown = function(e){
		dragged = true;
	}
	
	widget.canvas.onmouseup = function(e){
		dragged = false;
		slide = 0;
		charge = 0;
		draw();
	}
	
	widget.canvas.onmousemove = function(e){
		if(!dragged) return;
		
		slide = Math.clamp(e.offsetX - 150, 0, slideMax);
		draw();
	}
	
	draw();
}
