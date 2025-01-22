import 'reflect-metadata'
import './repositories/index.ts'
import cors from 'cors'
import express from 'express'
import { userRouter } from './routes/users.ts'
import { authRouter } from './routes/auth.ts'
import { institutionRouter } from './routes/institutions.ts'
import { accountsRouter } from './routes/accounts.ts'
import { transactionsRouter } from './routes/transactions.ts'
import { isAuthenticated } from './middleware/isAuthenticated.ts'
import { categoriesRouter } from './routes/categories.ts'

const server = express()
server.use(express.json())
server.use(cors())

server.use('/auth', authRouter)
server.use('/users', userRouter)

/** ADMIN ROUTES */
server.use('/institutions', institutionRouter)
server.use('/categories', categoriesRouter)

/** FOR AUTH USERS ONLY */
server.use('/accounts', isAuthenticated, accountsRouter)
server.use('/transactions', isAuthenticated, transactionsRouter)

server.listen(3000, () => {
    console.log('Server up and running at localhost:3000')
})