class AddIndexToPacjentPesel < ActiveRecord::Migration
  def change
  	add_index :pacjent, :pesel, unique: true
  end
end
