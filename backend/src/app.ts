import 'reflect-metadata'
import './repositories/index.ts'
import cors from 'cors'
import express from 'express'

const server = express()
server.use(express.json())
server.use(cors())

server.listen(3000, () => {
    console.log('Server up and running at localhost:3000')
})