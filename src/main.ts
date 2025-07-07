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
