const express = require("express");
const app = express();
const open = require("open");
const port = 5000;

const { google } = require("googleapis");

require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

// console.log(oauth2Client);
const scopes = ["https://www.googleapis.com/auth/calendar"];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
  prompt: "consent",
});
open(authorizationUrl);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/callback", (req, res) => {
  //   set link
  const { code } = req.query;

  if (code) {
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log(err);
        res.send("Error");
        return;
      }
    //   const authToken = oauth2Client.setCredentials(token);
      console.log(token);
      res.send(token);
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
