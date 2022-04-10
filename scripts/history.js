 document.addEventListener('DOMContentLoaded', function() {
     var calendarEl = document.getElementById('calendar');
     var calendar = new FullCalendar.Calendar(calendarEl, {
         initialView: 'dayGridMonth',
         events: [{
                 start: '2022-04-09',
                 display: 'background',
                 backgroundColor: 'black'
             },
             {
                 start: '2022-04-08',
                 display: 'background',
                 backgroundColor: 'green'
             },
             {
                 start: '2022-04-07',
                 display: 'background',
                 backgroundColor: 'blue'
             },
             {
                 start: '2022-04-06',
                 display: 'background',
                 backgroundColor: 'red'
             }
         ],

     });
     calendar.render();
 });