var Face = require('../build/default/face.node'),
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
}

var http = require('http');
http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Getting faces...<BR>");
        getFaces(res);

}).listen(3000);

console.log('Server started on port 3000');
