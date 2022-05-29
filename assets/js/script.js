//get elements from HTMl index to target
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");
var currentQuestionIndex;
    currentQuestionIndex++;
var randomizedQuestionSet;
//var randomizedAnswers;
var answerButtonEl = document.querySelector(".answer-btn");

//make an array to hold each question and answer together
var questions = [
    {
        question: "How are you?",
        //make an inner array to hold the 4 possible answers
        answers: {
            answer1: "1",
            answer2: "2", 
            answer3: "3",
            answer4: "4",
            correct: "1"
        }
    },
    {
        question: "what's up?",
        answers: {
            answer1: "1",
            answer2: "2", 
            answer3: "3",
            answer4: "4",
            correct: "1"
        }
    }
];

var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");

//defined function to start game, that will lead to first question on click
var startGame = function() {
    quizIntroEl.classList.add("hide");
    randomizedQuestionSet = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    console.log(randomizedQuestionSet);
    currentQuestionIndex++;
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

//the questionObj parameter is the result of (randomizedQuestionSet[questionIndex]) ... the single object question (question/answers pair) that is provided to the showQuestion function from the nextQuestion function
var showQuestion = function(questionObj) {
    questionEl.innerHTML = "<h2 id='question'>" + questionObj.question + "</h2>";
    answersEl.innerHTML = "<button class='answer-btn btn'>" + questionObj.answers.answer1 + "</button> <button class='answer-btn btn'>" + questionObj.answers.answer2 + "</button> <button class='answer-btn btn'>" + questionObj.answers.answer3 + "</button> <button class='answer-btn btn'>" + questionObj.answers.answer4 + "</button>";
};

var nextQuestion = function() {
    showQuestion(randomizedQuestionSet[currentQuestionIndex]);
    /*for (var i=0; i<questions[currentQuestionIndex].answers.length; i++) {
        randomizedAnswers = questions[currentQuestionIndex].answers[Math.floor(Math.random() * questions[currentQuestionIndex].answers.length)];
        console.log(randomizedAnswers);
    }*/
};

var selectAnswer = function() {
    if 
nextQuestion();
}

//call startGame function on click
startButtonEl.addEventListener("click", startGame);

answerButtonEl.addEventListener("click", selectAnswer)
