require 'faker'


new_user = User.create( 
    first_name: "John", 
    last_name: "Smith", 
    username: "john_smith", 
    password: "password"
)

new_workout = Workout.create(
    name: "push ups", 
    difficulty: "hard", 
    description: "push yourself off the ground!" 
)

new_routine = Routine.create(
    name: "Monday routine", 
    description: "this is what I do on Mondays", 
    date: "2020/01/01"
)

new_muscle1 = Muscle.create(
    name: "bicep"
)

new_muscle2 = Muscle.create(
    name: "chest"
)

new_workout.muscles << new_muscle1
new_workout.muscles << new_muscle2

new_routine.workouts << new_workout

new_user.routines << new_routine 

