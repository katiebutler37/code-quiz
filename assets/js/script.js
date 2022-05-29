//get elements from HTMl index to target
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");
var currentQuestionIndex;
    currentQuestionIndex++;
var randomizedQuestionSet;
//var randomizedAnswers;
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
        answers: ["1", "2", "3", "4"],
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
    currentQuestionIndex++;
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

//the questionObj parameter is the result of (randomizedQuestionSet[questionIndex]) ... the single object question (question/answers pair) that is provided to the showQuestion function from the nextQuestion function
var nextQuestion = function() {
    var questionObj = randomizedQuestionSet[currentQuestionIndex];
    questionContainerEl = "";
    questionEl.textContent = questionObj.question;
    for (var i=0; i < questionObj.answers.length; i++) {
        answerButtonEl = document.createElement("button");
        answerButtonEl.className = "answer-btn btn";
        answerButtonEl.setAttribute("value", questionObj.answers[i]);
        answerButtonEl.textContent = questionObj.answers[i]; 
        answersEl.appendChild(answerButtonEl);
    }
};

//var nextQuestion = function() {
    //showQuestion(randomizedQuestionSet[currentQuestionIndex]);
    /*for (var i=0; i<questions[currentQuestionIndex].answers.length; i++) {
        randomizedAnswers = questions[currentQuestionIndex].answers[Math.floor(Math.random() * questions[currentQuestionIndex].answers.length)];
        console.log(randomizedAnswers);
    }*/
//};

/*var selectAnswer = function(event) {
    var selectedAnswer = event.target.value;
    if (selectedAnswer.matches(questions[currentQuestionIndex].answers.correct)) {
        console.log("correct");
    }
    nextQuestion();
};*/

//answerButtonEl.addEventListener("click", nextQuestion); 

//call startGame function on click
startButtonEl.addEventListener("click", startGame);
