class AddIdsToAssociationTables < ActiveRecord::Migration[6.0]
  def change
    add_column :user_workouts, :user_id, :integer
    add_column :user_workouts, :workout_id, :integer

    add_column :routine_workouts, :routine_id, :integer 
    add_column :routine_workouts, :workout_id, :integer 

    add_column :routines, :user_id, :integer

    add_column :muscle_workouts, :muscle_id, :integer 
    add_column :muscle_workouts, :workout_id, :integer 
  end
end
