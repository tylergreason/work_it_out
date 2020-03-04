class MusclesController < ApplicationController
    def index 
        muscles = Muscle.all
        #  muscles.sort_by! |muscle|
        #     muscle.name
        # end
        render :json => muscles.sort_by {|m| m.name}, :include => {:workouts => {:include => :muscles}}
    end
end
