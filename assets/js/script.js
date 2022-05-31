//get elements from HTMl index to target
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");
var answerButtonEl;
var answerButtonEl;
var viewHighScoresEl = document.querySelector("#high-scores");
var feedbackEl = document.querySelector(".feedback");
var cardContentEl = document.querySelector(".card-content");
var countdownEl = document.querySelector("#countdown");


//make an array to hold each question and answer together
var questions = [
    {
        question: "How are you?",
        //make an inner array to hold the 4 possible answers
        answers: ["1", "2", "3", "4"],
        correct: "1"
    },
    {
        question: "whats up?",
        //make an inner array to hold the 4 possible answers
        answers: ["5", "6", "7", "8"],
        correct: "1"
    },
    {
        question: "whats your name?",
        //make an inner array to hold the 4 possible answers
        answers: ["9", "10", "11", "12"],
        correct: "1"
    },
    {
        question: "who?",
        //make an inner array to hold the 4 possible answers
        answers: ["1", "2", "3", "4"],
        correct: "1"
    },
    {
        question: "why?",
        //make an inner array to hold the 4 possible answers
        answers: ["1", "2", "3", "4"],
        correct: "1"
    },
    {
        question: "when?",
        //make an inner array to hold the 4 possible answers
        answers: ["1", "2", "3", "4"],
        correct: "1"
    },
    {
        question: "where?",
        //make an inner array to hold the 4 possible answers
        answers: ["1", "2", "3", "4"],
        correct: "1"
    },
    {
        question: "what?",
        //make an inner array to hold the 4 possible answers
        answers: ["1", "2", "3", "4"],
        correct: "1"
    }
];

// var randomizedQuestionSet = questions.sort(() => Math.random() - .5);
// var currentQuestionIndex = 0;
// var questionObj = randomizedQuestionSet[currentQuestionIndex];
// currentQuestionIndex = 0;

var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var selectedAnswer;

var correctAnswers = [];
var score = correctAnswers.length;
//correctAnswers.push(1); whenever selected answer gets correct feedback
localStorage.setItem("score", JSON.stringify(score));

var timeLeft = 60;
var countdown = setInterval(function() {
        timeLeft--;
        countdownEl.textContent = "0:" + timeLeft;
        if (timeLeft === 0) {
            stopTimer();
        }
    }, 1000);

function stopTimer() {
    countdownEl.textContent = '';
    clearInterval(countdown);
    countdownEl.textContent = "Quiz over!";
    setTimeout(endQuiz, 500);
};

function decreaseTimer() {
    timeLeft = timeLeft - 5;
};

var clearAnswers = function() {
    answersEl.innerHTML = "";
    questionEl.innerHTML = "";
};

//defined function to start game, that will lead to first question on click
var startGame = function() {
    setInterval(countdown);
    currentQuestionIndex = 0;
    quizIntroEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

var currentQuestionIndex = 0

var nextQuestion = function() {
    clearAnswers();
        questionContentEl = document.createElement("h2");
        questionContentEl.className = "question-content";
        questionContentEl.setAttribute("value", questions[currentQuestionIndex].question);
        questionContentEl.textContent = questions[currentQuestionIndex].question;
        questionEl.appendChild(questionContentEl);
        for (var i=0; i < questions[currentQuestionIndex].answers.length; i++) {
            answerButtonEl = document.createElement("button");
            answerButtonEl.className = "answer-btn btn";
            answerButtonEl.setAttribute("value", questions[currentQuestionIndex].answers[i]);
            answerButtonEl.textContent = questions[currentQuestionIndex].answers[i]; 
            answersEl.appendChild(answerButtonEl);
            answerButtonEl.addEventListener("click", selectAnswer);
            console.log(answerButtonEl);
        }
    
};

var endQuiz = function() {
    console.log ("quiz over")
    feedbackEl.textContent = "";
    questionContainerEl.classList.add("hide");
    clearInterval(countdown);
}

var correctFeedback = function() {
    console.log("correct"); 
    correctAnswers.push(1);
    console.log(correctAnswers);
    selectedAnswer.style.backgroundColor="green";
    feedbackEl.textContent = "";
    feedbackEl = document.createElement("h3");
    feedbackEl.className = "feedback correct";
    feedbackEl.textContent = "You got it!"; 
    cardContentEl.appendChild(feedbackEl);
}

var wrongFeedback = function() {
    console.log("wrong"); 
    decreaseTimer(countdown);
    selectedAnswer.style.backgroundColor="red";
    feedbackEl.textContent = "";
    feedbackEl = document.createElement("h3");
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "Whoops! Not quite!"; 
    cardContentEl.appendChild(feedbackEl);
}

var selectAnswer = function(event) {
    selectedAnswer = event.target;
    console.log(currentQuestionIndex);
    console.log(selectedAnswer.value);
    console.log(questions.length);
        if (questions.length < currentQuestionIndex + 2 && selectedAnswer.value == questions[currentQuestionIndex].correct) {
            correctFeedback();
            stopTimer();
            setTimeout(endQuiz, 500);
        }
        else if (questions.length < currentQuestionIndex + 2) {
            wrongFeedback();
            stopTimer();
            setTimeout(endQuiz, 500);
        }
        else if (selectedAnswer.value == questions[currentQuestionIndex].correct) {
            correctFeedback();
            setTimeout(nextQuestion, 500);
        }
        else {
            wrongFeedback();
            setTimeout(nextQuestion, 500);
        };
        currentQuestionIndex++;
    };
    
var viewHighScores = function(event) {
    var viewHighScoresEl = event.target;
    if (viewHighScoresEl.matches("#high-scores")) {
        window.confirm("Are you sure you want to end the quiz to view high scores? You can always view them once you finish!");
        if (window.confirm = true) {
            questionContainerEl.classList.add("hide");
            viewHighScoresEl.innerHTML = "Return to quiz";
        };
        
    };
};



//call startGame function on click
startButtonEl.addEventListener("click", startGame);

viewHighScoresEl.addEventListener("click", viewHighScores);