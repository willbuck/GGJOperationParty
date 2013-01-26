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
	
	var canvas = widget.canvas = document.getElementsByTagName('canvas')[0];
	var ctx = widget.ctx = canvas.getContext('2d');
	
	ctx.fillStyle = "magenta";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
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