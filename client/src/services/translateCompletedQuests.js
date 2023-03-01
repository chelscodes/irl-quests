const translateCompletedQuests = (totalCompletedQuests) => {
  if (totalCompletedQuests === 0) {
    return "You haven't completed a quest yet."
  } else if (totalCompletedQuests === 1) {
    return "You've completed 1 quest."
  } else {
    return `You've completed ${totalCompletedQuests} quests.`
  }
}

export default translateCompletedQuests