import chalk from "chalk"

type Color = "red" | "green" | "grey"

export function print(text: string, color: Color = "grey") {
  console.log(chalk[color](text))
}

export function clear() {
  console.clear()
}
