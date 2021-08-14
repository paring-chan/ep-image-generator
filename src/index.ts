import express from 'express'
import { assetsPath, themes } from './constants'
import * as fs from 'fs'
import * as pfs from 'fs/promises'
import * as path from 'path'
import { fabric } from 'fabric'
import { Text } from 'fabric/fabric-impl'
import { josa } from 'josa'
import { registerFont } from 'canvas'

registerFont(path.join(assetsPath, 'NotoSansKR-Bold.otf'), {
    family: 'Noto Sans KR Bold',
})

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

const config = require('../config.json')

const themesDir = path.join(__dirname, '../skins')

const urlRegex = /^data:.+\/(.+);base64,(.*)$/

Promise.all(
    fs.readdirSync(themesDir).map(async (x) => {
        const rarities = await pfs.readdir(path.join(themesDir, x))
        let res = []
        for (const rarity of rarities) {
            const module = require(path.join(themesDir, x, rarity))
            res.push({
                rarity: path.basename(rarity).split('.').shift(),
                data: module,
            })
        }
        themes.push({
            name: x,
            rarities: res,
        })
    }),
).then(() => {
    const app = express()

    app.get('/fish/:theme', async (req, res) => {
        const query = req.query
        const { theme: themeName } = req.params

        const theme = themes.find((x) => x.name === themeName)

        if (!theme) return res.json({ message: 'invalid theme' })

        const rarity = theme.rarities.find(
            (x: any) => x.rarity === query.rarity,
        )

        if (!rarity) return res.json({ message: 'Unknown rarity.' })

        const canvas = new fabric.StaticCanvas(null, {
            width: rarity.data.width,
            height: rarity.data.height,
        })

        canvas.loadFromJSON(rarity.data.canvasData, () => {
            canvas.getObjects('text').forEach((value) => {
                const text = value as Text
                for (const [k, v] of Object.entries(query)) {
                    text.text = text.text!.split(`{${k}}`).join(v as string)
                }
                text.text = josa(text.text!)
            })
            canvas.renderAll()
            res.setHeader('Content-Type', 'image/png')
            const url = canvas.toDataURL()
            const matches = url.match(urlRegex)!
            const data = matches[2]
            const buffer = Buffer.from(data, 'base64')
            res.send(buffer)
        })
    })

    app.listen(config.port, () => console.log('와아 서버 시작!'))
})
