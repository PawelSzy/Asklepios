class CreatePacjents < ActiveRecord::Migration
  def change
    create_table :pacjents do |t|
      t.string :imie
      t.string :nazwisko
      t.string :email
      t.integer :telefon
      t.integer :pesel
      t.text :notatki

      t.timestamps null: false
    end
  end
end
