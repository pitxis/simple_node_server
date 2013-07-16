var options = {
	handlers : [ 
		{ 
			url: "/img",
			static_dir: "img",
			upload_dir: "uploads",
			mime_type: "image/*" 
		},
		{
			url: "/css",
			static_dir: "css"
		},
		{
			url: "/script",
			static_dir: "scripts",
			mime_type: "application/javascript"
		},
	],
	default_handler : { 
		default_html: "index.html",
		default_upload: "upload"
	},
	port: 8080
}

//dont delete yhis line
exports.options = options;