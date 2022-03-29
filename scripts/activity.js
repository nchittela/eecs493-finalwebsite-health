let selectedActivities = [];
$(document).ready( function() {
    console.log("nice");
    $('.options').css('display', 'none');
    $('.options').children().each(function(){
        addActivity($(this).text(), $('.check-box'));
        selectedActivities.push($(this).text());
    });
    makeWheel(selectedActivities);
});


function addActivity(activity, parent){
    let str = "";
    str+="<div class='activity'><input type='checkbox' name='" + activity +"' value='" + activity + "'>";
    str+="<label for='"+activity+"'>"+ activity + "</label></div>";
    parent.append(str)
}



function makeWheel(selected){
    let color = ["red", "green", "blue", "purple", "yellow", "black"];
    let pieSize = 360/selected.length;
    let pie = "";
    for (let i = 0; i < selected.length; i++) {
        pie += color[i] + " " + i*pieSize + "deg "+ (i+1)*pieSize + "deg, "
    }
    console.log("conic-gradient("+pie.slice(0,-2)+")");
    $('.roulette').css({
        "display":"block",
        "width":"400px",
        "height":"400px",
        "border-radius":"50%",
        "background-image":"conic-gradient("+pie.slice(0,-2)+")"
    })
}