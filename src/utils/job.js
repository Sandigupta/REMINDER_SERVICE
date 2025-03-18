const cron = require('node-cron');
const emailService = require('../service/emailService');
const sender = require('../config/emailConfig');
const { response } = require('express');

/**
 * 10:00 am
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent by now and is pending
 */

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        // console.log('running a task every two minutes');
        console.log(response);
        response.forEach((email)=> {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.Subject,
                text: email.Content
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await emailService.updateTicket(email.id, { status: "SUCCESS" });
                }
            })
        });
        console.log(response);
    });
}

module.exports = setupJobs;