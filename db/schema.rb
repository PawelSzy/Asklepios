# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151128194417) do

  create_table "lekarzs", force: :cascade do |t|
    t.string   "imie"
    t.string   "nazwisko"
    t.integer  "pesel",         limit: 8
    t.integer  "telefon",       limit: 8
    t.string   "email"
    t.string   "specjalizacja"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "pacjents", force: :cascade do |t|
    t.string   "imie"
    t.string   "nazwisko"
    t.string   "email"
    t.integer  "telefon",         limit: 8
    t.integer  "pesel",           limit: 8
    t.text     "notatki"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "password_digest"
  end

  add_index "pacjents", ["pesel"], name: "index_pacjents_on_pesel", unique: true

  create_table "pokojs", force: :cascade do |t|
    t.string   "numer_pokoju"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "specjalizacjas", force: :cascade do |t|
    t.string   "nazwa_specjalizacji"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

end
