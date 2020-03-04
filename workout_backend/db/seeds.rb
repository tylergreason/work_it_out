require 'faker'

difficulty_range = ['easy','medium','hard']
day = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"]
random_muscles = ["Bicep", "Tricep", "Abs", "Neck", "Quadriceps", "Hamstrings", "Calves", "Pelvis", "Pectorals", "Lats", "Deltoids", "Upper back", "Lower back"]

# delete tables 
# User.all.delete_all 
# Workout.all.delete_all
# Muscle.all.delete_all
# Routine.all.delete_all

# rails db:reset before seeding 

# create new workouts and give them muscles 
20.times do 
    new_workout = Workout.create(
        name: "workout: " + Faker::Lorem.sentence(word_count: 3), 
        difficulty: difficulty_range.sample, 
        description: Faker::Lorem.sentence(word_count: 10)
    )
    2.times do
        new_workout.muscles << Muscle.create(name:random_muscles.sample)
    end
end
# create new users and give them routines
5.times do 
    new_user = User.create( 
        first_name: Faker::Name.first_name, 
        last_name: Faker::Name.last_name, 
        username: Faker::Internet.username, 
        password: "password"
    )
    # create routines, give them workouts, then give them users 
    3.times do 
        new_routine = Routine.create(name: day.sample + " routine", description: Faker::Lorem.sentence(word_count: 5), date: Faker::Date.in_date_period)
        5.times do 
            new_routine.workouts << Workout.all.sample
        end
        new_user.routines << new_routine 
    end
end


# new_user = User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, username: Faker::Internet.username, password: "password")
# new_routine = Routine.create(name: day.sample + " workout", description: Faker::Lorem.sentence(word_count: 5), date: Faker::Date.in_date_period)