const translateRewardMotivationLevel = (motivationLevel) => {
  let text = ""

  if (motivationLevel == 1) {
    text = "Quick Treat"
  }
  if (motivationLevel == 2) {
    return "Restorative Break"
  }
  if (motivationLevel == 3) {
    return "Celebration Time"
  }

  return text
}

export default translateRewardMotivationLevel