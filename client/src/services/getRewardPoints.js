const getRewardPoints = (motivationLevel) => {
  if (motivationLevel < 3) {
    return (motivationLevel +1) * 5
  } else if (motivationLevel === 3) {
    return 30
  }
}

export default getRewardPoints