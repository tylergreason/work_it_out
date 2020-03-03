class CreateRoutineWorkouts < ActiveRecord::Migration[6.0]
  def change
    create_table :routine_workouts do |t|

      t.timestamps
    end
  end
end
