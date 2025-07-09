import { words } from "../data/words"

//単語リストからランダムに単語を1つ選択する
export function choiceCorrectWord(): string {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex].toLowerCase()
}
