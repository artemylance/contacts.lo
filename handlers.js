var exec = require("child_process").exec;

function start(response) {
	console.log("Request handler 'start' was called.");

	exec("ls -lah", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
		response.write(stdout);
		response.end();
	});
}
function create(response) {
	console.log("Request handler 'create' was called.");
	var body = '<html>'+
		'<head>'+
	    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    '<form action="/upload" method="post">'+
	    '<textarea name="text" rows="20" cols="60"></textarea>'+
	    '<input type="submit" value="Submit text" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}
function save(response) {
	console.log("Request handler 'create' was called.");
	response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	response.write("Hello Create");
	response.end();
}
function update(response) {
	console.log("Request handler 'update' was called.");
	response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	response.write("Hello Update");
	response.end();
}
function remove(response) {
	console.log("Request handler 'remove' was called.");
	response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	response.write("Hello Remove");
	response.end();
}

exports.start = start;
exports.create = create;
exports.save = save;
exports.update = update;
exports.remove = remove;
