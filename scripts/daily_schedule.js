let globalCal;
let clickedEvent = "";

document.addEventListener('DOMContentLoaded', function () {
    loadCalendar();
});

// code for category selction and add button
$(document).ready(function () {
    $('#addTaskForm input,select').on('change', function () {
        var form = this.form;
        var isValid = form.checkValidity();
        $(':submit').attr('disabled', !isValid);
    });
});


function loadCalendar() {
    var Calendar = FullCalendar.Calendar;
    var calendarEl = document.getElementById('calendar');
    var Draggable = FullCalendar.Draggable;
    var containerEl = document.getElementById('external-events');

    // initialize the external events for dragable feature
    new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            return {
                title: eventEl.innerText,
                id: eventEl.innerText
            };
        }
    });

    // init Calendar
    calendar = new Calendar(calendarEl, {
        initialView: 'timeGridDay',
        editable: true,
        selectable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        nowIndicator: true,
        eventReceive: function (info) {
            addTaskToDictionary(info);
        },
        drop: function (info) {
            info.draggedEl.parentNode.removeChild(info.draggedEl);
        },
        eventClick: function (info) {
            deleteButtonEventClickShow();
            clickedEvent = info.event.id;
        }
    });
    gloabalCal = calendar;
    calendar.render();
}

function addButton() {
    // get task text
    const taskText = document.getElementById("addTaskForm")[0].value;

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
    outerNewDiv.id = taskText

    // add the newly created element and its content into the DOM
    // if the top won't overrun the size
    const currentDiv = document.getElementById("external-events");
    currentDiv.appendChild(outerNewDiv)

    var addedTask = document.getElementById(taskText);
    var topVal = addedTask.offsetTop
    if (topVal > 455) {
        addedTask.style.display = 'none';
    }
    return false;
}

function deleteButtonEventClickShow() {
    var deleteButton = "delete-button";
    var completeButton = "complete-button";
    var styleProp = "visibility"
    var deleteElement = document.getElementById(deleteButton);
    var completeElement = document.getElementById(completeButton);
    if (deleteElement.currentStyle) {
        var deleteElementVis = deleteElement.currentStyle[styleProp];
    }
    else if (window.getComputedStyle) {
        var deleteElementVis = document.defaultView.getComputedStyle(deleteElement, null).getPropertyValue(styleProp);
    }
    if (deleteElementVis === "hidden") {
        deleteElement.style.visibility = "visible";
        completeElement.style.visibility = "visible";
    } else {
        deleteElement.style.visibility = "hidden";
        completeElement.style.visibility = "hidden";
    }
}

function deleteButtonEventClick() {
    var eventId = clickedEvent;
    if (eventId != null) {
        var event = gloabalCal.getEventById(eventId);
        event.remove();
    }
    if (taskDictionary.hasOwnProperty(eventId)) {
        delete taskDictionary[eventId];
    }
    deleteButtonEventClickShow();
}

function completeButtonEventClick() {

}


function addTaskToDictionary(eventIn) {
    var eventId = eventIn.event.id;
    console.log(taskDictionary["Exercise"]["daily"][0] = eventId);
}

function popUpFunction() {
    var popwindow = document.getElementById("popup-delete-confirm");
    var test = popwindow.style.display;
    if (test === "none") {
        popwindow.style.display = "block";
    } else {
        popwindow.style.display = "none";
    }
}