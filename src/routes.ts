import { Router } from "express"
import { SettingController } from "./controllers/SettingController"
import { UserController } from "./controllers/UserController"
import { MessageController } from "./controllers/MessageController"

const routes = Router();
const settingController = new SettingController();
const userController = new UserController();
const messagesController = new MessageController();

routes.post("/settings", settingController.create);
routes.get("/settings/:username", settingController.findByUsername)
routes.put("/settings/:username", settingController.update)

routes.post("/users", userController.create);

routes.post("/messages", messagesController.create)
routes.get("/messages/:id", messagesController.showByUser)

export { routes }