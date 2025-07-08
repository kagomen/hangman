// src/index.ts
import * as readline from "readline"
import { hangmanArt } from "./data/hangmanArt"
import { words } from "./data/words"
import { clear, print } from "./utils"

export class HangmanGame {
  private readonly correctWord: string = this.getRandomWord() //正解の単語
  private guessedLetters: Set<string> = new Set() //試行済みの文字リスト（重複なし）
  private remainingAttempts: number = hangmanArt.length - 1 //残りの試行回数
  private errorMessage: string = ""
  private readonly rl: readline.Interface

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  //単語リストからランダムに単語を1つ選択する
  private getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex].toLowerCase()
  }

  //現在の単語の表示状態を作成する (例: _ a _ a _ a)
  private getWordDisplay(): string {
    return this.correctWord
      .split("")
      .map((letter) => (this.guessedLetters.has(letter) ? letter : "_"))
      .join(" ")
  }

  //ゲームの状態を表示する
  private displayStatus(): void {
    clear()
    print("=====================")
    print("       Hangman")
    print("=====================")
    print(hangmanArt[hangmanArt.length - 1 - this.remainingAttempts])
    print("\n")
    print(`単語: ${this.getWordDisplay()}`)
    print(`残り試行回数: ${this.remainingAttempts}`)
    print(`推測済みの文字: ${[...this.guessedLetters].join(", ")}`)
    print("\n")
    if (this.errorMessage) {
      print(`* ${this.errorMessage}`, "red")
    }
  }

  //ユーザーからの入力を処理する
  private handleGuess(input: string): void {
    const letter = input.toLowerCase().trim()

    // 入力チェック
    if (!/^[a-z]$/.test(letter)) {
      this.errorMessage = "アルファベット1文字を入力してください"
    } else if (this.guessedLetters.has(letter)) {
      this.errorMessage = "その文字は既に推測済みです"
    } else {
      this.errorMessage = ""
      this.guessedLetters.add(letter)

      // 不正解の場合
      if (!this.correctWord.includes(letter)) {
        this.remainingAttempts--
      }
    }
  }

  //ゲームが終了したかチェックする
  private checkGameEnd(): boolean {
    // 勝ち判定
    if (
      this.correctWord
        .split("")
        .every((letter) => this.guessedLetters.has(letter))
    ) {
      this.displayStatus()
      print(`[GAME CLEAR] 正解は"${this.correctWord}"でした`, "green")
      this.rl.close()
      return true
    }

    // 負け判定
    if (this.remainingAttempts <= 0) {
      this.displayStatus()
      print(`[GAME OVER] 正解は"${this.correctWord}"でした`, "red")
      this.rl.close()
      return true
    }

    return false
  }

  //ゲームを開始してループを回す
  public start(): void {
    const gameLoop = () => {
      this.displayStatus()

      // ゲームが終了している場合、ループを抜ける
      if (this.checkGameEnd()) {
        return
      }

      this.rl.question("アルファベットを1文字入力してください: ", (input) => {
        this.handleGuess(input)
        gameLoop()
      })
    }

    gameLoop()
  }
}
