var http = require("http"),
    fs = require("fs"),
  	url = require("url"),
    path = require("path"),
    mime = require("mime"),
  	router = require("./router"),
  	handlers = require("./handlers"),
    port = process.argv[2] || 8888;

var handle = {};
handle["/"] = handlers.start;
handle["/create"] = handlers.create;
handle["/save"] = handlers.save;
handle["/update"] = handlers.update;
handle["/remove"] = handlers.remove;
handle["/full_calendar"] = handlers.full_calendar;

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function start(route, handle) {
  function onRequest(request, response) {
    var parsedUrl = url.parse(request.url),
        pathname = parsedUrl.pathname,
        filename = "." + pathname;
    // console.log("Request for " + pathname + " received.");

    fs.exists(filename, function(exists){
      if(exists && filename != "./") {
        console.log(filename);
        fs.readFile(filename, function(err, data) {
          if (err) {
            console.log(err);
            send404(response);
          } else {
            sendPage(response, filename, data);
          }
        });
      } else {
        route(handle, pathname, response);
      }
    });

  }

  http.createServer(onRequest).listen(parseInt(port, 10));
  console.log("Server has started on " + parseInt(port, 10) + " port.");
}

start(router.route, handle);
