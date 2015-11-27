class AddIndexToPacjentPesel < ActiveRecord::Migration
  def change
  	add_index :pacjents, :pesel, unique: true
  end
end
