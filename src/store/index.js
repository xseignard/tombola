import create from 'zustand'
import questions from '../data/questions'
import answers from '../data/answers'

const [useStore] = create((set, get) => ({
  score: 0,
  currentQuestions: [],
  answers,
  init() {
    const picks = []
    while (picks.length < 5) {
      const pick = Math.floor(Math.random() * questions.length)
      if (picks.indexOf(pick) === -1) picks.push(pick)
    }
    set({ currentQuestions: picks.map(p => questions[p]), score: 0 })
  },
  incScore() {
    const prevScore = get().score
    set({ score: prevScore + 1 })
  },
}))

export default useStore
