let cat = $('.categories');
let legActivities = ['4 x 20 Squats', '3 x 1 Minute Wall Sit', '5 X 8 Hip Raises', '3 x 8 Squat Jumps', '3 x 10 Lunges', '3 x 8 Bulgarian Squats'];

$(document).ready( function() {
    console.log("nice");
    cat.css('display', 'none');
    buildChecklist(cat, $('.check-box'));
    check($('.check-box'))
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

function check(parent){
    $('input[type="checkbox"]').click(function() {
        if($(this).prop("checked") == true) {
            $('.wheels').append("<img src='images/leg.png' class='roulette' id='"+$(this).val()+"-wheel'>");
            $('.wheels').append("<img src='images/arrow.png' class='arrow' id='"+$(this).val()+"-arrow'>");
            let object = $('#'+$(this).val()+'-wheel');
            let p = object.position();
            $('#'+$(this).val()+'-wheel').css("position", "relative");
            console.log(object.height()/2);
            $('#'+$(this).val()+'-arrow').css({
                "z-index": 1,
                "position": "absolute",
                "left": p.left+object.width(),
                "top": p.top + object.width()/2 - $('#'+$(this).val()+'-arrow').width()/2
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
            activities += legActivities[Math.floor((deg%360)/60)];
        })
        $('.result').append("<h1>Your activities are "+activities+" </h1>")
        $('.result').css("display", "none");
        setTimeout(function(){
            $('.result').css("display", "block");
        }, 2000);
    });
}