class Workout < ApplicationRecord
    has_many :routine_workouts, dependent: :destroy
    has_many :routines, through: :routine_workouts
    has_many :muscle_workouts, dependent: :destroy
    has_many :muscles, through: :muscle_workouts
    has_many :user_workouts, dependent: :destroy
    has_many :users, through: :user_workouts
end
