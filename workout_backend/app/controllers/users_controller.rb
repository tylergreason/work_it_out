class UsersController < ApplicationController
    def show  
        user = User.all.find(params[:id])
        render json: user
    end

    def create 
        # user = User.create(user_params)
        # byebug
        user = User.find_or_create_by(username: user_params["username"])
        render json: user 
    end

    def destroy 
        user = User.all.find(params[:id])
        user.delete
    end
    private 
    def user_params 
        params.require(:user).permit(:first_name, :last_name, :username,:password)
        # params.require(:pokemon).permit(:species, :nickname,:trainer_id)
    end
end

