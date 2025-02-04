// index.js
// where your node app starts

var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for timestamp microservice
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  // If no date is provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the date is a valid Unix timestamp (only numbers)
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Validate date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
