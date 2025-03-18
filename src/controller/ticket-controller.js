const TicketService = require('../service/emailService');

const create = async (req, res) => {
    // console.log(req.body);
    try {
        // console.log(req.body);
          const response = await TicketService.createNotification(req.body);
          return res.status(201).send({
              success: true,
              data: response,
              err: {},
              message:'Successfully register the email reminder'
          })
      } catch (error) {
          return res.status(500).json({
              success: false,
              data: {},
              err: error,
              message:'unable to regisgter an email reminder'
          })
      }
}

module.exports = {
    create
}