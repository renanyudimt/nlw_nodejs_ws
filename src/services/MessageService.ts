import { MessagesRepository } from "../repositories/MessagesRepository"
import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";

interface IMessageCreate {
  text: string
  admin_id?: string
  user_id: string
}

class MessageService {
  private messagesRepository: Repository<Message>

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ text, user_id, admin_id }: IMessageCreate) {

    const message = await this.messagesRepository.create({
      admin_id,
      text,
      user_id
    })

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"]
    })

    return list;
  }
}

export { MessageService }