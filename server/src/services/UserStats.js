import { eachDayOfInterval, subDays, format } from 'date-fns'
import TaskSerializer from "../serializers/TaskSerializer.js"
import { User } from "../models/index.js"

class UserStats {
  static async getTotalQuestsCompleted(quests) {
    let completedQuests = 0
    for (let i = 0; i < quests.length; i++) {
      const allTasks = await quests[i].$relatedQuery("tasks")
      const completedTasks = allTasks.filter((task) => {
        return task.completed === true
      })
      if (allTasks.length === completedTasks.length) {
        completedQuests = completedQuests + 1
      }
    }
    return completedQuests
  }

  static async getAllCompletedTasks(user) {
    const completedTasks = await User.getCompletedTasks(user)
    return completedTasks
  }

  static async getTimeRangeStatsForTasks(completedTasks) {
    const startDate = subDays(new Date(), 60)
    const dateInterval = eachDayOfInterval({
      start: startDate,
      end: new Date()
    })

    const cleanedDateInterval = dateInterval.map((date) => {
      return format(date, "yyyy-MM-dd")
    })
    const completedTasksDates = completedTasks.map((task) => {
      return TaskSerializer.getFormattedUpdatedAt(task)
    })

    const timeRangeStats = cleanedDateInterval.map((date) => {
      let nivoFormattedObject = {
        "day": date,
        "value": 0
      }
      for (let i = 0; i < completedTasksDates.length; i++) {
        if (date === completedTasksDates[i]) {
          nivoFormattedObject.value = nivoFormattedObject.value + 1
        }
      }
      return nivoFormattedObject
    })

    return timeRangeStats
  }

  static async getSummary(user, quests) {
    const completedTasks = await this.getAllCompletedTasks(user)

    const stats = {}
    stats.tasksCompleted = completedTasks.length
    stats.tasksTimeRange = await this.getTimeRangeStatsForTasks(completedTasks)
    stats.questsCompleted = await this.getTotalQuestsCompleted(quests)
    return stats
  }
}

export default UserStats