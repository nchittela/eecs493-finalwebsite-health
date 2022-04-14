var dailyValue = document.getElementById("dailyCircle").innerText;
// var dailyValue = document.querySelector('#dailyCircle');
var pastScores = [];
pastScores.push(dailyValue);

sessionStorage.setItem("pastScores", pastScores);

console.log(dailyValue);
var scaledDailyScore = parseInt(document.getElementById("dailyCircle").innerText) / 100;
// document.querySelector('color').style.color = makeColor(scaled_score);
document.getElementById("dailyCircle").style.backgroundColor = makeColor(scaledDailyScore);

var projectedValue = document.getElementById("projCircle").innerText;
console.log(projectedValue);
var scaledProjScore = parseInt(document.getElementById("projCircle").innerText) / 100;
document.getElementById("projCircle").style.backgroundColor = makeColor(scaledProjScore);

// since scores will be out of 100, we can divide by 100 to get values that are from 0 to 1, which makeColor needs as param

function intToHex(i) {
    var hex = parseInt(i).toString(16);
    return (hex.length < 2) ? "0" + hex : hex;
}

function makeColor(value) {
    // value must be between [0, 510]
    value = Math.min(Math.max(0, value), 1) * 510;

    var redValue;
    var greenValue;
    if (value < 255) {
        redValue = 255;
        greenValue = Math.sqrt(value) * 16;
        greenValue = Math.round(greenValue);
    } else {
        greenValue = 255;
        value = value - 255;
        redValue = 255 - (value * value / 255)
        redValue = Math.round(redValue);
    }
    return "#" + intToHex(redValue) + intToHex(greenValue) + "00";
}