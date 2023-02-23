/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("tasks", (table) => {
    table.dropForeign("userId")
    table.foreign("userId").references("users.id").onDelete("CASCADE")
    table.dropForeign("questId")
    table.foreign("questId").references("quests.id").onDelete("CASCADE")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("tasks", table => {
    table.dropForeign("userId");
    table.foreign("userId").references("users.id").onDelete("NO ACTION")
    table.dropForeign("questId");
    table.foreign("questId").references("quests.id").onDelete("NO ACTION")
  })
}
