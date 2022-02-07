$(document).ready(function () {

    let gamePattern = []
    let userClickedPattern = []
    let level = 0
    let started = false

    //new color to sequence
    function nextSequence() {
        let randomNumber = Math.floor(Math.random() * 4)
        let randomColor
        userClickedPattern = []

        updateTitle(`Level ${++level}`)

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
        playSequence()

    }

    //play sequence 
    function playSequence() {

        let delay = calcDelay()

        gamePattern.forEach((button, i) => {
            setTimeout(() => {
                $('#' + button).fadeIn(100).fadeOut(150).fadeIn(100)
                playSound(button)
            }, delay * i);
        })

    }

    function calcDelay() {
        if (level <= 5)
            return 500
        else if (level <= 9)
            return 400
        else if (level <= 13)
            return 350
        else
            return 300
    }

    //compare user pattern with game pattern
    function checkAnswer(index) {
        if (userClickedPattern[index - 1] === gamePattern[index - 1]) {
            if (index === level)
                setTimeout(nextSequence, 750);

        } else
            gameOver()
    }

    //game over
    function gameOver() {
        playSound('wrong')
        updateTitle('Game Over')
        $('body').addClass("game-over")
        $('.container').hide()
        $('.btn-start').show()
        $('.btn-start').text('Restart')

    }

    function reset() {
        updateTitle('Simon Game')
        $('body').removeClass("game-over")
        $('.container').show()

        started = false
        level = 0
        gamePattern = []
    }

    //update title
    function updateTitle(title) {
        $('#level-title').text(title)
    }

    //audio
    function playSound(name) {
        let audio = new Audio('sounds/' + name + '.mp3')
        audio.play()
    }

    //click events 
    $('.btn-start').click(function () {
        playSound('start')
        clickAnimation(this)
        $('.btn-start').hide()

        if (started === false) {
            setTimeout(nextSequence, 1000)
            started = true
        } else {
            reset()
            setTimeout(nextSequence, 1000)
            started = true
        }
    })

    $('.btn').click(function () {
        clickAnimation(this)

        let userChosenColor = $(this).attr('id')
        playSound(userChosenColor)

        if (started === true) {
            userClickedPattern.push(userChosenColor)

            checkAnswer(userClickedPattern.length)
        }
    });

    function clickAnimation(button) {
        $(button).addClass("pressed");
        setTimeout(function () {
            $(button).removeClass("pressed")
        }, 100)
    }


})

