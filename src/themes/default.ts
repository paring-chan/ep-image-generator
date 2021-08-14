// import type { RenderFunction } from '../types'
// import { loadImage, registerFont } from 'canvas'
// import path from 'path'
// import { assetsPath, themeAssetsPath } from '../constants'
// import { josa } from 'josa'
//
// let images: any
//
// let font: any
//
// export const render: RenderFunction = (canvas, data) => {
//     registerFont(path.join(assetsPath, 'NotoSansKR-Bold.otf'), {
//         family: 'Noto Sans KR Bold',
//     })
//
//     let image
//
//     const rarity = Number(data.rarity)
//
//     switch (rarity) {
//         case 0:
//             image = images.rank0
//             break
//         case 1:
//             image = images.rank1
//             break
//         case 2:
//             image = images.rank2
//             break
//         case 3:
//             image = images.rank3
//             break
//         case 4:
//             image = images.rank4
//             break
//         case 5:
//             image = images.rank5
//             break
//         default:
//             return { error: 'Unknown rarity' }
//     }
//
//     const ctx = canvas.getContext('2d')
//
//     ctx.drawImage(image, 0, 0, width, height)
//
//     ctx.font = '24px "Noto Sans KR Bold"'
//     ctx.fillStyle = '#fff'
//
//     switch (rarity) {
//         case 0:
//             ctx.fillText(josa(`${data.name}#{을} 낚아 버렸어...`), 71, 7 + 28)
//             ctx.fillStyle = '#000'
//             ctx.font = '20px "Noto Sans KR Bold"'
//             ctx.fillText(data.profit + '$', 80, 59 + 24)
//             break
//         case 1:
//             ctx.fillStyle = '#fff'
//             ctx.fillText(josa(`${data.name}#{이} 낚였다!`), 71, 7 + 28)
//             break
//         case 2:
//             ctx.fillStyle = '#fff'
//             ctx.fillText(josa(`와! ${data.name}#{을} 낚았다!!!`), 71, 7 + 28)
//             break
//         case 3:
//             ctx.fillStyle = '#000'
//             ctx.fillText(
//                 josa(`월척이야! ${data.name}#{을} 낚다니!!!`),
//                 71,
//                 7 + 28,
//             )
//             break
//         case 4:
//             ctx.fillStyle = '#000'
//             ctx.fillText(josa(`이건... ${data.name}#{이?}잖아?!`), 71, 7 + 28)
//             break
//         case 5:
//             ctx.fillText(
//                 josa(`${data.name}#{이?}라고?!?! 가능한 거야???`),
//                 71,
//                 7 + 28,
//             )
//             break
//     }
//     if (data.owner) {
//         ctx.font = '8px "Noto Sans KR Bold"'
//         ctx.fillText('낚시터 주인', 72, 38 + 12)
//     }
//     ctx.font = '20px "Noto Sans KR Bold"'
//     ctx.fillStyle = '#000'
//     ctx.fillText(data.name, 350, 65 + 24)
//     ctx.font = '14px "Noto Sans KR Bold"'
//     ctx.fillText(`${data.length}cm`, 350, 90 + 14)
//     ctx.font = '12px "Noto Sans KR Bold"'
//     ctx.fillText(`(평균 ${data.average_length}cm)`, 350, 108 + 12)
//     ctx.font = '14px "Noto Sans KR Bold"'
//     ctx.fillText(`${data.cost}$`, 350, 123 + 14)
//     ctx.font = '12px "Noto Sans KR Bold"'
//     ctx.fillText(`(평균 ${data.average_cost}$)`, 350, 141 + 12)
//     ctx.font = '8px "Noto Sans KR Bold"'
//     ctx.fillText(`${data.time}시에 '${data.roomname}'에서`, 290, 160 + 8)
//     ctx.fillText(`『${data.username}』`, 290, 170 + 8)
//     if (rarity !== 0) {
//         ctx.font = '20px "Noto Sans KR Bold"'
//         ctx.fillText(data.cost + '$', 80, 59 + 24)
//         ctx.font = '16px "Noto Sans KR Bold"'
//         ctx.fillStyle = '#320000'
//         ctx.fillText(`${data.fees}$ (${data.fees_p}%)`, 72, 85 + 18)
//         ctx.fillStyle = '#003200'
//         ctx.fillText(`${data.bonus}$ (${data.bonus_p}%)`, 72, 105 + 16)
//         ctx.font = '24px "Noto Sans KR Bold"'
//         ctx.fillStyle = '#000'
//         ctx.fillText(data.profit + '$', 85, 145 + 28)
//     }
// }
//
// export const init = async () => {
//     images = {
//         default: await loadImage(
//             path.join(themeAssetsPath, 'default/default.png'),
//         ),
//         rank0: await loadImage(
//             path.join(themeAssetsPath, 'default/rank-0.png'),
//         ),
//         rank1: await loadImage(
//             path.join(themeAssetsPath, 'default/rank-1.png'),
//         ),
//         rank2: await loadImage(
//             path.join(themeAssetsPath, 'default/rank-2.png'),
//         ),
//         rank3: await loadImage(
//             path.join(themeAssetsPath, 'default/rank-3.png'),
//         ),
//         rank4: await loadImage(
//             path.join(themeAssetsPath, 'default/rank-4.png'),
//         ),
//         rank5: await loadImage(
//             path.join(themeAssetsPath, 'default/rank-5.png'),
//         ),
//     }
// }
//
// export const width = 480
//
// export const height = 188
