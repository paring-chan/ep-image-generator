import { Canvas } from 'canvas'

export type Theme = {
    name: string
    render: RenderFunction
    width: number
    height: number
}

export type RenderFunction = (canvas: Canvas, data: any) => void|{error: string}
