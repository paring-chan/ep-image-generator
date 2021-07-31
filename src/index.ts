import express from 'express'
import { themes } from './constants'
import * as fs from 'fs'
import * as path from 'path'
import * as pug from 'pug'
import puppeteer from 'puppeteer'
const config = require('../config.json')

fs.readdirSync(path.join(process.cwd(), 'themes')).forEach((x) => {
    const filePath = path.join(process.cwd(), 'themes', x)
    const name = path.parse(x).name
    themes.push({
        name,
        data: pug.compileFile(filePath),
    })
    console.log(`테마 ${name}가 로딩되었어요!`)
})

console.log('chromium 실행중...')

puppeteer.launch({}).then((browser) => {
    const app = express()

    app.get('/:theme', (req, res) => {
        const query = req.query
        const { theme: themeName } = req.params

        const theme = themes.find((x) => x.name === themeName)

        if (!theme) return res.json({ message: 'invalid theme' })

        res.json(req.query)
    })

    app.listen(config.port, () => console.log('와아 서버 시작!'))
})
