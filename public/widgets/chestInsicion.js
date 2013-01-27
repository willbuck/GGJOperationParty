function setupChestIncision(widget){
	var zipper = 150;
	
	function draw(){
		var ctx = widget.ctx;
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(widget.images['tmp-chest-bg.png'], 0, 0);
		
		var chest = widget.images['tmp-chest-fg.png'];
		ctx.drawImage(chest,
			0, zipper, 300, 300 - zipper,
			0, zipper, 300, 300 - zipper
		);
		
		ctx.setTransform(1, 0, 1, 1, 150, zipper);
		ctx.drawImage(chest,
			0, 0, 150, zipper,
			-150, -zipper, 150, zipper
		);
		
		ctx.setTransform(1, 0, -1, 1, 0, zipper);
		ctx.drawImage(chest,
			150, 0, 150, zipper,
			150, -zipper, 150, zipper
		);
	}
	
	var dragging = false;
	widget.canvas.onmousedown = function(e){
		var x = 150 - e.offsetX;
		var y = zipper - e.offsetY;
		var r = 50;
		if(x*x + y*y < r*r){
			dragging = true;
		}
	}
	
	widget.canvas.onmouseup = function(){
		dragging = false;
	}
	
	widget.canvas.onmousemove = function(e){
		if(!dragging) return;
		
		var y = e.offsetY;
		zipper = y;
		draw();
	}
	
	draw();
}
