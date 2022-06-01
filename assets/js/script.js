//get elements from HTMl index to target

//selected elements for starting quiz
var startButtonEl = document.querySelector("#start-btn");
var quizIntroEl = document.querySelector(".quiz-intro");

//selected elements for general quiz layout
var questionContainerEl = document.querySelector("#question-container");
var cardContentEl = document.querySelector(".card-content");

//selected elements for ending quiz
var quizOutroEl = document.querySelector(".quiz-outro");
var scoreEl = document.querySelector("#score");
var submitIntialsFormEl = document.querySelector(".form");

//selected elements for high score
var viewHighScoresEl = document.querySelector("#high-scores");
var highScoresListEl = document.querySelector(".high-score-list");
var highScoresPageEl = document.querySelector("#high-score-page");
var highScoreEl = document.querySelector(".score-list-item");
var score = 0;
var initials;
var restartButtonEl = document.querySelector(".restart-btn");

//make an array to hold each question and answer together
var questions = [
    {
        question: "Which of the following is a Boolean value?",
        //make an inner array to hold the 4 possible answers
        answers: ["null", "12", "yes", "true"],
        correct: "true"
    },
    {
        question: "What is used to enclose an array?",
        //make an inner array to hold the 4 possible answers
        answers: ["[ ]", "{ }", "( )", "` `"],
        correct: "[ ]"
    },
    {
        question: "In which case would you use dot notation?",
        //make an inner array to hold the 4 possible answers
        answers: ["To find the index of an array", "To call an object property", "To declare a function", "To make a conditional statement"],
        correct: "To call an object property"
    },
    {
        question: "Which of the following examples does not grab an HTML element by its id tag?",
        //make an inner array to hold the 4 possible answers
        answers: ["document.getElementbyId('pizza')", "document.querySelector('#pizza')", "document.querySelector('.pizza')", "document.querySelector('[id='pizza']')"],
        correct: "document.querySelector('.pizza')"
    },
    {
        question: "Which method can you use to return a string?",
        //make an inner array to hold the 4 possible answers
        answers: ["document.element.string", "JSON.stringify", "JSON.parse", "JSON.string"],
        correct: "JSON.stringify"
    },
    {
        question: "What function is used to start a timer?",
        //make an inner array to hold the 4 possible answers
        answers: ["setInterval()", "setTimeout()", "startTimer()", "countDown()"],
        correct: "setInterval()"
    },
    {
        question: "Which of the following is not a shortcut to set up the beginning structure of an HTML page?",
        //make an inner array to hold the 4 possible answers
        answers: ["!!!", "!", "HTML:5", "HTML"],
        correct: "HTML"
    },
    {
        question: "Given that the HTML tag <ol> appears on line 4, what tag could you reasonably expect to find on line 5?",
        //make an inner array to hold the 4 possible answers
        answers: ["<p>", "<li>", "<h2>", "<br>"],
        correct: "<li>"
    }
]
//array to store an arbitrary value for each correct answer, length of array to be used to calculate final score
var correctAnswers = [];

//selected elements for main quiz progression
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var answerButtonEl;
var feedbackEl = document.querySelector(".feedback");
var selectedAnswer;
var currentQuestionIndex = 0;

//selected elements for timer
var timeDisplayEl = document.getElementById("time-display");
var countdownEl = document.querySelector("#countdown");
var countdown; 
//start timer with 60 s
var timeLeft = 60;
//stop timer at 0 s
if (timeLeft === 0) {
    stopTimer();
}

