var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
var config_path = "", physical_path ="";

handle["GET"] = requestHandlers.getHandler;
handle["POST"] = requestHandlers.postHandler;

process.argv.forEach(function(val, index) {
    config_path = (val.indexOf("config") > -1 ? val.substr(val.indexOf("=") + 1, val.length) : config_path);
    physical_path = (val.indexOf("p_path") > -1 ? val.substr(val.indexOf("=") + 1, val.length) : physical_path);
});

if(config_path.length === 0){
	config_path = "./config.js";
}

try{ 
    var config = require(config_path);
    config.options.physical_path = physical_path;
    server.start(handle, config.options, router.route);
} catch (err){
    console.log(err);
    console.log("ERROR, reading config file.");	
}


