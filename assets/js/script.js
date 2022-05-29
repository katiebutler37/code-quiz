//get elements from HTMl index to target
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");
var answerButtonEl;
var currentQuestionIndex;
var randomizedQuestionSet;
var answerButtonEl;

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
    }
];

var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");

//defined function to start game, that will lead to first question on click
var startGame = function() {
    quizIntroEl.classList.add("hide");
    randomizedQuestionSet = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

//the questionObj parameter is the result of (randomizedQuestionSet[questionIndex]) ... the single object question (question/answers pair) that is provided to the nextQuestion function
var nextQuestion = function() {
    console.log(currentQuestionIndex);
    var questionObj = randomizedQuestionSet[currentQuestionIndex];
    questionContainerEl = "";
    questionEl.textContent = questionObj.question;
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

var selectAnswer = function(event) {
    var selectedAnswer = event.target.value;
    //eliminate repetition later if possible
    var questionObj = randomizedQuestionSet[currentQuestionIndex];
   // var questionObj = randomizedQuestionSet[currentQuestionIndex];
    if (selectedAnswer === questionObj.correct) {
        console.log("correct");  
        nextQuestion();
    }
    else {
        nextQuestion();
    }
    
}

//call startGame function on click
startButtonEl.addEventListener("click", startGame);