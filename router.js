var url = require("url");

function route(handle, config, response, request) {

	var pathname = url.parse(request.url).pathname;
	var pathP = pathname.match(/(.[^/]+)(.*)/);
	__dirname = config.physical_path ;
	var unHandle = true;

	if(typeof handle[request.method] === "function"){
		console.log(pathP[1]);

		if((pathP && pathP[1])){ 

			for(var i = 0, tmp_handle = []; (tmp_handle = config.handlers[i]); i++)
			{
				if(tmp_handle.url === pathP[1]){

				 	var mime = ((tmp_handle && tmp_handle.mime_type) ? tmp_handle.mime_type : "text/html");
					mime = (mime.indexOf("*") > -1 ? mime.substring(0, mime.indexOf("*")) + /[^.]+$/.exec(pathP[pathP.length - 1]) : mime);
					tmp_handle.mime_type = mime;

					
					//console.log(__dirname + "/" + ((request.method === "GET") ? tmp_handle.static_dir : tmp_handle.upload_dir ) + pathP[2]);
					
					handle[request.method](request, response, __dirname + "/" + ((request.method === "GET") ? tmp_handle.static_dir : tmp_handle.upload_dir ) + pathP[2], tmp_handle); 
					unHandle = false;
				}
			}

		} 
		
		//console.log(__dirname + ((pathP && pathP[1]) ? pathname : config.default_handler.default_html));
		if(unHandle)
			handle[request.method](request, response, __dirname + ((pathP && pathP[1]) ? pathname : config.default_handler.default_html), {mime_type:"text/html"});
		
	} else {
		console.log("ERROR METHOD DOES NOT COMPUTE");
	}

}
exports.route = route;