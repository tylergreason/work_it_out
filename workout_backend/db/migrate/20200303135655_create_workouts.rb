class CreateWorkouts < ActiveRecord::Migration[6.0]
  def change
    create_table :workouts do |t|
      t.string :name 
      t.string :difficulty 
      t.text :description
      t.timestamps
    end
  end
end
