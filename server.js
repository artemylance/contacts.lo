var http = require("http"),
	url = require("url"),
	router = require("./router"),
	handlers = require("./handlers");

var handle = {};
handle["/"] = handlers.start;
handle["/create"] = handlers.create;
handle["/save"] = handlers.save;
handle["/update"] = handlers.update;
handle["/remove"] = handlers.remove;
handle["/full_calendar"] = handlers.full_calendar;

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    // console.log("Request for " + pathname + " received.");

    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

start(router.route, handle);
