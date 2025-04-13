// init project
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, res) {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

app.get("/api", function(req, res) {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

app.get("/api/:date", function (req, res) {
  let dateStr = req.params.date;
  let date;

  if (!isNaN(dateStr)) {
    date = new Date(parseInt(dateStr));
  } else {
    date = new Date(dateStr);
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ 
      unix: date.getTime(),
      utc: date.toUTCString() 
    });
  }
});

var listener = app.listen(3000, "0.0.0.0", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});