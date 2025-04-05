import { build } from 'vite'
import fs from 'fs-extra'

// Run the build
await build()

// After build, copy assets properly and rename as needed
console.log('Post-processing build output...')

// Copy all assets to predictable locations
fs.copySync('dist/assets', 'dist')

// Create an explicit index.js and index.css in root
const jsFiles = fs.readdirSync('dist').filter(f => f.endsWith('.js'))
const cssFiles = fs.readdirSync('dist').filter(f => f.endsWith('.css'))

if (jsFiles.length) fs.copyFileSync(`dist/${jsFiles[0]}`, 'dist/index.js')
if (cssFiles.length) fs.copyFileSync(`dist/${cssFiles[0]}`, 'dist/index.css')

console.log('Build post-processing complete!')