class CreatePokojs < ActiveRecord::Migration
  def change
    create_table :pokojs do |t|
      t.string :numer_pokoju

      t.timestamps null: false
    end
  end
end
