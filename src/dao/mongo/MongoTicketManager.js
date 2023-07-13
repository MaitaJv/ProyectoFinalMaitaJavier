import ticketModel from "./models/ticket.js";

export class TicketManager{
    async  createTicket(purchase_datetime, amount, purchaser){
        try {
            console.log({purchase_datetime, amount, purchaser})
            return await ticketModel.create({purchase_datetime, amount, purchaser})
        } catch (error) {
            console.log(error);
        }
    }
}