const { error } = require('console');
const express = require('express');
const app = express();
const request = require('request');

// List of websites to which we will send the user's information
const allowedWebsites = ['erp.iitj.ac.in', 'moodle.iitj.ac.in', '127.0.0.1', '192.168.204.129'];

// Verify user's identity based on token
async function searchUsername(token) {
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./sso_iitj/search.py', token]);
  
    return new Promise((resolve, reject) => {
      pyProg.stdout.on('data', function (data) {
        resolve(data.toString());
      });
  
      pyProg.stderr.on('data', function (data) {
        reject(data.toString());
      });
  
      pyProg.on('error', function (error) {
        reject(error);
      });
    });
  }
  


app.get('/sendUserInfo', async (req, res) => {
    console.log(
        'Received request for ' +
        req.query.website +
        ' with token ' +
        req.query.token +
        ' and website_token ' +
        req.query.website_token
    );

    // Check if website is allowed
    if (!allowedWebsites.includes(req.query.website)) {
        res.status(403).json({
            message: 'Your Website is not allowed. Please contact the SSO_IITJ team.'
        });
        console.log(req.query.website);
        console.log("Website is not allowed\n");
        return;
    }

    console.log("Website is allowed\n");

    // Verify user's identity based on token
    const token = req.query.token;

    try {
        const username = await searchUsername(token);
        console.log("Username: " + username);
        var ERROR=false;
        // If the token is not valid, return an error message
        if (username == "None") {
            res.status(400).json({
                message: 'Invalid token. Please tell the user to login again at SSO_IITJ.'
            });
            ERROR=true;
        }
        else {
            res.status(200).json({ message: 'Username is ' + username });
        }

        // Get the user's website_token and send it
        const websiteToken = req.query.website_token;

        // Sending user identity
        const userInfo = {
            username: username,
            website_token: websiteToken,
            error: ERROR
        };

        console.log('Sending user info: ' + JSON.stringify(userInfo) + '\n');

        // Send the JSON object to the other website
        const options = {
            url: 'http://' + req.query.website + ':5455' + '/receiveUserInfo',
            method: 'POST',
            json: true,
            body: userInfo
        };

        request(options, function (error, response, body) {
            if (error) {
                console.error(error);
                res.status(500).json({
                    message: 'Error sending user info to other website'
                });
            } else {
                console.log(body);
                res.json({
                    message: 'User info sent successfully to other website'
                });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred during user info retrieval'
        });
    }
});


app.listen(5454, () => {
    console.log('Server started on port 5454');
});
