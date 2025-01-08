function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}


const questions = [
    { question: "Do you often find it difficult to stay focused on a task?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you frequently lose things like keys, wallets, or paperwork?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often feel restless or fidgety?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you find it hard to follow instructions?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often interrupt others during conversations?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you frequently forget appointments or deadlines?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you struggle to complete tasks you start?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you avoid tasks that require prolonged mental effort?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often make impulsive decisions?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you find it difficult to stay organized?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you frequently shift from one activity to another without completing them?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you experience frequent mood swings?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often forget to complete chores or responsibilities?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you feel easily distracted by external stimuli?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often fail to pay attention to details?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often feel overwhelmed by tasks that seem simple to others?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you have trouble relaxing or unwinding?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you avoid situations that require a lot of focus?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you find it difficult to stay seated in one place for extended periods?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you frequently talk excessively?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often act before thinking about the consequences?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you experience difficulty in waiting your turn in group situations?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you feel your attention often drifts during conversations?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you find it hard to stay on topic during discussions?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you often engage in risky behaviors without considering the consequences?", options: ["Yes", "No"], correctAnswer: "Yes" },
    { question: "Do you frequently lose focus during tasks or conversations?", options: ["Yes", "No"], correctAnswer: "Yes" }
];

let currentQuestionIndex = 0;
let score = 0;
let timerValue = 60;
let timerInterval;

async function startQuiz() {
    await showQuestion();
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
}

async function showQuestion() {
    const questionObj = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const timerElement = document.getElementById('timer');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    optionsElement.innerHTML = '';
    timerElement.innerText = `Time remaining: ${timerValue}s`;

    questionElement.innerText = questionObj.question;
    questionObj.options.forEach(option => {
        const optionElement = document.createElement('li');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => handleAnswer(optionElement, option));
        optionsElement.appendChild(optionElement);
    });

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;

    await startTimer();
}

function startTimer() {
    return new Promise((resolve) => {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timerValue > 0) {
                timerValue--;
                document.getElementById('timer').innerText = `Time remaining: ${timerValue}s`;
            } else {
                clearInterval(timerInterval);
                resolve();
            }
        }, 1000);
    });
}

async function handleAnswer(optionElement, selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        score += 4; 
    }
    
    optionElement.style.backgroundColor = selectedAnswer === correctAnswer ? "#28a745" : "#dc3545";
    await new Promise(resolve => setTimeout(resolve, 500)); 
    nextQuestion();
}

async function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        timerValue = 60;
        await showQuestion();
    } else {
        showResults();
    }
}

async function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        timerValue = 60;
        await showQuestion();
    }
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    const percentage = (score / 100) * 100;
    document.getElementById('score').innerText = score;

    let resultMessage = '';
    if (percentage === 100) {
        resultMessage = "You have ADHD.";
    } else if (percentage >= 70 && percentage <= 90) {
        resultMessage = "Likely ADHD.";
    } else if (percentage >= 50 && percentage <= 69) {
        resultMessage = "Your results indicate some signs of ADHD, but further evaluation is recommended.";
    } else {
        resultMessage = "Your results suggest that ADHD is unlikely, but it’s important to seek professional advice if you have concerns.";
    }
    document.getElementById('result-message').innerText = resultMessage;
}

startQuiz();
