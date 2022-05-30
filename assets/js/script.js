//get elements from HTMl index to target
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");
var answerButtonEl;
var currentQuestionIndex;
var randomizedQuestionSet;
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

var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");

var clearAnswers = function() {
    answersEl.innerHTML = "";
};

//defined function to start game, that will lead to first question on click
var startGame = function() {
    quizIntroEl.classList.add("hide");
    randomizedQuestionSet = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

// var finalQuestion = function(event) {
//     var selectedAnswer = event.target;
//     var questionObj = randomizedQuestionSet[currentQuestionIndex];
//         if (selectedAnswer.value == questionObj.correct) {
//         console.log("correct"); 
//         selectedAnswer.style.backgroundColor="green";
//         feedbackEl.textContent = "";
//         feedbackEl = document.createElement("h3");
//         feedbackEl.className = "feedback correct";
//         feedbackEl.textContent = "You got it!"; 
//         cardContentEl.appendChild(feedbackEl);
//         setTimeout(endQuiz, 500);
//     }
//     else {
//         console.log("wrong"); 
//         selectedAnswer.style.backgroundColor="red";
//         feedbackEl.textContent = "";
//         feedbackEl = document.createElement("h3");
//         feedbackEl.className = "feedback";
//         feedbackEl.textContent = "Whoops! Not quite!"; 
//         cardContentEl.appendChild(feedbackEl);
//         setTimeout(endQuiz, 500);
//     };
// };

//the questionObj parameter is the result of (randomizedQuestionSet[questionIndex]) ... the single object question (question/answers pair) that is provided to the nextQuestion function
var nextQuestion = function() {
    console.log(currentQuestionIndex);
    console.log(randomizedQuestionSet.length);
    var questionObj = randomizedQuestionSet[currentQuestionIndex];
    questionEl.textContent = questionObj.question;
    console.log(questionObj);
    clearAnswers();
    for (var i=0; i < questionObj.answers.length; i++) {
        //var randomizedAnswers = questionsObj.answers[Math.floor(Math.random() * questionObj.answers.length)];
        answerButtonEl = document.createElement("button");
        answerButtonEl.className = "answer-btn btn";
        answerButtonEl.setAttribute("value", questionObj.answers[i]);
        answerButtonEl.textContent = questionObj.answers[i]; 
        answerButtonEl.addEventListener("click", selectAnswer);
        answersEl.appendChild(answerButtonEl);
    }
        currentQuestionIndex++;
    
};

var endQuiz = function() {
    feedbackEl.textContent = "";
    questionContainerEl.classList.add("hide");
}

var selectAnswer = function(event) {
    var selectedAnswer = event.target;
    //eliminate repetition later if possible
    var questionObj = randomizedQuestionSet[currentQuestionIndex];
    console.log (currentQuestionIndex);
        if (randomizedQuestionSet.length < currentQuestionIndex +1 && selectedAnswer.value == randomizedQuestionSet[currentQuestionIndex -1].correct) {
            console.log("correct"); 
            selectedAnswer.style.backgroundColor="green";
            feedbackEl.textContent = "";
            feedbackEl = document.createElement("h3");
            feedbackEl.className = "feedback correct";
            feedbackEl.textContent = "You got it!"; 
            cardContentEl.appendChild(feedbackEl);
            setTimeout(endQuiz, 500);
        }
        else if (randomizedQuestionSet.length < currentQuestionIndex + 1) {
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

//adapted from stackoverflow timer code
var startCountdown = function(duration, display) {
    var countdown = duration, minutes, seconds;
    setInterval(function(){
        minutes = parseInt(countdown / 60, 10);
        seconds = parseInt(countdown % 60, 10);

        seconds = seconds < 10 ? "0" + seconds: seconds;
        display.textContent = seconds;
        if (--countdown < 0) {
            countdown = duration;
        }
    },1000);

};

//call startGame function on click
startButtonEl.addEventListener("click", startGame);

viewHighScoresEl.addEventListener("click", viewHighScores);