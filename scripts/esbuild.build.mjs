// "build": "esbuild src/index.js --bundle --outfile=out.js"

import * as esbuild from 'esbuild'
import { replaceTscAliasPaths } from 'tsc-alias'

await esbuild.build({
  entryPoints: ['src/**/*'],
  bundle: false,
  // minify: true,
  platform: 'node',
  target: ['node10.4'],
  format: 'cjs', // esm
  // external: ['vscode'],
  chunkNames: 'chunks/[name]-[hash]',
  outdir: 'out',
  plugins: [],
  alias: {}
})

// Post build paths resolve since ESBuild only natively
// support paths resolution for bundling scenario
await replaceTscAliasPaths({
  configFile: p,
  watch: false,
  outDir: 'out',
  declarationDir: 'out'
})
