const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up body-parser middleware to parse JSON data
app.use(bodyParser.json());

app.post('/receiveUserInfo', (req, res) => {
  // Get the user's information from the request body
  const username = req.body.username;
  const website_token = req.body.website_token;

  // Debugging
  console.log('Received user info from SSO_IITJ');
  console.log('Username: ' + username);
  console.log('Website token: ' + website_token);
  console.log("#####################################");
});

app.listen(5455, () => {
  console.log('Server started on port 5455');
});