//function to start game, that will lead to first question on click
var startQuiz = function() {
    //starts 60 second timer on startQuiz button click
        countdown = setInterval(function() {
        //decrement timer...
        timeLeft--;
        countdownEl.textContent = "0:" + timeLeft;
        //...once per second
    }, 1000); 
    //calls countdown function to start timer
    setInterval(countdown);
    //start question index at 0
    currentQuestionIndex = 0;
    //change display from intro to questions
    quizIntroEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

//stops timer and goes to endQuiz sequence 
function stopTimer() {
    //remove current timer display
    countdownEl.textContent = '';
    clearInterval(countdown);
    //replace timer with Quiz over! message
    countdownEl.textContent = "Quiz over!";
    setTimeout(endQuiz, 500);
};

//removes 5 seconds off timer for every incorrect answer
function decreaseTimer() {
    timeLeft = timeLeft - 5;
};

//clears answer and question text content before next object in the questions array is loaded
var clearAnswers = function() {
    answersEl.innerHTML = "";
    questionEl.innerHTML = "";
};

//function to switch to next question's content
var nextQuestion = function() {
    //git rid of old question content
    clearAnswers();
        //create and display question in browser
        questionContentEl = document.createElement("h2");
        questionContentEl.className = "question-content";
        questionContentEl.setAttribute("value", questions[currentQuestionIndex].question);
        questionContentEl.textContent = questions[currentQuestionIndex].question;
        questionEl.appendChild(questionContentEl);
        //loop through answers array to display all answers for each question
        for (var i=0; i < questions[currentQuestionIndex].answers.length; i++) {
            //create and display answers in browser
            answerButtonEl = document.createElement("button");
            answerButtonEl.className = "answer-btn btn";
            answerButtonEl.setAttribute("value", questions[currentQuestionIndex].answers[i]);
            answerButtonEl.textContent = questions[currentQuestionIndex].answers[i]; 
            answersEl.appendChild(answerButtonEl);
            answerButtonEl.addEventListener("click", selectAnswer);
        } 
};

//function to end quiz when the end of the questions array is reached
var endQuiz = function() {
    console.log ("quiz over")
    //get rid of content still displaying on browser to make room for other content
    feedbackEl.textContent = "";
    questionContainerEl.classList.add("hide");
    //stop timer
    clearInterval(countdown);
        //will store this value score later to keep it with initials 
        score = correctAnswers.length;
    questionContainerEl.classList.add("hide");
    quizOutroEl.classList.remove("hide");
    //insert final score into existing HTML content for the quiz outro
    scoreEl.textContent = score + "/" + questions.length + ".";
};

//function to provide feedback if the selectedAnswer is correct
var correctFeedback = function() {
    console.log("correct"); 
    correctAnswers.push("1");
    console.log(correctAnswers);
    selectedAnswer.style.backgroundColor="green";
    feedbackEl.textContent = "";
    feedbackEl = document.createElement("h3");
    feedbackEl.className = "feedback correct";
    feedbackEl.textContent = "You got it!"; 
    cardContentEl.appendChild(feedbackEl);
};

//function to provide feedback if the selectedAnswer is wrong...
var wrongFeedback = function() {
    console.log("wrong"); 
    //...and take 5 s off the clock!
    decreaseTimer(countdown);
    selectedAnswer.style.backgroundColor="red";
    feedbackEl.textContent = "";
    feedbackEl = document.createElement("h3");
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "Whoops! Not quite!"; 
    cardContentEl.appendChild(feedbackEl);
};

//function to manage which button is clicked, grab it's value and compare
var selectAnswer = function(event) {
    selectedAnswer = event.target;
    console.log(currentQuestionIndex);
    console.log(selectedAnswer.value);
    console.log(questions.length);
        //if the length of the questions array (# of questions) is less than the currentQuestionIndex + 2 (because it starts at zero and increments after this function runs)...
        //AND the answers value is correct...
        if (questions.length < currentQuestionIndex + 2 && selectedAnswer.value == questions[currentQuestionIndex].correct) {
            correctFeedback();
            stopTimer();
            //...end the Quiz (after a delay long enough to display the feedback)
            setTimeout(endQuiz, 500);
        }
        //or if were out of questions
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
            clearInterval(countdown);
            timeDisplayEl.classList.add("hide");
            questionContainerEl.classList.add("hide");
            quizIntroEl.classList.add("hide");
            quizOutroEl.classList.add("hide");
            viewHighScoresEl.innerHTML = "";
            highScoresPageEl.classList.remove("hide");
            feedbackEl.textContent = "";
            displayScoreSet();
        };
        
    };
};

var restartQuiz = function() {
    location.reload();
};

//adds new score item to display
var displayScoreSet = function() {
    var scoreSet = JSON.parse(localStorage.getItem("score-set"))
    console.log(scoreSet);
    scoreSet.sort((a, b) => {
        return b.savedScore - a.savedScore;
    });
    var html ="";
    for (i=0; i < scoreSet.length; i++) {
        if (i>=5) {
            break;
        }
        html += "<li class='score-list-item'>" + scoreSet[i].savedInitials + " -- " + scoreSet[i].savedScore + "</li>"
    }
    console.log(scoreSet);
    highScoresListEl.innerHTML = html;
};

document.getElementById('save-initials').addEventListener('click', function(event) {
    event.preventDefault();
    initials = document.querySelector("input[name='initials']").value || "anonymous";
    score = correctAnswers.length;
    var scoreSet = JSON.parse(localStorage.getItem("score-set")) || [];
    var savedScoreSet = {
            savedScore: score,
            savedInitials: initials
            };
            scoreSet.push(savedScoreSet);
            localStorage.setItem("score-set", JSON.stringify(scoreSet));
            
    quizOutroEl.classList.add("hide");
    highScoresPageEl.classList.remove("hide");
    displayScoreSet();
})

viewHighScoresEl.addEventListener("click", viewHighScores);

restartButtonEl.addEventListener("click", restartQuiz);

// //call startQuiz function on click
startButtonEl.addEventListener("click", startQuiz);







