const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig')

const {sendBasicEmail}=require("./service/emailService")

const jobs = require('./utils/job')
const {createChannel} = require('./utils/messageQueue');

const TicketController = require('./controller/ticket-controller');

const setupAndStartServer = async () => {
// app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json()); // Ensures JSON requests are parsed
    app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data

    const channel = await createChannel();
    app.post('/api/v1/tickets', TicketController.create);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    jobs();
    // sendBasicEmail(
    //     'support@admin.com',
    //     'sandeep.iiit2022@gmail.com',
    //     'This is a testing email',
    //     'Hey, how are you, I hope you like the support'
    // );
    
    // cron.schedule('*/2 * * * *', () => {
    //     console.log('running a task every two minutes');
    // });

})
    
}

setupAndStartServer();
