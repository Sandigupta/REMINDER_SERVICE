const sender = require('../config/emailConfig')
const TicketRepository=require('../Repository/ticket-repository')
const repo = new TicketRepository();


const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
    sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const response = await repo.get({status:"PENDING"});
        return response;
      } catch (error) {
          console.log(error);
      }
}

const createNotification = async (data) => {
    try {
        const response = repo.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        // console.log(ticketId);
        // console.log(data);

        const response = repo.update(ticketId, data);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}


/**
 * SMTP ->a@b.com
 * receiver->d@e.com
 * 
 * from:support@noti.com
 */