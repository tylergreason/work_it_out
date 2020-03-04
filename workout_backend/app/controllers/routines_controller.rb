class RoutinesController < ApplicationController
    def destroy 
        routine = Routine.find(params[:id])
        routine.delete
    end
end
