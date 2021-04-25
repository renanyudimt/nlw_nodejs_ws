import { Request, Response } from "express"
import { UserService } from "../services/UserServices"

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userService = new UserService();
    const { email } = req.body;

    try { 
      const user = await userService.create(email)
      return res.status(200).json({
        ...user,
        success: true
      })
    } catch(err) {
      return res.status(400).json({
        success: false,
        msg: err.message
      })
    }
  }
}

export { UserController }