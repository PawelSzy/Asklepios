class CreateLekarzs < ActiveRecord::Migration
  def change
    create_table :lekarzs do |t|
      t.string :imie
      t.string :nazwisko
      t.integer :telefon, :limit => 8
      t.string :email
      t.integer :pesel, :limit => 8
      t.references :specjalizacja, index: true, foreign_key: true

      t.timestamps null: false
    end
      add_index :lekarzs, [:pesel, :nazwisko]
  end
end
