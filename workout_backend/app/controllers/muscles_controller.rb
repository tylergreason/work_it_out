class MusclesController < ApplicationController
    def index 
        muscles = Muscle.all 
        # render json: muscles, include: [:workouts]
        render :json => muscles, :include => {:workouts => {:include => :muscles}}
    end
end
