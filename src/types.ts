import pug from 'pug'

export type Theme = {
    name: string
    data: pug.compileTemplate
}
