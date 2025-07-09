import { stdin, stdout } from "process"
import { createInterface, type Interface } from "readline/promises"
import { hangmanArt } from "./data/hangmanAA"
import { GameUI } from "./GameUI"
import { choiceCorrectWord } from "./utils/choiceCurrentWord"

export class HangmanGame {
  private readonly correctWord: string = choiceCorrectWord() //正解の単語
  private guessedLetters: Set<string> = new Set() //試行済みの文字リスト（重複なし）
  private remainingAttempts: number = hangmanArt.length - 1 //残りの試行回数
  private errorMessage: string = ""
  private readonly rl: Interface

  constructor() {
    this.rl = createInterface({
      input: stdin,
      output: stdout,
    })
  }

  //ユーザーからの入力を処理する（バリデーション・評価）
  private evaluate(input: string): "win" | "lose" | "play" {
    const letter = input.toLowerCase().trim()

    this.errorMessage = ""

    // 入力チェック
    if (!/^[a-z]$/.test(letter)) {
      this.errorMessage = "アルファベット1文字を入力してください"
    } else if (this.guessedLetters.has(letter)) {
      this.errorMessage = "その文字は既に推測済みです"
    } else {
      this.guessedLetters.add(letter)

      // 不正解の場合
      if (!this.correctWord.includes(letter)) {
        this.remainingAttempts--
      }
    }

    //勝ち
    if (
      this.correctWord
        .split("")
        .every((letter) => this.guessedLetters.has(letter))
    ) {
      return "win"
    }

    //負け
    if (this.remainingAttempts <= 0) {
      return "lose"
    }

    //ゲーム続行
    return "play"
  }

  //ゲームを開始してループを回す
  public async start(): Promise<void> {
    while (true) {
      //ゲーム画面の表示
      GameUI.displayStatus(
        this.remainingAttempts,
        this.correctWord,
        this.guessedLetters,
        this.errorMessage
      )

      //入力を待機
      const userInputLetter = await this.rl.question(
        "アルファベット1文字を入力してください："
      )

      //入力値の評価
      const result = this.evaluate(userInputLetter)

      //ゲームが終わればループを抜ける
      if (result !== "play") {
        //ゲーム画面を一旦表示してから
        GameUI.displayStatus(
          this.remainingAttempts,
          this.correctWord,
          this.guessedLetters,
          this.errorMessage
        )
        //結果表示
        GameUI.displayResult(result, this.correctWord)

        break
      }
    }
    this.rl.close()
  }
}
