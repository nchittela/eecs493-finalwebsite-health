let cat = $('.categories');
let activitiesDict = {
    'legs-wheel' : ['4 x 20 Squats', '3 x 1 Minute Wall Sit', '5 X 8 Hip Raises', '3 x 8 Squat Jumps', '3 x 10 Lunges', '3 x 8 Bulgarian Squats'],
    'core-wheel' : ['4 x 15 Sit Ups', '3 x 1 Minute Planks', '3 x 10 Leg Lifts', '3 x 20 Crunches' + '2 x 30sec Side Crunches', '4 x 10 Russian Twists'],
    'arms-wheel' : ['4 x 5 Dips', '4 x 5 Incline Push Ups', '4 X 20 Arm Circles', '4 x 5 Pull Ups', '4 x 5 Bicep Curls', '4 x 5 Decline Push Ups'],
    'cardio-wheel' : ['4 x 1min High Knees', '4 x 20 Mountain Climbers', 'Run 1 Mile', '4 x 5 Burpees', '4 x 1min Jumping Jacks', 'Run 1 Mile'],
    'yoga-wheel' : ['4 x 30sec Warrior Pose', '4 x 30sec Bridge Pose', '4 x 30sec Cobra Pose', '4 x 30sec Boat Pose', '4 x 30sec Table Pose', "4 x 30sec Child's Pose"],
}


$(document).ready( function() {
    console.log("nice");
    cat.css('display', 'none');
    buildChecklist(cat, $('.check-box'));
    check();
    submit();
});



function buildChecklist(parent, target){
    console.log("yup")
    parent.children().each(function(){
        addActivity($(this).text(), target);
    });
    target.append("<input type='submit' value='spin'>")
}

function addActivity(activity, parent){
    let str = "";
    str+="<div class='category'><input type='checkbox' id='" + activity +"' value='" + activity + "'>";
    str+="<label for='"+activity+"'>"+ activity + "</label></div>";
    parent.append(str)
}

function check(){
    $('input[type="checkbox"]').click(function() {
        if($(this).prop("checked") == true) {
            $('.wheels').append("<img src='images/"+$(this).val()+".png' class='roulette' id='"+$(this).val()+"-wheel'>");
            $('.wheels').append("<img src='images/arrow.png' class='arrow' id='"+$(this).val()+"-arrow'>");
            let pos = $("#"+$(this).val()+"-wheel").position();
            $("#"+$(this).val()+"-arrow").css({
                "left":pos.left+270+"px",
                "top":pos.top+250/2-17/2+"px"
            });
        }
        if($(this).prop("checked") == false){
            console.log('#'+$(this).val()+'-wheel');
            $('#'+$(this).val()+'-wheel').remove();
            $('#'+$(this).val()+'-arrow').remove();
        }
    });
}


function submit(){
    console.log("yuh");
    $('input[type="submit"]').click(function(){
        activities = '';
        $(".wheels").find('.roulette').each(function(){
            $(this).removeAttr('style');
            var deg = 500 + Math.round(Math.random() * 1000);
            if(deg%60==0){
                deg += 1;
            }
            var txt = '-webkit-transform: rotate(' + deg + 'deg);';
            console.log(deg);
            $(this).attr('style', txt);
            console.log(activitiesDict[$(this).attr("id")]);
            activities += activitiesDict[$(this).attr("id")][Math.floor((deg%360)/60)] + " ";
        })
        $('.result').append("<h1>Your activities are "+activities+" </h1>")
        $('.result').css("display", "none");
        setTimeout(function(){
            $('.result').css("display", "block");
        }, 2000);
    });
}