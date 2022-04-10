let projected_score = 0;
let daily_score = 0;
let num_tasks = 0;

$(document).ready( function() {

});

function celebrationSound() {
  
}

function moveCar() { //add to function when complete button clicked
  var increment = $('#racetrack').width()/num_tasks;
  var newPos = $('#car').css("right") + increment;
  $('#car').css("right", newPos);
}

function eventTenMinuteReminder() {
  var current = new Date();
  if(current.getHours < eventHrs && current.getMinutes < eventMinutes - 10) {
    window.alert("You have to " + eventBlurb + " in 10 minutes!");
  }
}

function eventEveningReminder() {
  if(current.getHours == 20 && projected_score < daily_score) {
    window.alert("It's 8 PM and you haven't achieved a score of 80 yet! Get to it!");
  }
}