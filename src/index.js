const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig')

const {sendBasicEmail}=require("./service/emailService")

const setupAndStartServer = () => {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    
    sendBasicEmail(
        'support@admin.com',
        'sandeep.iiit2022@gmail.com',
        'This is a testing email',
        'Hey, how are you, I hope you like the support'
    );


})

}

setupAndStartServer();
