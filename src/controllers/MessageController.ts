import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

class MessageController {
  async create(req: Request, res: Response) {
    const messageService = new MessageService();
    const { admin_id, text, user_id } = req.body;

    try {

      const message = await messageService.create({ 
        text,
        user_id,
        admin_id,
      })

      return res.status(200).json({
        success: true,
        ...message
      })

    } catch(err) {
      return res.status(400).json({
        success: true,
        msg: err.message
      })
    }
  }

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;

    const messageService = new MessageService();

    try {
      const list = await messageService.listByUser(id)

      return res.status(200).json({
        ...list,
        success: true,
      })
      
    } catch(err) {
      return res.status(400).json({
        msg: err.msg,
        success: false,
      })
    }
  }
}

export { MessageController }