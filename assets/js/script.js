//get elements from HTMl index to target
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");
var questionIndex;

//make an array to hold each question and answer together
var questions = [
    {
        question: "How are you?",
        //make an inner array to hold the 4 possible answers
        answers: [
            { answer: "1", correct: true },
            { answer: "2", correct: false },
            { answer: "3", correct: false },
            { answer: "4", correct: false }
        ]
    },
    {
        question: "what's up?",
        answers: [
            { answer: "5"},
            { answer: "6"},
            { answer: "7"},
            { answer: "8"}
        ]
    }
];

for (var i = 0; i < questions.length; i++) {
     var randomizedQuestions = questions.sort(() => Math.random() - .5);
}
console.log(questions[0].question);

var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");

//defined function to start game, that will lead to first question on click
var startGame = function() {
    quizIntroEl.classList.add("hide");
    //questionIndex = 0;
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

//the questionObj parameter is the result of (randomizedQuestions[questionIndex]) ... the single object question (question/answers pair) that is provided to the showQuestion function from the nextQuestion function
var showQuestion = function(questionObj) {
    questionEl.innerHTML = "<h2 id='question'>" + questionObj.question + "</h2>";
};

var nextQuestion = function() {
    showQuestion(randomizedQuestions[0]);
}

var selectAnswer = function() {

}

//call startGame function on click
startButtonEl.addEventListener("click", startGame);