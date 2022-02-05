$(document).ready(function () {

    var gamePattern = []
    var userClickedPattern = []

    //new color to the sequence
    function nextSequence() {
        let randomNumber = Math.floor(Math.random() * 4)
        let randomColor

        switch (randomNumber) {
            case 0:
                randomColor = 'red'
                break;
            case 1:
                randomColor = 'blue'
                break;
            case 2:
                randomColor = 'green'
                break;
            case 3:
                randomColor = 'yellow'
                break;

            default:
                console.log(randomNumber);
                break;
        }

        gamePattern.push(randomColor)

        $('#' + randomColor).fadeIn(100).fadeOut(50).fadeIn(100)
        playSound(randomColor)
    }

    //audio
    function playSound(name) {
        let audio = new Audio('/sounds/' + name + '.mp3')
        audio.play()
    }

    //mouse events
    $('.btn').click(function () {
        let userChosenColor = $(this).attr('id')
        playSound(userChosenColor)

        userClickedPattern.push(userChosenColor)
    });

    //button animations
    $('.btn').mousedown(function () {
        $(this).addClass("pressed");
    });

    $('.btn').mouseup(function () {
        $(this).removeClass("pressed");
    });

    $('.btn').mouseout(function () {
        $(this).removeClass("pressed");
    });


})