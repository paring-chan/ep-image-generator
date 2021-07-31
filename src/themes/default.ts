import type { RenderFunction } from '../types'
import { loadImage } from 'canvas'
import path from 'path'
import { themeAssetsPath } from '../constants'

let images: any

export const render: RenderFunction = (canvas, data) => {
    let image

    switch (Number(data.rank)) {
        case 0:
            image = images.rank0
            break
        case 1:
            image = images.rank1
            break
        case 2:
            image = images.rank2
            break
        case 3:
            image = images.rank3
            break
        case 4:
            image = images.rank4
            break
        case 5:
            image = images.rank5
            break
        default:
            return { error: 'Unknown rank' }
    }

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, width, height)

    // ctx.fillText('와아', 0, 0)
}

export const init = async () => {
    images = {
        default: await loadImage(
            path.join(themeAssetsPath, 'default/default.png'),
        ),
        rank0: await loadImage(
            path.join(themeAssetsPath, 'default/rank-0.png'),
        ),
        rank1: await loadImage(
            path.join(themeAssetsPath, 'default/rank-1.png'),
        ),
        rank2: await loadImage(
            path.join(themeAssetsPath, 'default/rank-2.png'),
        ),
        rank3: await loadImage(
            path.join(themeAssetsPath, 'default/rank-3.png'),
        ),
        rank4: await loadImage(
            path.join(themeAssetsPath, 'default/rank-4.png'),
        ),
        rank5: await loadImage(
            path.join(themeAssetsPath, 'default/rank-5.png'),
        ),
    }
}

export const width = 480

export const height = 188
