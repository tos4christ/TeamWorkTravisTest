var express = require("express");
var cloudinary = require("cloudinary").v2;                                            
var multipart = require("connect-multiparty");                        
var multipartMiddleware = multipart();
//Enter your credentials below                                              
cloudinary.config({cloud_name: "tos4christ", 
api_key: "594949515392786", 
api_secret: "N0E0H0bfxGI_4CEFvgWfwNBjJWY"                       
});

var app = express();

app.post("/sendGif", multipartMiddleware, function(req,res) {    
  console.log(req.files);
  let filename = req.files.file.path;                                                     
  cloudinary.uploader.upload(filename,{ tags: "gotemps",resource_type: "auto" })
    .then(function(file) {                                                                  
      console.log("Public id of the file is  " + file.public_id);                                 
      console.log("Url of the file is  " + file.url);
      res.status(200).json({
        file: file.url
      });
    })
    .catch(function(err) {                                                                  
      if (err) {
    console.warn(err);
    }                
    });                                                     
});

app.listen(5000, () => {
  console.log(`listening on ${app.port} : ${app.host}`);
});