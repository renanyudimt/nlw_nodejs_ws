import { Request, Response } from "express"
import { SettingServices } from "./../services/SettingServices"

class SettingController {

  async create(req: Request, res: Response): Promise<Response> {
    const { chat, username } = req.body;
    const settingServices = new SettingServices()

    try {
      const setting = await settingServices.create({ chat, username });

      return res.status(200).json({
        ...setting,
        success: true
      })
    } catch(err) {
      return res.status(400).json({
        success: false,
        msg: err.message
      })
    }
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const settingsService = new SettingServices();

    try {
      const setting = await settingsService.findByUsername(username);

      return res.status(200).json({
        ...setting,
        success: true
      })
    } catch(err) {
      return res.status(400).json({
        success: false,
        msg: err.message
      })
    } 
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;
    const settingsService = new SettingServices();
    console.log(username);
    try {
      const setting = await settingsService.update(username, chat);

      return res.status(200).json({
        ...setting,
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

export { SettingController }