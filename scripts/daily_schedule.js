let globalCal;
let clickedEvent = "";
// 0 is nothing, 1 is Exercise, 2 is Productivity 3 is Mental Wellbeing
let addedTaskDict = {
    "Go for a walk": '1',
    "Study": '2',
    "Take a break": '3'
};

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

    // add task to task list dictionary with its category
    // 0 is nothing, 1 is Exercise, 2 is Productivity 3 is Mental Wellbeing
    const taskCategory = document.getElementById("addTaskForm")[1].value;
    addedTaskDict[taskText] = taskCategory;

    // var addedTask = document.getElementById(taskText);
    // var topVal = addedTask.offsetTop
    // if (topVal > 455) {
    //     addedTask.style.display = 'none';
    // }
    return false;
}

function deleteButtonEventClickShow() {
    var deleteButton = "delete-button";
    var completeButton = "complete-button";
    // var styleProp = "visibility"
    var styleProp = "display";
    var deleteElement = document.getElementById(deleteButton);
    var completeElement = document.getElementById(completeButton);
    if (deleteElement.currentStyle) {
        var deleteElementVis = deleteElement.currentStyle[styleProp];
    }
    else if (window.getComputedStyle) {
        var deleteElementVis = document.defaultView.getComputedStyle(deleteElement, null).getPropertyValue(styleProp);
    }
    // if (deleteElementVis === "hidden") {
    //     deleteElement.style.visibility = "visible";
    //     completeElement.style.visibility = "visible";
    // } else {
    //     deleteElement.style.visibility = "hidden";
    //     completeElement.style.visibility = "hidden";
    // }
    if (deleteElementVis === "none") {
        deleteElement.style.display = "block";
        completeElement.style.display = "block";
    } else {
        deleteElement.style.display = "none";
        completeElement.style.display = "none";
    }
}

function deleteButtonEventClick() {
    var eventId = clickedEvent;
    var categoryName = addedTaskDict[eventId];
    if (categoryName === '1') {
        categoryName = "Exercise";
    }
    else if (categoryName === '2') {
        categoryName = "Productivity";
    }
    else if (categoryName === '3') {
        categoryName = "Mental Wellbeing";
    }
    if (eventId != null) {
        var event = gloabalCal.getEventById(eventId);
        event.remove();
    }
    console.log(delete taskDictionary[categoryName]["projected"][eventId]);
    console.log(delete addedTaskDict[eventId]);
    deleteButtonEventClickShow();
}

function completeButtonEventClick() {
    var eventId = clickedEvent;
    var categoryName = addedTaskDict[eventId];
    if (categoryName === '1') {
        categoryName = "Exercise";
    }
    else if (categoryName === '2') {
        categoryName = "Productivity";
    }
    else if (categoryName === '3') {
        categoryName = "Mental Wellbeing";
    }
    if (eventId != null) {
        var event = gloabalCal.getEventById(eventId);
        event.remove();
    }
    console.log(taskDictionary[categoryName]["daily"].push(eventId));
    console.log(delete addedTaskDict[eventId]);
    deleteButtonEventClickShow();
}

function addTaskToDictionary(eventIn) {
    var eventId = eventIn.event.id;
    var categoryName = addedTaskDict[eventId];
    if (categoryName === '1') {
        categoryName = "Exercise";
    }
    else if (categoryName === '2') {
        categoryName = "Productivity";
    }
    else if (categoryName === '3') {
        categoryName = "Mental Wellbeing";
    }
    console.log(taskDictionary[categoryName]["projected"].push(eventId));
}