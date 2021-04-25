import { io } from "../http"
import { Socket } from "socket.io"
import { ConnectionService } from "../services/ConnectionService"
import { UserService } from "../services/UserServices"
import { MessageService } from "../services/MessageService"

interface IParmas { 
  text: string;
  email: string
}

io.on("connect", (socket: Socket) => {

  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParmas;
    let user_id = null

    const userExist = await userService.findByEmail(email);

    if (!userExist) {
      //usuario novo entrou no chat e colocou email, entao vou criar um novo email e uma nova conexao
      const user = await userService.create(email);
      user_id = user.id;

      await connectionService.create({
        socket_id,
        user_id: user_id
      })
      

    } else {
      //usuario ja existe, entao vou verificar se ja existe um socket_id, se ja existir, utilizo ela, senao crio uma nova.
      const connection = await connectionService.findByUserId(userExist.id);
      user_id = userExist.id; 

      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id: user_id
        })
      } else {
         connection.socket_id = socket_id;
         await connectionService.create(connection)
      }
    }

    await messageService.create({
      text,
      user_id
    })

    const allMessages = await messageService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  })

  socket.on("client_send_to_admin", async (params) => {
    const { text, socket_admin_id } = params;
    const socket_id = socket.id;

    const { user_id } = await connectionService.findBySocketId(socket.id)

    const message = await messageService.create({
      text,
      user_id
    })

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id
    })
  })
})