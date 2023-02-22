/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username"],
      
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        username: { type: "string" },
        cryptedPassword: { type: "string" },
      },
    };
  }
  
  $formatJson(json) {
    const serializedJson = super.$formatJson(json);
    
    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }
    
    return serializedJson;
  }
  
  static relationMappings() {
    const { Quest, Task } = require("./index.js")

    return {
      quests: {
        relation: Model.HasManyRelation,
        modelClass: Quest,
        join: {
          from: "users.id",
          to: "quests.userId"
        }
      },
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "users.id",
          to: "tasks.userId"
        }
      }
    }
  }

  static async getCompletedTasks(user) {
    const completedTasksData = await user.$relatedQuery("tasks").where("completed", "true")
    return completedTasksData
  }
}

module.exports = User;
