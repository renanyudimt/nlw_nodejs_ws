import { getCustomRepository, Repository } from "typeorm"
import { UserRepository } from "./../repositories/UserRepositories"
import { User } from "../entities/User"

class UserService {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create(email: string) {
    
    const userExist = await this.userRepository.findOne({ email })

    if (userExist) {
      throw new Error("User already exists.");
    }

    const user = this.userRepository.create({
      email
    })

    await this.userRepository.save(user);

    return user;
  } 

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email })
    return user;
  }

}

export { UserService }