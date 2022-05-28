var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");
var questionContainerEl = document.querySelector("#question-container");

startButtonEl.addEventListener("click", startGame);

function startGame () {
    quizIntroEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
}

function nextQuestion() {

}

function selectAnswer() {

}