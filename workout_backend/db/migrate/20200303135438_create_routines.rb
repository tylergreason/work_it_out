class CreateRoutines < ActiveRecord::Migration[6.0]
  def change
    create_table :routines do |t|
        t.string :name 
        t.text :description 
        t.string :date 
      t.timestamps
    end
  end
end
