let globalCal;
let clickedEvent = "";
// 0 is nothing, 1 is Exercise, 2 is Productivity 3 is MentalWellbeing
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
        form = this.form;
        isValid = form.checkValidity();
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
            eventCategory = addedTaskDict[eventEl.innerText];
            desiredColor = '#000'
            if (eventCategory === '1') {
                desiredColor = '#ff4a4a';
            }
            else if (eventCategory === '2') {
                desiredColor = '#00ff00';
            }
            else if (eventCategory === '3') {
                desiredColor = '#95e5ff';
            }
            return {
                title: eventEl.innerText,
                id: eventEl.innerText,
                color: desiredColor,
            };
        }
    });

    // init Calendar
    var calendar = new Calendar(calendarEl, {
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

    // add task to task list dictionary with its category
    // 0 is nothing, 1 is Exercise, 2 is Productivity 3 is Mental Wellbeing
    const taskCategory = document.getElementById("addTaskForm")[1].value;
    addedTaskDict[taskText] = taskCategory;

    fcEvent = document.createElement("div");
    // change color based on category
    if (taskCategory === '1') {
        fcEvent.setAttribute("class", "Exercise fc-event fc-daygrid-event fc-daygrid-block-event");
    }
    else if (taskCategory === '2') {
        fcEvent.setAttribute("class", "Productivity fc-event fc-daygrid-event fc-daygrid-block-event");
    }
    else if (taskCategory === '3') {
        fcEvent.setAttribute("class", "MentalWellbeing fc-event fc-daygrid-event fc-daygrid-block-event");
    }

    // crete a new inner div element
    fcMain = document.createElement("div");
    fcMain.setAttribute("class", "fc-event-main")

    // and give inner div some content
    const newContent = document.createTextNode(taskText);

    // add the text node to the newly created div
    fcMain.appendChild(newContent);

    // append new inner div to outer div
    fcEvent.appendChild(fcMain);

    // add the newly created element and its content into the DOM
    // if the top won't overrun the size
    const currentDiv = document.getElementById("addedEvents");
    currentDiv.appendChild(fcEvent)

    return false;
}

function addChosenTaskToDropDown(taskStringIn) {
    fcEvent = document.createElement("div");
    fcEvent.setAttribute("class", "Exercise fc-event fc-daygrid-event fc-daygrid-block-event");

    // crete a new inner div element
    fcMain = document.createElement("div");
    fcMain.setAttribute("class", "fc-event-main")

    // and give inner div some content
    const newContent = document.createTextNode(taskStringIn);

    // add the text node to the newly created div
    fcMain.appendChild(newContent);

    // append new inner div to outer div
    fcEvent.appendChild(fcMain);

    // add the newly created element and its content into the DOM
    // if the top won't overrun the size
    const currentDiv = document.getElementById("addedEvents");
    currentDiv.appendChild(fcEvent)

    // add task to task list dictionary with its category
    // 0 is nothing, 1 is Exercise, 2 is Productivity 3 is Mental Wellbeing
    // since this is coming from exercise wheel its always exercise
    const taskCategory = '1';
    addedTaskDict[taskStringIn] = taskCategory;
    return false;
}

function deleteButtonEventClickShow() {
    deleteButton = "delete-button";
    completeButton = "complete-button";
    //  styleProp = "visibility"
    styleProp = "display";
    deleteElement = document.getElementById(deleteButton);
    completeElement = document.getElementById(completeButton);
    if (deleteElement.currentStyle) {
        deleteElementVis = deleteElement.currentStyle[styleProp];
    }
    else if (window.getComputedStyle) {
        deleteElementVis = document.defaultView.getComputedStyle(deleteElement, null).getPropertyValue(styleProp);
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
    eventId = clickedEvent;
    categoryName = addedTaskDict[eventId];
    if (categoryName === '1') {
        categoryName = "Exercise";
    }
    else if (categoryName === '2') {
        categoryName = "Productivity"
    }
    else if (categoryName === '3') {
        categoryName = "MentalWellbeing";
    }
    if (eventId != null) {
        var event = gloabalCal.getEventById(eventId);
        event.remove();
    }
    indexToDelete = taskDictionary[categoryName]["projected"].indexOf(eventId, 0);
    console.log(taskDictionary[categoryName]["projected"].splice(indexToDelete, 1));
    console.log(delete addedTaskDict[eventId]);
    deleteButtonEventClickShow();
    getNewScore(taskDictionary);
}

function completeButtonEventClick() {
    eventId = clickedEvent;
    categoryName = addedTaskDict[eventId];

    if (categoryName === '1') {
        categoryName = "Exercise";
    }
    else if (categoryName === '2') {
        categoryName = "Productivity";
    }
    else if (categoryName === '3') {
        categoryName = "MentalWellbeing";
    }
    if (eventId != null) {
        var event = gloabalCal.getEventById(eventId);
        event.remove();
    }
    console.log(taskDictionary[categoryName]["daily"].push(eventId));
    console.log(delete addedTaskDict[eventId]);
    deleteButtonEventClickShow();
    getNewScore(taskDictionary);

    // move the car forward on racetrack
    daily_score = document.getElementById("dailyCircleNum").innerHTML;
    projected_score = document.getElementById("projCircleNum").innerHTML;
    console.log("daily: " + document.getElementById("dailyCircleNum").innerHTML);
    console.log("proj:" + document.getElementById("projCircleNum").innerHTML);
    $("#car").css("left", ((daily_score / projected_score) * $("#racetrack").width()) - 105);
}

function addTaskToDictionary(eventIn) {
    eventId = eventIn.event.id;
    categoryName = addedTaskDict[eventId];
    if (categoryName === '1') {
        categoryName = "Exercise";
    }
    else if (categoryName === '2') {
        categoryName = "Productivity";
    }
    else if (categoryName === '3') {
        categoryName = "MentalWellbeing";
    }
    console.log(taskDictionary[categoryName]["projected"].push(eventId));
    getNewScore(taskDictionary);

    // move the car forward on racetrack
    daily_score = document.getElementById("dailyCircleNum").innerHTML;
    projected_score = document.getElementById("projCircleNum").innerHTML;
    console.log("daily: " + document.getElementById("dailyCircleNum").innerHTML);
    console.log("proj:" + document.getElementById("projCircleNum").innerHTML);
    $("#car").css("left", ((daily_score / projected_score) * $("#racetrack").width()) - 105);
}