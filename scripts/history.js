var events = [];

let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


var todaysScore = sessionStorage.getItem("pastScores");
console.log(todaysScore);
var backgroundColor;

if (todaysScore < 30) {
    backgroundColor = 'red';
} else if (todaysScore >= 30 && todaysScore < 60) {
    backgroundColor = 'yellow'
} else if (todaysScore >= 60) {
    backgroundColor = 'green';
}

events.push({
    start: today,
    display: 'background',
    backgroundColor: backgroundColor
});

console.log(events);
document.addEventListener('DOMContentLoaded', function() {
    loadCalendar();
});

function loadCalendar() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: events,
    });
    calendar.render();
}