# Balance
Balance is a web app that aims to help users live a healthier life.

A hosted version of Balance is found at: https://balance493.github.io/Balance/ . The current hosted version is slightly behind in terms of most recent updates to the page, but should be completely updated within the next couple of days.

Balance's only external library usage is Fullcalander’s full JS calendar. Fullcalendar is made by others and more information can be found at https://fullcalendar.io/


## Contributions:

### Nikitha Chittela
Nikitha implemented the car and race track animation. The race track is scaled off of the user's projected score, so the distance the car travels is based off of the daily score relative to the projected score. Each time the daily score is updated, the car will move accordingly. Nikitha also created the template UI for our website.

Nikitha plans on finishing implementing the reminders and notifications she was assigned, where once the user's next activity is 10 minutes from the current time, the website will notify the user with details regarding the upcoming task. She also plans on adding a confetti animation to the car animation whenever the user marks a task on the daily calendar as completed.

### Chase Henley
Chase created the task creation and calendar widget using the Fullcalendar JS calendar  library. Users first type in the name of the task they want to add to their calendar. Then users select a category for which the task falls under. Once the user clicks the add button the task is added to a list of tasks from which the user can select from. When the user drags and drops a specific task from that list the task gets added to the calendar and to the taskDictionary and the projected score gets updated. If the user clicks on a calendar event a delete and complete event button appear. When the user then clicks delete event the event is removed from the calendar and removed from the raskDictionary. The projected score is also updated. If a user clicks complete task the event is deleted from the calendar and the daily score is updated.

Chase plans on improving the usability of the calendar and make it so the color of the tasks will correspond to their category. He also plans to add an undo button for the users to have if they would like to reverse multiple changes.


### Eugene Kim
Eugene implemented the scores widget and defined weightings for categories. The categories as of the high fidelity prototype are Exercise (weight of 10 points), Productivity (weight of 5 points), and Mental Wellbeing (weight of 5 points). The scores widget is split into two components: a daily score and a projected score. The daily score refers to the score that is calculated based off of the user's completed tasks, whereas the projected score refers to the score that is calculated based off of all the tasks the user has planned in the daily calendar. The scores are initialized to zero, and when the user adds task elements to the daily calendar widget, the score is updated in realtime based off of the category the task belongs in. The colors of the scores are also dynamically updated as a gradient with respect to the score value, with red indicating a low score and green indicating a high score.

Eugene also plans to implement a confetti animation whenever the user's daily score reaches a score of at least 80, in which case the user will also be prompted a pop-up message congratulating the user for having a productive day. 

### Tae Hoon Kim

Tae Hoon created a history page where it shows the history of the user’s scores. Right now, he uses a feature in the FullCalendar library called background events to indicate the score of the day. The background event will fill the day with a certain color. He utilizes session data to extract necessary data from our data structure and update 
the calendar respectively. 

Tae Hoon is still figuring out how to save the user’s previous scores without refreshing, so he plans on figuring this out after the high-fidelity prototype. Once storing the scores is working, he plans on adding a graph to give another visualization of the user’s history. He also plans to present the user a graph of some sort of analyzed data showing their progress over the past week/month, whether it be average daily scores, total number of tasks completed, etc. 

### Travis Lu
Travis created a button on the home page that would open up a pop up when clicked on. In the pop-up there is a roulette wheel and categories where the user is able to select what kind of activities they would like to generate. A roulette wheel of activities is then generated and one would be selected at random when the user presses spin. The activity output by the roulette wheel will then be added to the activity calendar for the user to select and drag into their schedule. 

As of right now, the roulette wheel cannot be used multiple times, which he plans on improving for the final product. Travis also plans on the addition of more categories and options. 