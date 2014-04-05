(function(){

	var startBtn = document.getElementById("startBtn");
	var stopBtn = document.getElementById("stopBtn");
	var resetBtn = document.getElementById("resetBtn");

	var canvas = document.getElementById("stage");
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#212121';

	var boxwidth = 5;
	var boxinterval = 2;

	// ctx.fillRect(5,0,boxwidth,80);

	var numofbar = canvas.width/(boxwidth+boxinterval)-1;
	var barheightarr = new Array();
	var woffset = 1;

	//initialize the bar array
	function initializerandomnum() {
		for (var i=0; i<numofbar; ++i) {
			barheightarr[i] = Math.floor(Math.random()*canvas.height);
		}	
	}

	initializerandomnum();


	function drawbars() {
		for (var i=0; i<numofbar; ++i) {
			ctx.fillRect((boxwidth+boxinterval)*i+woffset,0,boxwidth,barheightarr[i]);
		}
	}

	drawbars();


	var iterationtimes = 0;

	function animate() {
		requestID = requestAnimationFrame(animate);

		if (iterationtimes<=numofbar) {
			
			for (var i=1+iterationtimes; i<numofbar; ++i) {
				if (barheightarr[iterationtimes]<barheightarr[i]) {
					var tmp = barheightarr[iterationtimes];
					barheightarr[iterationtimes]=barheightarr[i];
					barheightarr[i] = tmp;
				}
			}

			ctx.clearRect(0,0,canvas.width,canvas.height);

			drawbars();
			iterationtimes++;
		} else {
			cancelAnimationFrame(requestID);
		}
	}


	startBtn.addEventListener('click',function(e){
		e.preventDefault();
		requestID = requestAnimationFrame(animate);
	})

	stopBtn.addEventListener('click',function(e){
		e.preventDefault();
		cancelAnimationFrame(requestID);
	})

	resetBtn.addEventListener('click',function(e){
		e.preventDefault();

		iterationtimes=0;
		initializerandomnum();
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawbars();
	})


}());
