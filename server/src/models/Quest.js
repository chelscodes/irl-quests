const Model = require("./Model")

class Quest extends Model {
  static get tableName() {
    return "quests"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        name: { type: "string" },
        description: { type: "string" },
      }
    }
  }

  static relationMappings() {
    const { User, Task } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "quests.userId",
          to: "users.id"
        }
      },
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "quests.id",
          to: "tasks.questId"
        }
      }
    }
  }
}

module.exports = Quest