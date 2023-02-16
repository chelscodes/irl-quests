/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("quests", table => {
    table.dropColumn("currentPoints")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("quests", table => {
    table.integer("currentPoints").notNullable().defaultTo(0)
  })
}
