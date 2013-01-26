function preloadImages(urls, oncomplete){
	var images = {};
	
	function loadImg(i){
		var img = new Image();
		var url = img.src = urls[i];
		
		img.onload = function(){
			images[url] = img;
			console.log("loaded: " + url)
			if(Object.keys(images).length == urls.length){
				oncomplete();
			}
		}
		
		img.onerror = function(){
			console.log("Error loading: " + url);
		}
	}
	
	for(i in urls){setTimeout(loadImg(i), 1)}
	return images;;
}

function setupCanvas(setupComplete){
	var widget = {}
	
	// Prevent scrolling on iOS
	document.ontouchstart = function(e){
		e.preventDefault();
	}
	
	var canvas = widget.canvas = document.getElementsByTagName('canvas')[0];
	var ctx = widget.ctx = canvas.getContext('2d');
	
	ctx.fillStyle = "magenta";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// Emulate mouse input on iOS
	var touchID = null;
	
	canvas.ontouchstart = function(e){
		if(touchID != null) return;
		
		var touch = e.changedTouches[0];
		touchID = touch.identifier;
		if(canvas.onmousedown) canvas.onmousedown(touch);
	}
	
	canvas.ontouchmove = function(e){
		var touches = e.changedTouches;
		for(i=0; i<touches.length; i++){
			var touch = touches[i];
			if(touch.identifier = touchID){
				// Just send it the touch object, it just needs clientX/Y
				if(canvas.onmousemove) canvas.onmousemove(touch);
				if(canvas.onclick) canvas.onclick(touch);
			}
		}
	}
	
	canvas.ontouchend = function(e){
		var touches = e.changedTouches;
		for(i=0; i<touches.length; i++){
			var touch = touches[i];
			if(touch.identifier = touchID){
				if(canvas.onmouseup) canvas.onmouseup(touch);
				touchID = null;
			}
		}
	}
	
	widget.images = preloadImages([
		'tmp-button-up.png',
		'tmp-button-down.png',
		'tmp-dial-bg.png',
		'tmp-dial.png',
		'tmp-slider-bg.png',
		'tmp-slider.png',
		'tmp-bellows.png',
	], function(){
		setupComplete(widget);
	});
}