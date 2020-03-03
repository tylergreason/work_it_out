class CreateMuscleWorkouts < ActiveRecord::Migration[6.0]
  def change
    create_table :muscle_workouts do |t|

      t.timestamps
    end
  end
end
