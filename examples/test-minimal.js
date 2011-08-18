var Face = require('../build/default/face.node'),
<<<<<<< HEAD
  recognizer = new Face.init();

function getFaces(res) {
  recognizer.img = '/Users/jbresnik/Desktop/hr/john.jpg';
  console.log('In getFaces');
  recognizer.oncomplete = function(faces){
    console.log('In oncomplete');
    res.write("I found " + faces.length + " faces <BR>");
    res.end('Hello World\n');
  };
  recognizer.run();
=======
	recognizer = new Face.init(),
	Canvas = require('../deps/canvas/canvas.js'),
	Image = Canvas.Image,
	canvas = new Canvas(800, 600),
	ctx = canvas.getContext('2d');


function boundFaces(input, faces, res) {
	var img = new Image;

	img.onload = function(){
		ctx.drawImage(img, 0, 0);
	}


	var threshold_false_smile = 15;
	img.src = input;

	for(var i = 0; i < faces.length; i++) {

		res.write('Intensity: '+faces[i].intensity+'<BR>');

		if(faces[i].smile) {
			if(faces[i].intensity > threshold_false_smile) {
				ctx.strokeStyle = 'rgb(0, 255, 0)';
			} else {
				ctx.strokeStyle = 'rgb(255, 0, 0)';
			}
		} else {

			ctx.strokeStyle = 'rgb(255, 0, 0)';
		}

		ctx.strokeRect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
	}
}


function getFaces(res) {

	recognizer.img = './samples/frame4.png';
	recognizer.pathto = '../cascades/';

	recognizer.checkSmile = true;
	recognizer.minsize = 20;

	recognizer.oncomplete = function(faces){

		boundFaces(recognizer.img, faces, res);
		res.write("I found " + faces.length + " faces <BR>");
		res.end('<img src="' + canvas.toDataURL() + '" />');

	};

	recognizer.run();
	
>>>>>>> upstream/master
}

var http = require('http');
http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Getting faces...<BR>");
        getFaces(res);

}).listen(3000);

console.log('Server started on port 3000');
