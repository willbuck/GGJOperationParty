Math.clamp = function(t, min, max){
	return Math.min(Math.max(min, t), max);
}

Math.clamp01 = function(t){
	return Math.clamp(t, 0, 1);
}

var preload;
var setupWidget;

(function(){
	function preloadImages(urls, oncomplete){
		var images = {};
		
		function loadImg(url){
			var img = new Image();
			img.src = "/widgets/" + url;
			
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
		
		for(i=0; i<urls.length; i++){
			setTimeout(loadImg(urls[i]), 1)
		}
		
		return images;
	}
	
	var images;
	
	preload = function(oncomplete){
		images = preloadImages([
			'red-button.png',
			'green-button.png',
			'tmp-bellows.png',
			'tmp-chest-bg.png',
			'tmp-chest-fg.png',
		], oncomplete);
	}
	
	setupWidget = function(canvas, setupComplete){
		// Prevent scrolling on iOS
		document.ontouchstart = function(e){
			e.preventDefault();
		}
		
		var widget = {canvas:canvas, images:images}
		var ctx = widget.ctx = canvas.getContext('2d');
		
		ctx.fillStyle = "magenta";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		// Emulate mouse input on iOS
		var touchID = null;
		
		function convertTouch(touch){
			var offset = $(canvas).offset();
			return {
				offsetX:(touch.clientX - offset.left)*1,
				offsetY:(touch.clientY - offset.top)*1
			}
		}
		
		canvas.ontouchstart = function(e){
			if(touchID != null) return;
			
			var touch = e.changedTouches[0];
			touchID = touch.identifier;
			
			if(canvas.onmousedown) canvas.onmousedown(convertTouch(touch));
		}
		
		canvas.ontouchmove = function(e){
			var touches = e.changedTouches;
			for(i=0; i<touches.length; i++){
				var touch = touches[i];
				if(touch.identifier = touchID){
					if(canvas.onmousemove) canvas.onmousemove(convertTouch(touch));
				}
			}
		}
		
		canvas.ontouchend = function(e){
			var touches = e.changedTouches;
			for(i=0; i<touches.length; i++){
				var touch = touches[i];
				if(touch.identifier = touchID){
					var converted = convertTouch(touch);
					if(canvas.onmouseup) canvas.onmouseup(converted);
					if(canvas.onclick) canvas.onclick(converted);
					touchID = null;
				}
			}
		}
		
		widget.valueChanged = function(value){
			console.log(value);
		}
		
		setupComplete(widget)
		
		function getTime(){
			return (new Date()).getTime()*1e-3;
		}
		
		var lastTime = getTime();
		var timeout = null;
		function update(){
			var time = getTime();
			var dt = time - lastTime;
			widget.update(dt);
			timeout = setTimeout(update, 33);
			
			lastTime = time;
		}
		
		if(widget.update) setTimeout(update, 0);
	}
})();