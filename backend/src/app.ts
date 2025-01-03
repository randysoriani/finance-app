import 'reflect-metadata'
import express from 'express'
import './repositories/index.ts'

const server = express()

server.listen(3000, () => {
    console.log('Server up and running at localhost:3000')
})