const express = require('express');
const app = express();
const request = require('request');

// List of websites to which we will send the user's information
const allowedWebsites = ['erp.iitj.ac.in:8080', 'moodle.iitj.ac.in:80','127.0.0.1:5455'];

// Verify user's identity based on token
function searchUsername(token) {
    const profiles = StudentProfile.objects.all();
    for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i];
        const username = profile.get_username_for_token(token);
        if (username) {
            return username;
        }
    }
    return null;
}

app.get('/sendUserInfo', (req, res) => {
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
        res.send("Your Website is not allowed\n Please contact the SSO_IITJ team");
        console.log(req.query.website);
        console.log("Website is not allowed\n");
        return;
    }

    // Verify user's identity based on token
    const token = req.query.token;

    // const username = searchUsername(token);
    const username = "s20180010100"; // Hardcoded for testing

    const ERROR=false;
    // If the token is not valid, return an error message
    if (!username) {
        res.send("Invalid token\n Please tell user to login again at SSO_IITJ");
        username="Please tell user to login again at SSO_IITJ";
        ERROR=true;
    }

    // Get the user's website_token and send it
    const websiteToken = req.query.website_token;

    // Sending user identity
    const userInfo = {
        username: username,
        website_token: websiteToken,
        error: ERROR
    };

    // Send the JSON object to the other website
    const options = {
        url: 'http://' + req.query.website + '/receiveUserInfo',
        method: 'POST',
        json: true,
        body: userInfo
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.send("Error sending user info to other website");
        } else {
            console.log(body);
            res.send("User info sent successfully to other website");
        }
    });

    // Send confirmation log to the user browser
    res.send("User info sent successfully to other website");

});

app.listen(5454, () => {
    console.log('Server started on port 5454');
});
