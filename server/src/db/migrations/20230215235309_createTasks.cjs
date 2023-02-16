/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("tasks", table => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.integer("difficulty").notNullable()
    table.integer("points").notNullable()
    table.boolean("completed").notNullable().defaultTo(false)
    table.bigInteger("questId").unsigned().notNullable().index().references("quests.id")
    table.bigInteger("userId").unsigned().notNullable().index().references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("tasks")
}
