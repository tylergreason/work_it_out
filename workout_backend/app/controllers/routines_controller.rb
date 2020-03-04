class RoutinesController < ApplicationController
    def destroy 
        routine = Routine.find(params[:id])
        routine.delete
    end

    def show 
        routine = Routine.all.find(params[:id])
        render json: routine, include: [:workouts]
    end

    def index 
        routines = Routine.all 
        render json: routines, include: [:workouts]
    end
end
