import type { Theme } from './types'
import * as path from 'path'

export const themes: Theme[] = []

export const assetsPath = path.join(process.cwd(), 'assets')

export const themeAssetsPath = path.join(assetsPath, 'themes')
