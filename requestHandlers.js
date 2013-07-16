var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var path = require("path");

function getHandler(request, response, filepath, config) {
	
	try { 
		console.log(filepath);	
		path.exists(filepath, function(exists){
				if(exists) {
					fs.readFile(filepath, function (err, content) {
						if(err){
							//console.log("500 " + filepath);
							response.writeHead(500);
							response.end("ERROR 500", "utf-8");
						} else {
							//console.log("200 " + filepath);
							response.writeHead(200, {'Content-Type': config.mime_type,  'Content-Length':content.length});
							response.end(content, 'binary');
						}
					});
				} else {
					//console.log("400 " + filepath);
					response.writeHead(404, { 'Content-Type': 'text/html' });
					response.write("<h1>UPS ERROR 404</h1> <br /> The super awsome server is wasn't able to find the file '" + filepath + "' ! Please search in the trash near you!!!");
					response.end();
				}
		});
	} catch(err) {
		//console.log("500 " + filepath);
		response.writeHead(500, { 'Content-Type': 'text/html' });
		response.write("<h1>UPS ERROR 404</h1> <br /> The super awsome server is wasn't able to find the file '" + filepath + "' ! Please search in the trash near you!!!");
		response.end();
	}
}

function postHandler(response, request, filepath, config){



}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		/* Possible error on Windows systems:
		tried to rename to an already existing file */
		fs.rename(files.upload.path, "./tmp/test.png", function(err) {
		if (err) {
			fs.unlink("./tmp/test.png");
			fs.rename(files.upload.path, "./tmp/test.png");
		}
	});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received image:<br/>");
	response.write("<img src='/show' />");
	response.end();
	});
}


exports.getHandler = getHandler;
exports.postHandler = postHandler;
exports.upload = upload;
