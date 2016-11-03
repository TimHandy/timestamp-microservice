// init project
var express = require('express');
var app = express();

function createNaturalDate(dateObject) {
  let month = dateObject.getMonth();
  let date = dateObject.getDate();
  let year = dateObject.getFullYear();
  let monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];
  let naturalDate = monthNames[month] + ' ' + date + ', ' + year;
  return naturalDate;
}

app.get("/:time", function (req, res) {
  // grab the param value (date we hope)
  let time = req.params.time;
  console.log(req.params.time);
  // if param val is a unix timestamp or natural language date
  let unixTime;
  let naturalDate;
  if (time.match(/[0-9]+/)[0].split('').length === time.length) {
    unixTime = time;
    let dateObject = new Date(time * 1000);
    naturalDate = createNaturalDate(dateObject);
    
  } else if (Date.parse(time)) {
    let dateObject = new Date(time);
    unixTime = Date.parse(time) / 1000;
    naturalDate = createNaturalDate(dateObject);
  } else {
    unixTime = null;
    naturalDate = null;
  }
  
  let output = { 
    "unix": unixTime, 
    "natural": naturalDate
  };
   res.send(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});