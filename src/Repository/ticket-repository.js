const { NotificationTicket } = require('../models/index');
const {  Op } = require("sequelize");


class TicketRepository{
    async getAll() {
          try {
              const tickets = await NotificationTicket.findAll();
              return tickets;
          } catch (error) {
              throw error;
          }
    }

    async create(data) {
         try {
             const ticket = await NotificationTicket.create(data);
             return ticket; 
         } catch (error) {
             throw error;
         }
    }

    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async update(TicketId,data) {
        try {
            console.log(TicketId);
            console.log(data);
             const ticket = await NotificationTicket.findByPk(TicketId);
             if (data.status) {
                 ticket.status = data.status;
                 await ticket.save();
             }
            //  console.log(ticket);
             return ticket;
         } catch (error) {
             throw error;
         }
    }
}

module.exports = TicketRepository;