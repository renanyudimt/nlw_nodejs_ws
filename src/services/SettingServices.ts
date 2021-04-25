import { getCustomRepository, Repository, getConnection } from "typeorm"
import { SettingRepository } from "../repositories/SettingsRepositories"
import { Setting } from "../entities/Setting"

interface ISettingServices {
  chat: boolean;
  username: string
}

class SettingServices {
  private settingRepositories: Repository<Setting>;
  
  constructor() {
    this.settingRepositories = getCustomRepository(SettingRepository)
  }

  async create({ chat, username }: ISettingServices ) {
    const userAlreadyExists = await this.settingRepositories.findOne({ username })

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const setting = this.settingRepositories.create({
      chat,
      username
    })
  
    await this.settingRepositories.save(setting);

    return setting;
  }

  async findByUsername(username: string) {
    const settings = await this.settingRepositories.findOne({
      username
    })

    return settings;
  }

  async update(username: string, chat: boolean) {
    const setting = await getConnection()
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", { username })
      .execute();


    return setting;
  }
}

export { SettingServices }