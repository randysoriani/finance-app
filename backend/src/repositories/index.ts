import { DataSource } from 'typeorm'

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "P@ssw0rd!",
    database: "finance",
    entities: [ ],
    migrations: [ './src/repositories/migrations/*.ts' ]
})

appDataSource.initialize()
    .then(() => console.log('🎲 Connected to database'))
    .catch(err => console.log(err))