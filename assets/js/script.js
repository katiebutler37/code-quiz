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

var clearAnswers = function() {
    answersEl.innerHTML = "";
};

//defined function to start game, that will lead to first question on click
var startGame = function() {
    //startCountdown();
    currentQuestionIndex = 0;
    quizIntroEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

var nextQuestion = function() {
    console.log("next question")
    clearAnswers();
    for (var currentQuestionIndex = 0; currentQuestionIndex < questions.length; currentQuestionIndex++) {
        console.log("question loop");
        questionContentEl = document.createElement("h2");
        questionContentEl.className = "question-content";
        questionContentEl.setAttribute("value", questions[currentQuestionIndex].question);
        questionContentEl.textContent = questions[currentQuestionIndex].question;
        questionEl.appendChild(questionContentEl);
        for (var i=0; i < questions[currentQuestionIndex].answers.length; i++) {
            console.log("answers loop")
            answerButtonEl = document.createElement("button");
            answerButtonEl.className = "answer-btn btn";
            answerButtonEl.setAttribute("value", questions[currentQuestionIndex].answers[i]);
            answerButtonEl.textContent = questions[currentQuestionIndex].answers[i]; 
            answerButtonEl.addEventListener("click", selectAnswer);
            answersEl.appendChild(answerButtonEl);
            console.log(answerButtonEl);
        }
    }
    // questionEl.textContent = questionObj.question;
   
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
    // console.log (currentQuestionIndex);
        if (questions.length < questions[currentQuestionIndex+1] && selectedAnswer.value == questions[currentQuestionIndex-1].correct) {
            correctFeedback();
            setTimeout(endQuiz, 500);
        }
        else if (questions.length < questions[currentQuestionIndex+1]) {
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
        else if (selectedAnswer.value == questions[currentQuestionIndex].correct) {
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

//var startCountdown = function() {}

//call startGame function on click
startButtonEl.addEventListener("click", startGame);

viewHighScoresEl.addEventListener("click", viewHighScores);