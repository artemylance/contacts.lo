var exec = require("child_process").exec,
	fs = require("fs");

function start(response) {
	console.log("Request handler 'create' was called.");
	fs.readFile('./full_calendar.html', function (err, html) {
	    if (err) {
	        throw err;
	    }
		response.writeHeader(200, {"Content-Type": "text/html"});
	    response.write(html);
	    response.end();
	});
}
function create(response) {
	console.log("Request handler 'start' was called.");

	exec("ls -lah", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
		response.write(stdout);
		response.end();
	});
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
function full_calendar(response) {
    console.log("Request handler 'create' was called.");
    fs.readFile('./calendar.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}

exports.start = start;
exports.create = create;
exports.save = save;
exports.update = update;
exports.remove = remove;
exports.full_calendar = full_calendar;
