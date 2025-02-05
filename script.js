document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById('start-game');
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const scoreEl = document.getElementById('score');
    const rankingEl = document.getElementById('ranking');

    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            subject: "Математика",
            question: "Чему равен корень из 81?",
            options: ["9", "8", "7", "10"],
            correct: 0,
        },
        {
            subject: "Обществознание",
            question: "Как называется основной закон государства?",
            options: ["Конституция", "Устав", "Кодекс", "Закон"],
            correct: 0,
        },
        {
            subject: "Русский язык",
            question: "Какое слово является прилагательным?",
            options: ["Зелёный", "Бегать", "Красиво", "Далеко"],
            correct: 0,
        },
        {
            subject: "История",
            question: "В каком году началась Великая Отечественная война?",
            options: ["1941", "1939", "1945", "1942"],
            correct: 0,
        }
    ];

    function updateRanking() {
        if (score < 0) {
            rankingEl.textContent = "Новичок";
        } else if (score < 5) {
            rankingEl.textContent = "Любитель";
        } else if (score < 10) {
            rankingEl.textContent = "Знаток";
        } else {
            rankingEl.textContent = "Эксперт";
        }
    }

    function showQuestion(index) {
        if (index >= questions.length) {
            endGame();
            return;
        }

        const question = questions[index];
        questionEl.textContent = `${question.subject}: ${question.question}`;
        answersEl.innerHTML = "";

        question.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(i, question.correct));
            answersEl.appendChild(button);
        });
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            score++;
        } else {
            score--;
        }
        scoreEl.textContent = score;
        updateRanking();

        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }

    function endGame() {
        questionEl.textContent = "Игра окончена! Набранные очки: " + score;
        answersEl.innerHTML = "";
        startGameBtn.disabled = false;
    }

startGameBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    updateRanking();
    showQuestion(currentQuestionIndex);
    startGameBtn.disabled = true;
});
});