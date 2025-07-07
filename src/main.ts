import chalk from "chalk"
import figlet from "figlet"
import readline from "readline/promises"
import rawData from "./data/questions.json"

interface Question {
  word: string
  hint: string
}

class Quiz {
  constructor(public questions: Question[]) {}

  getNext() {
    const randomIndex = Math.floor(Math.random() * this.questions.length)
    const selectedQuestion = this.questions[randomIndex]
    // 質問リストを選ばれた質問以外で更新する
    this.questions = this.questions.filter((_, index) => index !== randomIndex)
    return selectedQuestion
  }

  hasNext() {
    return this.questions.length > 0
  }

  getRemainingQuestionCount() {
    return this.questions.length
  }
}

const questions: Question[] = rawData
const quiz = new Quiz(questions)

// interface UI {
//   //ユーザの入力を待機
//   input(): Promise<string>
//   //ターミナルの画面をクリア
//   clear(): void
//   //プログラムがそれ以降の入力を受け付けないようにする
//   destroy(): void
//   //色付きメッセージを表示
//   output(message: string, color?: Color): void
//   //解答状況を表示
//   outputAnswer(message: string): void
// }

type Color = "red" | "green" | "yellow" | "white"

class Cli {
  private static rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin,
  })
  static async input() {
    const input = await this.rl.question("文字を入力してください")
    return input.replaceAll(" ", "").toLowerCase()
  }
  static clear() {
    console.clear()
  }
  static destroy() {
    this.rl.close()
  }
  static output(message: string, color: Color = "green") {
    console.log(chalk[color](message), "\n")
  }
  static outputAnswer(message: string) {
    console.log(figlet.textSync(message, { font: "Star Wars" }), "\n")
  }
}

async function run() {
  Cli.clear()
  const userInput = await Cli.input()
  console.log(userInput)
  Cli.output("hello world")
  Cli.outputAnswer("generic_")
  Cli.destroy()
}

run()
