const express = require("express");
const app = express();

app.get('/', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

module.exports = app;