Rails.application.routes.draw do
  resources :muscle_workouts
  resources :user_workouts
  resources :routine_workouts
  resources :muscles
  resources :workouts
  resources :routines
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
