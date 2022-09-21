// code by webdevtrick (https://webdevtrick.com)
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    gameOverHTML += "<p><a href='index.html'>Go Back to Lecture</a>"
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("What connects people together?", ["Oppression", "Human events","Political bands", "Human achievement"], "Political bands"),
    new Question("What are the truths we hold as self-evident?", ["Man is evolutionarily endowed", "Nature's God created us like the animals", "We pursue life, liberty and pleasures", "God endowed all men equally"], "God endowed all men equally"),
    new Question("How do the government get their just powers?", ["Usurpation", "Tyranny","The consent of the governed", "Persuasion"], "The consent of the governed"),
    new Question("What are the two things a government should provide?", ["Happiness and Liberty", "Safety and Happiness", "Life and Liberty", "Safety and Liberty"], "Safety and Happiness"),
    new Question("If government corruption persists, what is your duty?", ["Petition it", "Vote them out", "Alter or Abolish it", "Plead with it"], "Alter or Abolish it")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();