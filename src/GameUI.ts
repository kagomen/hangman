import { clear } from "console"
import { hangmanArt } from "./data/hangmanAA"
import { print } from "./utils/console"

export class GameUI {
  //ゲームの状態を表示する
  static displayStatus(
    remainingAttempts: number,
    currentWordDisplay: string,
    correctWordLength: number,
    guessedLetters: Set<string>,
    errorMessage: string
  ) {
    clear()
    print("=====================")
    print("       Hangman")
    print("=====================")
    print(hangmanArt[hangmanArt.length - 1 - remainingAttempts])
    print("\n")
    print(`単語: ${currentWordDisplay} (${correctWordLength}文字)`)
    print(`残り試行回数: ${remainingAttempts}回`)
    print(`推測済みの文字: ${[...guessedLetters].join(", ")}`)
    print("\n")
    if (errorMessage) {
      print(`* ${errorMessage}`, "red")
    }
  }

  static displayResult(status: "win" | "lose", correctWord: string) {
    if (status === "win") {
      print(`[GAME CLEAR] 正解は"${correctWord}"でした`, "green")
    } else {
      print(`[GAME OVER] 正解は"${correctWord}"でした`, "red")
    }
  }
}
