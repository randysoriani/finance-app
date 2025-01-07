import { DataSource } from 'typeorm'
import { UsersModel } from './models/users'
import { InstitutionsModel } from './models/institutions'
import { AccountsModel } from './models/account'
import { TransactionsModel } from './models/transactions'

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "P@ssw0rd!",
    database: "finance",
    entities: [ UsersModel, InstitutionsModel, AccountsModel, TransactionsModel ],
    migrations: [ './src/repositories/migrations/*.ts' ]
})

appDataSource.initialize()
    .then(() => console.log('🎲 Connected to database'))
    .catch(err => console.log(err))