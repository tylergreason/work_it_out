class WorkoutsController < ApplicationController
    def create 
        workout = Workout.create(workout_params)
        params[:muscles].each do |value|
            muscle = Muscle.all.find_by(id:value)
            workout.muscles << muscle 
        end
        byebug
        render :json => workout 
    end

    private 
    def workout_params 
        params.require(:workout).permit(:name,:description,:difficulty,:muscles)
    end
end
