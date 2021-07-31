import pug from 'pug'

export type Theme = {
    name: string
    render: pug.compileTemplate
}
