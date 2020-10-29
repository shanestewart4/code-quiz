
//Question Array
var questions = [
    {
        title: "An if / else statement's condition is enclosed within ____.",
        choices: ["curly brackets", "basketballs", "square brackets", "parentheses"],
        answer: "parentheses"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "grasshoppers"],
        answer: "quotes"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["booleans", "strings", "goats", "alerts"],
        answer: "alerts"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["HTML", "terminal / bash", "console log", "for loops"],
        answer: "console log"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "booleans", "other arrays", "all of the above"],
        answer: "all of the above"
    },
]

// Variables

var score = 0;
var questionIndex = 0;

//Link with existing HTML elements

var currentTime = document.querySelector("#current-time");
var timer = document.querySelector("#start-time");
var questionWrapper = document.querySelector("#question-wrapper");
var quizQuestions = document.querySelector("#quiz-questions");

// set quiz timing

var timeLeft = 75; //15 seconds per question
var timeInterval = 0; //interval time
var incorrectPenalty = 10; //penalty time for wrong answer
var createUlEl = document.createElement("ul");  //creates new element

//timer function, also starts the quiz

timer.addEventListener("click", function(){
    if (timeInterval === 0) {
        timeInterval = setInterval(function(){
            timeLeft--;
            currentTime.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                finishQuiz();
                currentTime.textContent = "Time is up!";
            }
        }, 1000)
    }
    render(questionIndex);
});


//render questions/choices to the page

function render (questionIndex) {
    quizQuestions.innerHTML = ""; //removes prior question data
    createUlEl.innerHTML = ""; //removes prior Ul data
    var userQ = questions[questionIndex].title;
    var userC = questions[questionIndex].choices; //appends questions
    quizQuestions.textContent = userQ;
    quizQuestions.setAttribute("class", "quiz-questions")
    createUlEl.setAttribute("class", "quiz-questions")
    userC.forEach(function(choice){
        var liEl = document.createElement("li"); //list element
        liEl.textContent = choice;
        liEl.setAttribute("class", "no-bullets")
        quizQuestions.appendChild(liEl);
        liEl.addEventListener("click", verify);
    })

}


//figure out if answer is true or false

function verify(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDivEl = document.createElement("div");
        createDivEl.setAttribute("id", "create-div");
        //If correct
        if (element.textContent === questions[questionIndex].answer) {
            score++;
            createDivEl.textContent = "Correct!"
        }
        //if Incorrect
        else {
            timeLeft = timeLeft - incorrectPenalty;
            createDivEl.textContent = "Incorrect! The correct choice is " + questions[questionIndex].answer;
        }
    }
    //Determine question number
    questionIndex++;
    if (questionIndex >= questions.length){
        finishQuiz();
        createDivEl.textContent = "Your score is: " + score + "/" + questions.length + ".";
    }
    else {
        render(questionIndex);
    }
    //append div element to quiz questions div
    quizQuestions.appendChild(createDivEl)
}

function finishQuiz() {
    quizQuestions.innerHTML = ""; //removes prior question data
    currentTime.innerHTML = ""; //removes prior time data

    //Heading Text & append heading
    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "create-h1");
    h1El.textContent = "The quiz is over!"
    quizQuestions.appendChild(h1El);

    var pEl = document.createElement("p");
    pEl.setAttribute("id", "create-p")
    quizQuestions.appendChild(pEl);


    //adds time remaining to score

    if (timeLeft >= 0) {
        var timeScore = timeLeft;
        clearInterval(timeInterval)
        pEl.textContent = "Your scored a total of " + timeScore + ".";
        quizQuestions.appendChild(pEl);
    }
    //create label
    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "label-element");
    labelEl.textContent = "Please enter your initials: "

    quizQuestions.appendChild(labelEl);

    //create input
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute ("id", "initials")
    inputEl.textContent = "";

    quizQuestions.appendChild(inputEl);


    //create submit

    var submitEl = document.createElement("button");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute ("id", "submit")
    submitEl.textContent = "Submit";
    
    quizQuestions.appendChild(submitEl);


    //event listener on submit button that caputures data

    submitEl.addEventListener("click", function (){
        var initials = inputEl.value;

        if (initials === null) {
            alert("Enter Your Initials!");
        }
        else {
            var totalScore = {
                initials: initials,
                score: timeLeft
            }
            console.log(totalScore);
            var userScores = localStorage.getItem("allScores");
            if (userScores === null) {
                userScores = [];
            }
            else {
                userScores = JSON.parse(userScores);
            }
            userScores.push(totalScore);
            var updateScore = JSON.stringify(userScores);
            localStorage.setItem("userScores", updateScore);
            
            window.location.replace("./highscores.html");

            
        }
    });

}