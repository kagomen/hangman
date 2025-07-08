import { log } from "node:console"
import { exit, stdin } from "node:process"
import readline from "node:readline"

// const rl = createInterface({
//   input: stdin,
//   output: stdout,
// })

/*
 * 最も基本的な入力操作
 */
// rl.question("What's your name? : ", (name) => {
//   log(`Hello ${name}!`)
//   rl.close()
// })

/*
 * lineイベント
 * 改行が入力されると発生する
 */
// log("What's your name?")
// rl.on("line", (name) => {
//   log(`Hello ${name}!`)
//   rl.close()
// })

/*
 * keypressイベント
 * おまじないが多い
 */
readline.emitKeypressEvents(stdin)
if (stdin.isTTY) {
  stdin.setRawMode(true)
}
log("Press any key (Press Ctrl+C to exit)")
stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "c") {
    log("exit")
    exit()
  } else {
    log(`You pressed: "${str}"`)
  }
})
