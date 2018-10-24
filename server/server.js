const express = require('express');

const path = require('path');

const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath)); //will pull the only html file inside public folder

app.listen(port,()=>{

    console.log(`Listening on Port ${port}...`);
});

