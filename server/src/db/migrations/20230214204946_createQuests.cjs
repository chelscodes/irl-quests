/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("quests", table => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.text("description")
    table.integer("currentPoints").notNullable().defaultTo(0)
    table.bigInteger("userId").unsigned().notNullable().index().references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("quests")
}
