import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("donations", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("user");
    table.date("date").notNullable();
    table.string("local");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("donation");
}
