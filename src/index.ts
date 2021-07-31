import express from 'express'
const config = require('../config.json')

const app = express()


app.listen(config.port, () => console.log('와아 서버 시작!'))
