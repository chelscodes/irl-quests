const translateTaskDifficulty = (difficulty) => {
  let text = ""

  if (difficulty == 1) {
    text = "trivial"
  }
  if (difficulty == 2) {
    return "easy"
  }
  if (difficulty == 3) {
    return "medium"
  }
  if (difficulty == 4) {
    return "hard"
  }

  return text
}

export default translateTaskDifficulty