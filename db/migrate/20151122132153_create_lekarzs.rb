class CreateLekarzs < ActiveRecord::Migration
  def change
    create_table :lekarzs do |t|
      t.string :imie
      t.string :nazwisko
      t.integer :pesel
      t.integer :telefon
      t.string :email
      t.string :specjalizacja

      t.timestamps null: false
    end
  end
end
