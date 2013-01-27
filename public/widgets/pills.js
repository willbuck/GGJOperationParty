widgetFactories.pills = function(widget){
	var redPills, bluePills, greenPills;
	function resetPills(){
		redPills = [
			{x:50, y:50},
			{x:150, y:50},
			{x:250, y:250},
		];
		
		bluePills = [
			{x:250, y:50},
			{x:150, y:150},
			{x:150, y:250},
		];
		
		greenPills = [
			{x:50, y:250},
			{x:50, y:150},
			{x:250, y:150},
		];
	}
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(widget.images['tmp-slider-bg.png'], 0, 0);
		
		var red = widget.images['red-pill.png'];
		for(var i=0; i<redPills.length; i++){
			var pos = redPills[i];
			ctx.setTransform(1, 0, 0, 1, pos.x, pos.y);
			ctx.drawImage(red, -red.width/2, -red.height/2);
		}
			
		var blue = widget.images['blue-pill.png'];
		for(var i=0; i<bluePills.length; i++){
			var pos = bluePills[i];
			ctx.setTransform(1, 0, 0, 1, pos.x, pos.y);
			ctx.drawImage(blue, -blue.width/2, -blue.height/2);
		}
			
		var green = widget.images['green-pill.png'];
		for(var i=0; i<greenPills.length; i++){
			var pos = greenPills[i];
			ctx.setTransform(1, 0, 0, 1, pos.x, pos.y);
			ctx.drawImage(green, -green.width/2, -green.height/2);
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
		timeout = setTimeout(resetPills, 3.0*1e3);
		
		for(var i=0; i<redPills.length; i++){
			if(checkPill(redPills[i], e)){
				redPills.splice(i, 1);
				draw();
				return
			} 
		}
	}
	
	resetPills();
	draw();
}
