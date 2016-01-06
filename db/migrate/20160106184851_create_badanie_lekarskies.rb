class CreateBadanieLekarskies < ActiveRecord::Migration
  def change
    create_table :badanie_lekarskies do |t|
      t.references :pokoj, index: true, foreign_key: true
      t.references :lekarz, index: true, foreign_key: true
      t.references :pacjent, index: true, foreign_key: true
      t.references :specjalizacja, index: true, foreign_key: true
      t.date :data
      t.integer :godzina

      t.timestamps null: false
    end
  end
end
