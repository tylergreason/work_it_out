class RoutinesController < ApplicationController
    def destroy 
        routine = Routine.find(params[:id])
        routine.delete
    end

    def create 
        # byebug
        routine = Routine.new(routine_params) 
        # add workouts manually by value 
        params[:workouts].each do |value|
            workout = Workout.all.find_by(id:value)
            routine.workouts << workout 
         end
        routine.save
        render :json => routine, include: [:workouts]
    end

    def show 
        routine = Routine.all.find(params[:id])
        # render json: routine, include: [:workouts]
        render :json => routine, :include => {:workouts => {:include => :muscles}}
    end

    def index 
        current_user = request.headers['user']
        # get routines of current user 
        user_routines = Routine.get_routines(current_user)

        render :json => user_routines.sort_by {|r| r.date}.reverse, :include => {:workouts => {:include => :muscles}}
    end

    private 
    def routine_params 
        params.require(:routine).permit(:user_id,:name,:description,:date,:workouts)
        # params.require(:pokemon).permit(:species, :nickname,:trainer_id)
    end
end
