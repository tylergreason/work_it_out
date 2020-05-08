class Routine < ApplicationRecord
    has_many :routine_workouts, dependent: :destroy
    has_many :workouts, through: :routine_workouts
    belongs_to :user 

    # method to return only certain routines by user 
    def self.get_routines(username) 
        if username != ''
            Routine.all.select {|routine| routine.user.username == username}
        else
            Routine.all 
        end 
    end
end
