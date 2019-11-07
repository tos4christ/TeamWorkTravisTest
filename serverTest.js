var Request = require('request');
var fs = require('fs');


var req = Request.post('http://localhost:5000/sendGif', (err, res, body) => {
  if(err) console.error(err);
  console.log('URL: ' + body);
});

var form = req.form();
// form.append('file', 'this is a new text file data', {
//   filename: 'myfile.txt',
//   contentType: 'text/plain'
// });

const filepath = 'C:\Users\Tos4Christ\Downloads\DevCTrainingWithAndela\CAPSTONE-PROJECT\Certificate.jpg';
// option 2
form.append('file', fs.createReadStream('Certificate.jpg'));
