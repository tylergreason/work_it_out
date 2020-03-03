class Muscle < ApplicationRecord
    has_many :muscle_workouts, dependent: :destroy
    has_many :workouts, through: :muscle_workouts
end
