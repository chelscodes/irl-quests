const Model = require("./Model")

class Reward extends Model {
  static get tableName() {
    return "rewards"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "motivationLevel"],

      properties: {
        name: { type: "string" },
        motivationLevel: { type: ["string", "integer"] },
        used: { type: "boolean" }
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
          from: "rewards.userId",
          to: "users.id"
        }
      },
      quest: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quest,
        join: {
          from: "rewards.questId",
          to: "quests.id"
        }
      }
    }
  }
}

module.exports = Reward