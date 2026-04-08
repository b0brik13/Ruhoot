document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById('start-game');
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const scoreEl = document.getElementById('score');
    const rankingEl = document.getElementById('ranking');
    const timerEl = document.getElementById('timer');
    const questionCounterEl = document.getElementById('question-counter');
    const mainMenuBtn = document.getElementById('main-menu');

    let currentQuestionIndex = 0;
    let currentQuestions = [];
    let score = 0;
    let timerId = null;
    let timeLeft = 0; // seconds for whole quiz
    const totalTime = 300; // total seconds for the quiz

    rankingEl.textContent = "Новичок";

    const questions = [
        {
            question: "Сколько будет 8 × 7?",
            options: ["56", "54", "64", "48"],
            correct: 0,
        },
        {
            question: "Как называется главная часть слова?",
            options: ["Корень", "Приставка", "Суффикс", "Окончание"],
            correct: 0,
        },
        {
            question: "Какая планета является нашей?",
            options: ["Земля", "Марс", "Венера", "Юпитер"],
            correct: 0,
        },
        {
            question: "Сколько дней в году?",
            options: ["365", "366", "364", "367"],
            correct: 0,
        },
        {
            question: "Что обозначает имя существительное?",
            options: ["Предмет", "Действие", "Число", "Признак"],
            correct: 0,
        },
        {
            question: "Сколько сантиметров в 1 метре?",
            options: ["100", "10", "1000", "50"],
            correct: 0,
        },
        {
            question: "Какая часть речи отвечает на вопрос «что делать?»",
            options: ["Глагол", "Существительное", "Прилагательное", "Местоимение"],
            correct: 0,
        },
        {
            question: "Какая планета самая большая?",
            options: ["Юпитер", "Марс", "Земля", "Венера"],
            correct: 0,
        },
        {
            question: "Сколько будет 100 : 4?",
            options: ["25", "20", "30", "35"],
            correct: 0,
        },
        {
            question: "Что такое подлежащее?",
            options: ["Главный член предложения", "Действие ", "Второстепенный член предложения", "Признак"],
            correct: 0,
        },
        {
            question: "Сколько часов в сутках?",
            options: ["24", "12", "34", "4"],
            correct: 0,
        },
        {
            question: "Как называется спутник Земли?",
            options: ["Луна", "Марс", "Венера", "Юпитер"],
            correct: 0,
        },
        {
            question: "Сколько будет 9 × 6?",
            options: ["54", "56", "64", "48"],
            correct: 0,
        },
        {
            question: "Что делает прилагательное?",
            options: ["Описывает признак предмета", "Обозначает действие", "Обозначает предмет", "Обозначает место"],
            correct: 0,
        },
        {
            question: "Какая часть слова стоит перед корнем?",
            options: ["Приставка", "Суффикс", "Корень", "Окончание"],
            correct: 0,
        },
        {
            question: "Сколько минут в одном часе?",
            options: ["60", "100", "25", "50"],
            correct: 0,
        },
        {
            question: "Что изучает окружающий мир?",
            options: ["Природу, людей и мир вокруг", "Животных", "Людей", "Космос"],
            correct: 0,
        },
        {
            question: "Сколько будет 45 + 35?",
            options: ["80", "85", "75", "70"],
            correct: 0,
        },
        {
            question: "Какая звезда ближе всего к Земле?",
            options: ["Солнце", "Полярная", "Сириус", "Луна"],
            correct: 0,
        },
        {
            question: "Что такое глагол?",
            options: ["Действие", "Предмет", "Место", "Признак"],
            correct: 0,
        },
        {
            question: "Сколько будет 72 : 8?",
            options: ["8", "7", "9", "6"],
            correct: 2,
        },
        {
            question: "Что такое корень слова?",
            options: ["Конец слова", "Главная часть слова", "Начало слова", "Середина слова"],
            correct: 1,
        },
        {
            question: "Какая планета называется «красной»?",
            options: ["Венера", "Марс", "Юпитер", "Нептун"],
            correct: 1,
        },
        {
            question: "Сколько будет 15 × 2?",
            options: ["25", "20", "30", "35"],
            correct: 2,
        },
        {
            question: "Что такое предложение?",
            options: ["Набор букв", "Набор слов", "Слова, связанные по смыслу", "Один звук"],
            correct: 2,
        },
        {
            question: "Сколько килограммов в 1 тонне?",
            options: ["100", "1000", "10", "500"],
            correct: 1,
        },
        {
            question: "Кто был первым человеком в космосе?",
            options: ["Нил Армстронг", "Юрий Гагарин", "Леонов", "Тесла"],
            correct: 1,
        },
        {
            question: "Сколько будет 64 : 8?",
            options: ["6", "7", "8", "9"],
            correct: 2,
        },
        {
            question: "Что обозначает прилагательное?",
            options: ["Действие", "Предмет", "Признак предмета", "Число"],
            correct: 2,
        },
        {
            question: "Что нужно растениям для жизни?",
            options: ["Только вода", "Только солнце", "Вода, свет и воздух", "Только земля"],
            correct: 2,
        },
    ];

    function updateRanking() {
        if (score = 0) {
            rankingEl.textContent = "Новичок";
        } else if (score <= 5) {
            rankingEl.textContent = "Любитель";
        } else if (score <= 10) {
            rankingEl.textContent = "Знаток";
        } else {
            rankingEl.textContent = "Эксперт";
        }
    }

    function shuffleArray(array) {
        const result = array.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;
    }

    function startTimer(seconds) {
        clearInterval(timerId);
        timeLeft = seconds;
        updateTimerDisplay();

        timerId = setInterval(() => {
            timeLeft -= 1;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerId);
                endGame();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerId);
        timerId = null;
    }

    function showQuestion(index) {
        if (index >= currentQuestions.length) {
            endGame();
            return;
        }

        const question = currentQuestions[index];
        questionCounterEl.style.display = 'block';
        questionCounterEl.textContent = `Вопрос: ${index + 1} / ${currentQuestions.length}`;
        const shuffledOptions = shuffleArray(question.options.slice()); // copy and shuffle
        const correctAnswer = question.options[question.correct];
        const newCorrect = shuffledOptions.indexOf(correctAnswer);

        questionEl.textContent = question.question;
        answersEl.innerHTML = "";

        shuffledOptions.forEach((option, i) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(i, newCorrect));
            answersEl.appendChild(button);
        });
    }

    function checkAnswer(selected, correct) {
        const buttons = answersEl.querySelectorAll('.answer-btn');
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === correct) {
                btn.classList.add('correct');
            } else if (i === selected && selected !== correct) {
                btn.classList.add('incorrect');
            }
        });

        if (selected === correct) {
            score++;
        } else {
            score--;
        }
        score = Math.max(0, score);
        scoreEl.textContent = score;
        updateRanking();

        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }, 1000); // 1 секунда задержки
    }

    function endGame() {
        stopTimer();
        questionEl.textContent = "Игра окончена! Набранные очки: " + score;
        answersEl.innerHTML = "";
        startGameBtn.disabled = false;
    }

    function resetGame() {
        stopTimer();
        currentQuestionIndex = 0;
        score = 0;
        currentQuestions = [];
        scoreEl.textContent = score;
        rankingEl.textContent = "Новичок";
        questionCounterEl.style.display = 'none';
        const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
        const seconds = (totalTime % 60).toString().padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;
        questionEl.textContent = "Нажмите \"Начать игру\", чтобы увидеть первый вопрос.";
        answersEl.innerHTML = "";
        startGameBtn.disabled = false;
    }

    startGameBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        currentQuestions = shuffleArray(questions).slice(0, 15);
        scoreEl.textContent = score;
        updateRanking();
        startTimer(totalTime); // 5 минут на весь тест
        showQuestion(currentQuestionIndex);
        startGameBtn.disabled = true;
    });

    mainMenuBtn.addEventListener('click', resetGame);
});