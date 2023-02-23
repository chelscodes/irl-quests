/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("quests", (table) => {
    table.dropForeign("userId")
    table.foreign("userId").references("users.id").onDelete("CASCADE")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("quests", (table) => {
    table.dropForeign("userId");
    table.foreign("userId").references("users.id").onDelete("NO ACTION")
  })
}
