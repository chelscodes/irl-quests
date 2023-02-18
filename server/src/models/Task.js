const Model = require("./Model")

class Task extends Model {
  static get tableName() {
    return "tasks"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "difficulty"],

      properties: {
        name: { type: "string" },
        difficulty: { type: ["string", "integer"] },
        completed: { type: "boolean" }
      }
    }
  }

  static relationMappings() {
    const { User, Quest } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "tasks.userId",
          to: "users.id"
        }
      },
      quest: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quest,
        join: {
          from: "tasks.questId",
          to: "quests.id"
        }
      }
    }
  }
}

module.exports = Task