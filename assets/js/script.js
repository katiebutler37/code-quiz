//get elements from HTMl index to target
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");
var randomizedQuestions;
var questionIndex;
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers")

//make an array to hold each question and answer together
var questions = [
    {
        question: "How are you?",
        //make an inner array to hold the 4 possible answers
        answers: [
            { answer: "", correct: true },
            { answer: "", correct: false },
            { answer: "", correct: false },
            { answer: "", correct: false }
        ]
    }
];

//defined function to start game, that will lead to first question on click
var startGame = function() {
    quizIntroEl.classList.add("hide");
    randomizedQuestions = questions.sort(() => Math.random() - .5);
    questionIndex = 0;
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

var showQuestion = function(question) {
    question = JSON.stringify(question);
    questionEl.innerHTML = "<h2 id='question'>" + questions.question + "</h2>";
};

var nextQuestion = function() {
    showQuestion(randomizedQuestions[questionIndex]);
}

var selectAnswer = function() {

}

//call startGame function on click
startButtonEl.addEventListener("click", startGame);