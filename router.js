function route(handle, pathname, response) {
	// console.log(pathname);
	if (typeof handle[pathname] === 'function') {
    	handle[pathname](response);
  	} else {
	    console.log("No request handler found for " + pathname);
    	response.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
    	response.write("404 Not found");
    	response.end();
  	}
}

exports.route = route;
