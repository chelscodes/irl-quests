import { eachDayOfInterval, subDays, format } from 'date-fns'
import TaskSerializer from "../serializers/TaskSerializer.js"
import { User } from "../models/index.js"

class UserStats {
  static async getTimeRangeStatsForTasks(user) {
    const completedTasks = await User.getCompletedTasks(user)
    const startDate = subDays(new Date(), 35)
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
}

export default UserStats