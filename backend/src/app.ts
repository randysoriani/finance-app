import 'reflect-metadata'
import './repositories/index.ts'
import cors from 'cors'
import express from 'express'
import { userRouter } from './routes/users.ts'

const server = express()
server.use(express.json())
server.use(cors())
server.use('/users', userRouter)

server.listen(3000, () => {
    console.log('Server up and running at localhost:3000')
})