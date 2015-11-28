class CreateSpecjalizacjas < ActiveRecord::Migration
  def change
    create_table :specjalizacjas do |t|
      t.string :nazwa_specjalizacji

      t.timestamps null: false
    end
  end
end
