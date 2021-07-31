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
        render: (locals) => pug.renderFile(filePath, locals || {}),
    })
    console.log(`테마 ${name}가 로딩되었어요!`)
})

console.log('chromium 실행중...')

puppeteer.launch({
    headless: false
}).then((browser) => {
    const app = express()

    app.get('/:theme', async (req, res) => {
        const query = req.query
        const { theme: themeName } = req.params

        const theme = themes.find((x) => x.name === themeName)

        if (!theme) return res.json({ message: 'invalid theme' })

        const data = theme.render(query)

        const page = await browser.newPage()

        await page.setContent(data)

        const root = (await page.$('#root'))!
        res.setHeader('Content-Type', 'image/png')
        res.end(await root.screenshot())
        await page.close()
    })

    app.listen(config.port, () => console.log('와아 서버 시작!'))
})
