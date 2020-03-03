class Routine < ApplicationRecord
    has_many :routine_workouts, dependent: :destroy
    has_many :workouts, through: :routine_workouts
    belongs_to :user 
end
