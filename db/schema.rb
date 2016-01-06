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

ActiveRecord::Schema.define(version: 20160106184851) do

  create_table "badanie_lekarskies", force: :cascade do |t|
    t.integer  "pokoj_id"
    t.integer  "lekarz_id"
    t.integer  "pacjent_id"
    t.integer  "specjalizacja_id"
    t.date     "data"
    t.integer  "godzina"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "badanie_lekarskies", ["lekarz_id"], name: "index_badanie_lekarskies_on_lekarz_id"
  add_index "badanie_lekarskies", ["pacjent_id"], name: "index_badanie_lekarskies_on_pacjent_id"
  add_index "badanie_lekarskies", ["pokoj_id"], name: "index_badanie_lekarskies_on_pokoj_id"
  add_index "badanie_lekarskies", ["specjalizacja_id"], name: "index_badanie_lekarskies_on_specjalizacja_id"

  create_table "lekarzs", force: :cascade do |t|
    t.string   "imie"
    t.string   "nazwisko"
    t.integer  "telefon",          limit: 8
    t.string   "email"
    t.integer  "pesel",            limit: 8
    t.integer  "specjalizacja_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "password_digest"
  end

  add_index "lekarzs", ["pesel", "nazwisko"], name: "index_lekarzs_on_pesel_and_nazwisko"
  add_index "lekarzs", ["specjalizacja_id"], name: "index_lekarzs_on_specjalizacja_id"

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
