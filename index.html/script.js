// 1) Our quiz data: an array of question objects
const questions = [
  {
    question: "What does DOM stand for?",
    choices: [
      "Document Object Model",
      "Data Object Management",
      "Digital Order Machine",
      "Desktop Operating Mode"
    ],
    correctIndex: 0
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    choices: ["<!-- -->", "//", "##", "**"],
    correctIndex: 1
  },
  {
    question: "Which method selects ONE element by its id?",
    choices: [
      "querySelectorAll()",
      "getElementsByClassName()",
      "getElementById()",
      "getElementsByTagName()"
    ],
    correctIndex: 2
  }
];

// 2) Grab the elements from the HTML (DOM)
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const answerButtons = document.querySelectorAll(".answer-btn");

// 3) Keep track of which question we are on
let currentQuestionIndex = 0;

// 4) Show a question on the screen
function displayQuestion() {
  // Clear feedback
  feedbackEl.textContent = "";

  // Get the current question object
  const currentQuestion = questions[currentQuestionIndex];

  // Put the question text into the page
  questionEl.textContent = currentQuestion.question;

  // Put each choice into the matching button
  answerButtons.forEach((btn) => {
    const choiceIndex = Number(btn.dataset.index);
    btn.textContent = currentQuestion.choices[choiceIndex];

    // Re-enable buttons (so they can be clicked for the new question)
    btn.disabled = false;
  });

  // Disable Next button until user answers (nice UX)
  nextBtn.disabled = true;
}

// 5) Handle when an answer button is clicked
function handleAnswerClick(event) {
  const clickedButton = event.target;

  // Which answer did they pick?
  const selectedIndex = Number(clickedButton.dataset.index);

  // Correct answer for this question
  const correctIndex = questions[currentQuestionIndex].correctIndex;

  // Check if correct
  if (selectedIndex === correctIndex) {
    feedbackEl.textContent = "✅ Correct!";
  } else {
    const correctText = questions[currentQuestionIndex].choices[correctIndex];
    feedbackEl.textContent = `❌ Incorrect. Correct answer: ${correctText}`;
  }

  // Disable all answer buttons to prevent extra clicks
  answerButtons.forEach((btn) => (btn.disabled = true));

  // Now allow Next
  nextBtn.disabled = false;
}

// 6) Move to the next question
function goToNextQuestion() {
  currentQuestionIndex++;

  // If we ran out of questions, show a finished message
  if (currentQuestionIndex >= questions.length) {
    questionEl.textContent = "🎉 Quiz complete!";
    feedbackEl.textContent = "Great job — you finished all questions.";
    answerButtons.forEach((btn) => (btn.disabled = true));
    nextBtn.disabled = true;
    return;
  }

  // Otherwise show the next question
  displayQuestion();
}

// 7) Add event listeners (this connects clicks to our functions)
answerButtons.forEach((btn) => {
  btn.addEventListener("click", handleAnswerClick);
});

nextBtn.addEventListener("click", goToNextQuestion);

// 8) Start the quiz by showing the first question
displayQuestion();
