import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('schedules', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.dateTime('date').notNullable();
    table.string('description');
    table.string('local');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('schedules');
}
