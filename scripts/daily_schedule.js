document.addEventListener('DOMContentLoaded', function () {
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    var containerEl = document.getElementById('external-events');
    var calendarEl = document.getElementById('calendar');
    var checkbox = document.getElementById('drop-remove');

    // initialize the external events
    // -----------------------------------------------------------------

    new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            return {
                title: eventEl.innerText
            };
        }
    });

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new Calendar(calendarEl, {
        initialView: 'timeGridDay',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth'
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function (info) {
            info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
    });

    calendar.render();
});

function addButton() {
    // get task text
    const taskText = document.getElementById("taskInput").value;

    // create a new outer div element
    outerNewDiv = document.createElement("div");
    outerNewDiv.setAttribute("class", "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event");

    // crete a new inner div element
    innerNewDiv = document.createElement("div");
    innerNewDiv.setAttribute("class", "fc-event-main")

    // and give inner div some content
    const newContent = document.createTextNode(taskText);

    // add the text node to the newly created div
    innerNewDiv.appendChild(newContent);

    // append new inner div to outer div
    outerNewDiv.appendChild(innerNewDiv);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("external-events");
    currentDiv.appendChild(outerNewDiv)
}