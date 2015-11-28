class AddPasswordDigestToPacjents < ActiveRecord::Migration
  def change
    add_column :pacjents, :password_digest, :string
  end
end
