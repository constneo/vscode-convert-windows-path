import { watch } from 'rollup'
import defaultOptions from "../rollup.config.js"


const watchOptions = {
  plugins: [],
  external: ['vscode', 'axios', 'dayjs', 'highlight.js'], //, 'axios', 'dayjs', 'highlight.js'
  input: 'src/extension.js',
  output: {
    file: './dist/extension.cjs',
    format: 'cjs'
  },
  watch: {
    // buildDelay,
    // chokidar,
    clearScreen: true,
    // skipWrite,
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

const watcher = watch(defaultOptions)

watcher.on('event', event => {
  // event.code 可以是以下之一：
  //   START        - 监视器正在（重新）启动
  //   BUNDLE_START - 单次打包
  //                  * 如果存在，event.input 将是输入选项对象
  //                  * event.output 包含生成的输出的 "file"
  //                      或 "dir" 选项值的数组
  //   BUNDLE_END   - 完成打包
  //                  * 如果存在，event.input 将是输入选项对象
  //                  * event.output 包含生成的输出的 "file"
  //                      或 "dir" 选项值的数组
  //                  * event.duration 是构建持续时间（以毫秒为单位）
  //                  * event.result 包含 bundle 对象，
  //                      可以通过调用 bundle.generate
  //                      或 bundle.write 来生成其他输出。
  //                      当使用 watch.skipWrite 选项时，这尤其重要。
  //                  生成输出后，你应该调用 "event.result.close()"，
  //                  或者如果你不生成输出，也应该调用。
  //                  这将允许插件通过
  //                  "closeBundle" 钩子清理资源。
  //   END          - 完成所有产物的构建
  //   ERROR        - 在打包时遇到错误
  //                  * event.error 包含抛出的错误
  //                  * 对于构建错误，event.result 为 null，
  //                      对于输出生成错误，它包含 bundle 对象。
  //                      与 "BUNDLE_END" 一样，如果存在，
  //                      你应该在完成后调用 "event.result.close()"。
  // 如果从事件处理程序返回一个 Promise，则 Rollup
  // 将等待 Promise 解析后再继续。
})

// 这将确保在每次运行后正确关闭打包
watcher.on('event', ({ result }) => {
  if (result) {
    result.close()
  }
})

// 此外，你可以挂钩以下内容。
// 同样，返回 Promise 以使 Rollup 在该阶段等待：
watcher.on('change', (id, { event }) => {
  /* 更改了一个文件 */
})
watcher.on('restart', () => {
  /* 新触发了一次运行 */
})
watcher.on('close', () => {
  /* 监视器被关闭了，请看下面的代码 */
})

// 停止监听
watcher.close()
