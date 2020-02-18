const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(__dirname + '/front-end/dist/'));
app.get('/*', function(req,res){
  res.sendFile('./front-end/dist/index.html');
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('Console Listing ');
