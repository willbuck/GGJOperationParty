widgetFactories.pills = function(widget){
    
    widget.type = 'pills';
    widget.name = 'Pills ';
    
	var redPills, bluePills, greenPills;
	function resetPills(){
		redPills = [];
		for(var i=0; i<10; i++){
			redPills.unshift({x:50 + Math.random()*200, y:50 + Math.random()*200});
		}
		
		bluePills = [];
		for(var i=0; i<10; i++){
			bluePills.push({x:50 + Math.random()*200, y:50 + Math.random()*200});
		}
		
		greenPills = [];
		for(var i=0; i<10; i++){
			greenPills.push({x:50 + Math.random()*200, y:50 + Math.random()*200});
		}
		
		draw();
	}
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 300, 300);
			
		var green = widget.images['green-pill.png'];
		for(var i=greenPills.length - 1; i>=0; i--){
			var pos = greenPills[i];
			ctx.setTransform(1, 0, 0, 1, pos.x, pos.y);
			ctx.drawImage(green, -green.width/2, -green.height/2);
		}
		
		var blue = widget.images['blue-pill.png'];
		for(var i=bluePills.length - 1; i>=0; i--){
			var pos = bluePills[i];
			ctx.setTransform(1, 0, 0, 1, pos.x, pos.y);
			ctx.drawImage(blue, -blue.width/2, -blue.height/2);
		}
		
		var red = widget.images['red-pill.png'];
		for(var i=redPills.length - 1; i>=0; i--){
			var pos = redPills[i];
			ctx.setTransform(1, 0, 0, 1, pos.x, pos.y);
			ctx.drawImage(red, -red.width/2, -red.height/2);
		}
	}
	
	function checkPill(pos, event){
		var x = pos.x - event.offsetX;
		var y = pos.y - event.offsetY;
		var r = 50;
		
		return (x*x + y*y < r*r);
	}
	
	var timeout = null;
	widget.canvas.onmouseup = function(e){
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(resetPills, 3*1e3);
		
		for(var i=0; i<redPills.length; i++){
			if(checkPill(redPills[i], e)){
				redPills.splice(i, 1);
				if(redPills.length == 0) widget.valueChanged("red pills");
				draw();
				return
			} 
		}
		
		for(var i=0; i<bluePills.length; i++){
			if(checkPill(bluePills[i], e)){
				bluePills.splice(i, 1);
				if(bluePills.length == 0) widget.valueChanged("blue pills");
				draw();
				return
			} 
		}
		
		for(var i=0; i<greenPills.length; i++){
			if(checkPill(greenPills[i], e)){
				greenPills.splice(i, 1);
				if(greenPills.length == 0) widget.valueChanged("green pills");
				draw();
				return
			} 
		}
	}
	
	resetPills();
}
