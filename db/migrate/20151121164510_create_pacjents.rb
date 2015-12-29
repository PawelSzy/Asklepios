class CreatePacjents < ActiveRecord::Migration
  def change
    create_table :pacjents do |t|
      t.string :imie
      t.string :nazwisko
      t.string :email, :unique => true
      t.integer :telefon, :limit => 8
      t.integer :pesel, :limit => 8, :unique => true
      t.text :notatki

      t.timestamps null: false
    end
  end
end
