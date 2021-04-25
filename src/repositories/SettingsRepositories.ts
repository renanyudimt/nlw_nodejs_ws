import { Repository, EntityRepository } from "typeorm"
import { Setting } from "../entities/Setting"

@EntityRepository(Setting)
class SettingRepository extends Repository<Setting> {}

export { SettingRepository }