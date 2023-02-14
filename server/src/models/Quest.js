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
        currentPoints: { type: ["string", "integer"]}
      }
    }
  }
}

module.exports = Quest