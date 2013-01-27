var preload;
var setupWidget;

(function(){
	function preloadImages(urls, oncomplete){
		var images = {};
		
		function loadImg(url){
			var img = new Image();
			img.src = url;
			
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
			'/widgets/tmp-button-up.png',
			'/widgets/tmp-button-down.png',
			'/widgets/tmp-dial-bg.png',
			'/widgets/tmp-dial.png',
			'/widgets/tmp-slider-bg.png',
			'/widgets/tmp-slider.png',
			'/widgets/tmp-bellows.png',
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
				offsetX:touch.clientX - offset.left,
				offsetY:touch.clientY - offset.top,
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
		
		setupComplete(widget)
	}
})();