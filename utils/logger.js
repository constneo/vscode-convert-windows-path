const vscode = require('vscode')

class Logger {
  static output = vscode.window.createOutputChannel('Convert Path', {
    log: true
  })

  constructor() {}

  static error(error, ...args) {
    Logger.output.error(error, ...args)
    Logger.output.show()
  }

  static info(message, ...args) {
    Logger.output.info(message, ...args)
    Logger.output.show()
  }
}

const logger = (message, kind) => {
  vscode.commands.executeCommand('wi.output', { message, kind })
}

module.exports = Logger
