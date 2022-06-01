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
// if (timeLeft === 0) {
//     stopTimer();
//}

//function to start game, that will lead to first question on click
var startQuiz = function() {
    //starts 60 second timer on startQuiz button click
        countdown = setInterval(function() {
        //decrement timer...
        timeLeft--;
        countdownEl.textContent = "0:" + timeLeft;
        //...once per second
            //stop timer at 0 s
            if (timeLeft <= 0) {
            stopTimer();
         };
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
    //arbitrary value pushed to correctAnswers array to add to correctAnswers.length
    correctAnswers.push("1");
    console.log(correctAnswers);
    //turn button color green
    selectedAnswer.style.backgroundColor="green";
    //clear out past feedback
    feedbackEl.textContent = "";
    //insert correct feedback
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
    //turn button color red
    selectedAnswer.style.backgroundColor="red";
    //clear out past feedback
    feedbackEl.textContent = "";
    //insert wrong feedback
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
        //or if we're out of questions to flip through...
        else if (questions.length < currentQuestionIndex + 2) {
            wrongFeedback();
            stopTimer();
            //...end the Quiz (after a delay long enough to display the feedback)
            setTimeout(endQuiz, 500);
        }
        //if correct and not out of questions, display corret feeback and go to next question
        else if (selectedAnswer.value == questions[currentQuestionIndex].correct) {
            correctFeedback();
            setTimeout(nextQuestion, 500);
        }
        //if wrong and more questions remain, display wrong feedback and go to next question
        else {
            wrongFeedback();
            setTimeout(nextQuestion, 500);
        };
        //increase question index after the question at the prior index has appeared, been clicked and receveived feedback
        currentQuestionIndex++;
    };

    //function to stop quiz and go to highscores from any time in the quiz
var viewHighScores = function(event) {
    var viewHighScoresEl = event.target;
    //if the "view high scores" heading is clicked...
    if (viewHighScoresEl.matches("#high-scores")) {
        //use a pop up to confirm they want to exit the quiz
        var userChoice = window.confirm("Are you sure you want to end the quiz to view high scores? You can always view them once you finish!");
        //if okay is selected, go to highscores page
        if (userChoice) {
            //stop timer
            clearInterval(countdown);
            //remove current page content
            timeDisplayEl.classList.add("hide");
            questionContainerEl.classList.add("hide");
            quizIntroEl.classList.add("hide");
            quizOutroEl.classList.add("hide");
            viewHighScoresEl.innerHTML = "";
            feedbackEl.textContent = "";
            //display highscores page content
            highScoresPageEl.classList.remove("hide");
            displayScoreSets();
        }
        else {
            return false;
        };
    };
};

//if restart button is clicked, reload page to return to the quiz intro at timeLeft = 60
var restartQuiz = function() {
    location.reload();
};

//adds new score item to display
var displayScoreSets = function() {
    //IMPORTANT: if there is nothing yet in local storage, a blank list of 5 items will appear in place of the highscores list to indicate to quiz-taker that 5 highscores can be saved 
    if (localStorage.length > 0) {
        //grab stored array of scores and intials from localStorage
        var scoreSets = JSON.parse(localStorage.getItem("score-sets"))
        console.log(scoreSets);
        //sort array from highest to lowest
        scoreSets.sort((a, b) => {
            return b.savedScore - a.savedScore;
        });
        //reset html content
        var html ="";
        //loop through scoreSets to display array but...
        for (i=0; i < scoreSets.length; i++) {
            //...stop at index 4 to keep only the top 5 showing
            if (i>=5) {
                break;
            }
            //display scores in a list with each item reading "intials -- score"
            html += "<li class='score-list-item'>" + scoreSets[i].savedInitials + " -- " + scoreSets[i].savedScore + "</li>"
        }
        console.log(scoreSets);
        //set the highscores list element to this html
        highScoresListEl.innerHTML = html;
    };
};

//add an event listener to the submit button
document.getElementById('save-initials').addEventListener('click', function(event) {
    //prevent page from reloading on submit
    event.preventDefault();
    // initials variable will be equal to the value inputted OR anonymous if no value is inputted
    initials = document.querySelector("input[name='initials']").value || "anonymous";
    //score comes from the length of the correctAnswers array that we pushed an arbitrary value into for each correct answer so that length = # of correct ansers
    score = correctAnswers.length;
    //load scoreSets (an array) from localStorage and turn strings back to objects
    var scoreSets = JSON.parse(localStorage.getItem("score-sets")) || [];
    //each object inside of scoreSets array is called savedScoreSet, each containing one saved score corresponding initial
    var savedScoreSet = {
            savedScore: score,
            savedInitials: initials
            };
            //add the individal savedScoreSet item to the array of scoreSets
            scoreSets.push(savedScoreSet);
            //add updated array to local storage
            localStorage.setItem("score-sets", JSON.stringify(scoreSets));
    //remove current page content from display     
    quizOutroEl.classList.add("hide");
    highScoresPageEl.classList.remove("hide");
    //display page with high score list
    displayScoreSets();
})

//listens for click on view high scores heading to call the high scores page to display if clicked
viewHighScoresEl.addEventListener("click", viewHighScores);

//listens for click on restart button to call restartQuiz function
restartButtonEl.addEventListener("click", restartQuiz);

//listens for click on start button to call startQuiz function
startButtonEl.addEventListener("click", startQuiz);







