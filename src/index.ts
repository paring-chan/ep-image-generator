import express from 'express'
import { themes } from './constants'
import * as fs from 'fs'
import * as path from 'path'
import { Canvas } from 'canvas'

const config = require('../config.json')

Promise.all(
    fs.readdirSync(path.join(__dirname, 'themes')).map(async (x) => {
        const module = require(path.join(__dirname, 'themes', x))

        const name = path.parse(x).name

        if (!module.width || !module.height || !module.render)
            return console.log(`테마 ${name} 로딩 실패..`)

        if (module.init) {
            await module.init()
        }

        themes.push({
            name,
            render: module.render,
            width: module.width,
            height: module.height,
        })
        console.log(`테마 ${name}가 로딩되었어요!`)
    }),
).then(() => {
    const app = express()

    app.get('/:theme', async (req, res) => {
        const query = req.query
        const { theme: themeName } = req.params

        const theme = themes.find((x) => x.name === themeName)

        if (!theme) return res.json({ message: 'invalid theme' })

        const canvas = new Canvas(theme.width, theme.height)

        const data = theme.render(canvas, query)

        if (data) return res.json(data)

        res.setHeader('Content-Type', 'image/png')
        res.send(canvas.toBuffer())
    })

    app.listen(config.port, () => console.log('와아 서버 시작!'))
})
