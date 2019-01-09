var http = require('http');
var url = require('url');
var fileSystem = require('fs');

http.createServer(function (request, response) {

    var pathName = url.parse(request.url).pathname;
    var fileName = "";
    if(pathName == "/todo") {
    fileName = pathName.substr(1) + '.json'; /* lets remove the "/" from the name */
    } else {
        if(pathName == "/index") {
            pathName = "/index";
        }
        fileName = pathName.substr(1) + '.html';
    }


    /* lets try to read the html page found */
    fileSystem.readFile(fileName , callback);

    function callback(err, data) {
        if (err) {
            console.error(err);
            /* Send the HTTP header 
             * HTTP Status: 400 : NOT FOUND
             * Content Type: text/html 
             */
            response.writeHead(400, {'Content-Type': 'text/html'});   
            response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index' });
        }
      
        else {
        var c;
        if(pathName == "/todo") {
            c =  'application/json';
        } else {
            c = 'text/html';
        }

     
         response.writeHead(200, {'Content-Type': c});
         response.write(data.toString());

            
        }     
        
        /* the response is complete */
        response.end();
 //   }

   
}}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/todo');
