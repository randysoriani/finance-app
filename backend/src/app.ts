import express from 'express'

const server = express()

server.listen(3000, () => {
    console.log('Server up and running at localhost:3000')
})