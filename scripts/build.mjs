// "build": "esbuild src/index.js --bundle --outfile=out.js"

import * as esbuild from 'esbuild'
import pkg from '../package.json' assert { type: 'json' }
import fs from 'node:fs/promises'
import path from 'node:path'

pkg.main = './out/extension.js'
console.log('pkg::: ', pkg)

// fs.writeFileSync('../package.json', JSON.stringify(pkg, null))

const p = path.join(process.cwd(), 'package.json')

fs.writeFile(p, JSON.stringify(pkg, null, 2))
  .then(() => {
    return fs.readFile(p)
  })
  .then(res => {
    console.log('[ readFile res ]->', JSON.parse(res))
  })
  .then(res => {
    console.log('res::: ', res)
    return esbuild.build({
      entryPoints: ['out/extension.js'],
      bundle: true,
      minify: true,
      platform: 'node',
      target: ['node10.4'],
      format: 'cjs', // esm
      external: ['vscode'],
      chunkNames: 'chunks/[name]-[hash]',
      outdir: 'out'
    })
  })
  // .then(res => {
  //   console.log('[ res ]->', res)
  //   pkg.main = './out/extension.js'
  //   return fs.writeFile(p, JSON.stringify(pkg, null, 2))
  // })
  .then(res => {
    console.log('[ res ]->', res)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
