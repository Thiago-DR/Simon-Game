$(document).ready(function () {

    let gamePattern = []
    let userClickedPattern = []
    let level = 0
    let score = 0
    let started = false
    let userTurn = true

    //new color to sequence
    function nextSequence() {
        let randomNumber = Math.floor(Math.random() * 4)
        let randomColor
        userTurn = false
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
        playSequence(() => {
            userTurn = true
        })
    }

    //play sequence 
    function playSequence(callback) {

        let delay = calcDelay()
        let indexCounter = 0

        gamePattern.forEach((button, index, array) => {
            setTimeout(() => {
                $('#' + button).fadeIn(100).fadeOut(150).fadeIn(100)
                playSound(button)
                indexCounter++

                if (indexCounter == array.length) callback()
            }, delay * index);
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
            if (index === level) {
                score++
                setTimeout(nextSequence, 750);
            }
        } else
            gameOver()
    }

    //game over
    function gameOver() {
        playSound('wrong')
        updateTitle('Game Over')
        $('body').addClass("game-over")
        $('.container').hide()
        $('.score').text(`Score:${score}`).show()
        $('.btn-start').show()
        $('.btn-start').text('Restart')

    }

    function reset() {
        updateTitle('Simon Game')
        $('body').removeClass("game-over")
        $('.score').hide()
        $('.container').show()

        started = false
        level = 0
        score = 0
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

        if (userTurn === true) {

            clickAnimation(this)
            let userChosenColor = $(this).attr('id')
            playSound(userChosenColor)

            if (started === true) {
                userClickedPattern.push(userChosenColor)

                checkAnswer(userClickedPattern.length)
            }
        }
    });

    function clickAnimation(button) {
        $(button).addClass("pressed");
        setTimeout(function () {
            $(button).removeClass("pressed")
        }, 100)
    }


})

