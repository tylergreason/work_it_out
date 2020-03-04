class RoutinesController < ApplicationController
    def destroy 
        routine = Routine.find(params[:id])
        routine.delete
    end

    def show 
        routine = Routine.all.find(params[:id])
        # render json: routine, include: [:workouts]
        render :json => routine, :include => {:workouts => {:include => :muscles}}
    end

    def index 
        routines = Routine.all 
        # render json: routines, include: [:workouts]
        render :json => routines, :include => {:workouts => {:include => :muscles}}

    end
end
