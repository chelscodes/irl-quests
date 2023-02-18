class RewardSerializer {
  static async getSummary(reward) {
    const allowedAttributes = ["id", "name", "motivationLevel", "used"]

    let serializedReward = {}
    for (const attribute of allowedAttributes) {
      serializedReward[attribute] = reward[attribute]
    }

    return serializedReward
  }
}

export default RewardSerializer