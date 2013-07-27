
var mime_types = {
    application: {
        //"atom+xml",
        //"ecmascript",
        //"EDIFACT",
        json: "json",
        js: "javascript",
        //"octet-stream",
        ogg: "ogg",
        pdf: "pdf",
        //"postscript",
        //"rdf+xml",
        //"rss+xml",
        //"soap+xml",
        //"font-woff",
        //"xhtml+xml",
        xml: "xml",
        //"xml-dtd",
        //"xop+xml",
        zip: "zip",
        gzip: "gzip"
    },
    image: {
        gif: "gif",
        jpeg: "jpeg",
        jpg: "jpeg",
        pjpeg: "pjpeg",
        png: "png",
        //"svg+xml",
        tiff: "tiff" 
        },
    text: {
        cmd: "cmd",
        css: "css",
        csv: "csv",
        html: "html",
        plain: "plain",
        vcard: "vcard",
        xml: "xml"
        }
};

var mime = {};

mime.lockup = function(file_name){
    return /[^.]+$/.exec(file_name);
}


mime.get_mime_type = function (file_name, mime_type) {

    var type, subtype,
        file_subtype = this.lockup(file_name);
    
    if (mime_type) {
        type = mime_type.split("/")[0];
        subtype = mime_type.split("/")[1];

        if (subtype === "*") {
            if((mime_types[type] && mime_types[type][file_subtype])){
               return (type + "/" + file_subtype);
            }
        }
       
        if ((mime_types[type] && mime_types[type][file_subtype]) ) {
            return (type + "/" + mime_types[type][file_subtype]);
        }
    } 

    console.log("Badly define mime type in config file"); 

    for(var type in mime_types){
        if (mime_types[type][file_subtype]) {
            return (type + "/" + mime_types[type][file_subtype]);
        }
    }

    return "text/html";
}


exports.mime = mime;