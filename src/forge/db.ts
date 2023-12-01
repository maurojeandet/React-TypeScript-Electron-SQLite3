import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DBEntity } from '../entities/DBEntity'

const AppDataSource = (path: string) => new DataSource({
    type: 'sqlite',
    database: path,
    entities: [DBEntity],
    synchronize: false,
    logging: false,
})

export default AppDataSource