var http = require("http");

function start(handle, config, route) {
    function onRequest(request, response) {
        route(handle, config, response, request);
    }

console.log(config.port);
    http.createServer(onRequest).listen(config.port);
    console.log("Server has started.");
}
exports.start = start;