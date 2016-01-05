class AddPasswordDigestToLekarzs < ActiveRecord::Migration
  def change
    add_column :lekarzs, :password_digest, :string
  end
end
