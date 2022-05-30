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

var randomizedQuestionSet = questions.sort(() => Math.random() - .5);
var currentQuestionIndex = 0;
var questionObj = randomizedQuestionSet[currentQuestionIndex];


var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var selectedAnswer;

var clearAnswers = function() {
    answersEl.innerHTML = "";
};

//defined function to start game, that will lead to first question on click
var startGame = function() {
    startCountdown();
    currentQuestionIndex = 0;
    quizIntroEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

//the questionObj parameter is the result of (randomizedQuestionSet[questionIndex]) ... the single object question (question/answers pair) that is provided to the nextQuestion function
var nextQuestion = function() {
    console.log(currentQuestionIndex);
    console.log(randomizedQuestionSet.length);
    questionEl.textContent = questionObj.question;
    console.log(questionObj);
    clearAnswers();
    for (var i=0; i < questionObj.answers.length; i++) {
        answerButtonEl = document.createElement("button");
        answerButtonEl.className = "answer-btn btn";
        answerButtonEl.setAttribute("value", questionObj.answers[i]);
        answerButtonEl.textContent = questionObj.answers[i]; 
        answerButtonEl.addEventListener("click", selectAnswer);
        answersEl.appendChild(answerButtonEl);
        console.log(answerButtonEl);
    }
        currentQuestionIndex++;
    
};

var endQuiz = function() {
    feedbackEl.textContent = "";
    questionContainerEl.classList.add("hide");
}

var correctFeedback = function() {
    console.log("correct"); 
    selectedAnswer.style.backgroundColor="green";
    feedbackEl.textContent = "";
    feedbackEl = document.createElement("h3");
    feedbackEl.className = "feedback correct";
    feedbackEl.textContent = "You got it!"; 
    cardContentEl.appendChild(feedbackEl);
}

var wrongFeedback = function() {
    console.log("wrong"); 
    selectedAnswer.style.backgroundColor="red";
    feedbackEl.textContent = "";
    feedbackEl = document.createElement("h3");
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "Whoops! Not quite!"; 
    cardContentEl.appendChild(feedbackEl);
}

var selectAnswer = function(event) {
    selectedAnswer = event.target;
    console.log (currentQuestionIndex);
        if (randomizedQuestionSet.length < currentQuestionIndex +1 && selectedAnswer.value == randomizedQuestionSet[currentQuestionIndex -1].correct) {
            correctFeedback();
            setTimeout(endQuiz, 500);
        }
        else if (randomizedQuestionSet.length < currentQuestionIndex + 1) {
            wrongFeedback();
            console.log("wrong"); 
            selectedAnswer.style.backgroundColor="red";
            feedbackEl.textContent = "";
            feedbackEl = document.createElement("h3");
            feedbackEl.className = "feedback";
            feedbackEl.textContent = "Whoops! Not quite!"; 
            cardContentEl.appendChild(feedbackEl);
            setTimeout(endQuiz, 500);
        }
        else if (selectedAnswer.value == questionObj.correct) {
            correctFeedback();
            console.log("correct"); 
            selectedAnswer.style.backgroundColor="green";
            feedbackEl.textContent = "";
            feedbackEl = document.createElement("h3");
            feedbackEl.className = "feedback correct";
            feedbackEl.textContent = "You got it!"; 
            cardContentEl.appendChild(feedbackEl);
            setTimeout(nextQuestion, 500);
        }
        else {
            wrongFeedback();
            console.log("wrong"); 
            selectedAnswer.style.backgroundColor="red";
            feedbackEl.textContent = "";
            feedbackEl = document.createElement("h3");
            feedbackEl.className = "feedback";
            feedbackEl.textContent = "Whoops! Not quite!"; 
            cardContentEl.appendChild(feedbackEl);
            setTimeout(nextQuestion, 500);
        };
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

//adapted from w3schools timer code
var startCountdown = function() {}

// Set the date we're counting down to
var countDownTime = 120000;

//call startGame function on click
startButtonEl.addEventListener("click", startGame);

viewHighScoresEl.addEventListener("click", viewHighScores);