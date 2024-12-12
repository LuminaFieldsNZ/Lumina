const scheduleBody = document.getElementById('schedule-body');


let scheduleData = {
    "7:00 AM": {
        "Mon": "Drop-off begins",
        "Tue": "Drop-off begins",
        "Wed": "Drop-off begins",
        "Thu": "Drop-off begins",
        "Fri": "Drop-off begins"
    },
    "7:30 AM": {
        "Mon": "Playtime",
        "Tue": "Playtime",
        "Wed": "Playtime",
        "Thu": "Playtime",
        "Fri": "Playtime"
    },
    "8:00 AM": {
        "Mon": "Playtime",
        "Tue": "Playtime",
        "Wed": "Playtime",
        "Thu": "Playtime",
        "Fri": "Playtime"
    },
    "8:30 AM": {
        "Mon": "Drop-off ends",
        "Tue": "Drop-off ends",
        "Wed": "Drop-off ends",
        "Thu": "Drop-off ends",
        "Fri": "Drop-off ends"
    },
    "9:00 AM": {
        "Mon": "Music",
        "Tue": "Rhythmic Exercises",
        "Wed": "Karate",
        "Thu": "Music",
        "Fri": "Art"
    },
    "9:30 AM": {
        "Mon": "Playtime",
        "Tue": "Playtime",
        "Wed": "Playtime",
        "Thu": "Playtime",
        "Fri": "Playtime"
    },
    "10:00 AM": {
        "Mon": "Playtime",
        "Tue": "Playtime",
        "Wed": "Playtime",
        "Thu": "Playtime",
        "Fri": "Playtime"
    },
    "10:30 AM": {
        "Mon": "Playtime",
        "Tue": "Playtime",
        "Wed": "Playtime",
        "Thu": "Playtime",
        "Fri": "Playtime"
    },
    "11:00 AM": {
        "Mon": "Morning Snack\nCircle Time",
        "Tue": "Morning Snack\nCircle Time",
        "Wed": "Morning Snack\nCircle Time",
        "Thu": "Morning Snack\nCircle Time",
        "Fri": "Morning Snack\nCircle Time"
    },
    "11:30 AM": {
        "Mon": "Circle Time",
        "Tue": "Circle Time",
        "Wed": "Circle Time",
        "Thu": "Circle Time",
        "Fri": "Circle Time"
    },
    "12:00 PM": {
        "Mon": "Lunch",
        "Tue": "Lunch",
        "Wed": "Lunch",
        "Thu": "Lunch",
        "Fri": "Lunch"
    },
    "12:30 PM": {
        "Mon": "Lunch",
        "Tue": "Lunch",
        "Wed": "Lunch",
        "Thu": "Lunch",
        "Fri": "Lunch"
    },
    "1:00 PM": {
        "Mon": "Playtime",
        "Tue": "Playtime",
        "Wed": "Playtime",
        "Thu": "Playtime",
        "Fri": "Playtime"
    },
    "1:30 PM": {
        "Mon": "Nap Time",
        "Tue": "Nap Time",
        "Wed": "Nap Time",
        "Thu": "Nap Time",
        "Fri": "Nap Time"
    },
    "2:00 PM": {
        "Mon": "Nap Time",
        "Tue": "Nap Time",
        "Wed": "Nap Time",
        "Thu": "Nap Time",
        "Fri": "Nap Time"
    },
    "2:30 PM": {
        "Mon": "Nap Time",
        "Tue": "Nap Time",
        "Wed": "Nap Time",
        "Thu": "Nap Time",
        "Fri": "Nap Time"
    },
    "3:00 PM": {
        "Mon": "Afternoon Snack\nPlaytime",
        "Tue": "Afternoon Snack\nPlaytime",
        "Wed": "Afternoon Snack\nPlaytime",
        "Thu": "Afternoon Snack\nPlaytime",
        "Fri": "Afternoon Snack\nPlaytime"
    },
    "3:30 PM": {
        "Mon": "Playtime",
        "Tue": "Playtime",
        "Wed": "Playtime",
        "Thu": "Playtime",
        "Fri": "Playtime"
    },
    "4:00 PM": {
        "Mon": "Pickup Begins",
        "Tue": "Pickup Begins",
        "Wed": "Pickup Begins",
        "Thu": "Pickup Begins",
        "Fri": "Pickup Begins"
    },
    "4:30 PM": {
        "Mon": "Pickup Begins",
        "Tue": "Pickup Begins",
        "Wed": "Pickup Begins",
        "Thu": "Pickup Begins",
        "Fri": "Pickup Begins"
    },
    "5:00 PM": {
        "Mon": "School Closes",
        "Tue": "School Closes",
        "Wed": "School Closes",
        "Thu": "School Closes",
        "Fri": "School Closes"
    },
    "5:30 PM": {
        "Mon": "School Closes",
        "Tue": "School Closes",
        "Wed": "School Closes",
        "Thu": "School Closes",
        "Fri": "School Closes"
    }
};