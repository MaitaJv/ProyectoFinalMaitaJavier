import ticketModel from "./models/ticket.js";

export class TicketManager{
    async  createTicket(purchase_datetime, amount, purchaser){
        try {
            console.log({purchase_datetime, amount, purchaser})
            let ticket = {
                purchase_datetime: purchase_datetime,
                amount: amount,
                purchaser: purchaser
            }
            return await ticketModel.create(ticket)
        } catch (error) {
            console.log(error);
        }
    }
}