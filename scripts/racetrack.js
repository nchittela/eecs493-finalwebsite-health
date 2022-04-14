let projected_score = 20;
let daily_score = 5;

$(document).ready( function() {
  // console.log($("#car").css("left"));
  
  // $("#car").css("left", "1000px");
  // console.log($("#car").css("left"));
  // moveCar();
});

function celebrationSound() {
  
}

function moveCar() { //add to function when complete button clicked
  $("#car").css("left", ((daily_score/projected_score)*$("#racetrack").width()) - 105);
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