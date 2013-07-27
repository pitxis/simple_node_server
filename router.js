var url = require("url");
var mime = require("./mime");
function route(handle, config, response, request) {

	var pathname = url.parse(request.url).pathname;
	var pathP = pathname.match(/(.[^/]+)(.*)/);
	__dirname = config.physical_path ;
	var unHandle = true, tmp_mime = "";

	if(typeof handle[request.method] === "function"){
		console.log(pathP[1]);

		if((pathP && pathP[1])){ 

			for(var i = 0, tmp_handle = []; (tmp_handle = config.handlers[i]); i++)
			{
				if(tmp_handle.url === pathP[1]){

					tmp_mime = mime.mime.get_mime_type(pathP[2], tmp_handle.mime_type);
					handle[request.method](request, response, __dirname + "/" + ((request.method === "GET") ? tmp_handle.static_dir : tmp_handle.upload_dir ) + pathP[2], {mime_type: tmp_mime}); 
					unHandle = false;
				}
			}

		} 
		
		if(unHandle)
			handle[request.method](request, response, __dirname + ((pathP && pathP[1]) ? pathname : config.default_handler.default_html), {mime_type:"text/html"});
		
	} else {
		console.log("ERROR METHOD DOES NOT COMPUTE");
	}

}
exports.route = route;