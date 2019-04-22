const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const config = require('./config/config');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
});

app.listen(8081, function () {
	console.log(`Server start on port ${config.port} ...`);
});
