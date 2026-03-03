const questions = [
  {
    question: "Apa arti Idul Fitri?",
    answers: ["Hari Kemenangan", "Hari Puasa", "Hari Libur", "Hari Raya Haji"],
    correct: 0
  },
  {
    question: "Zakat fitrah dibayarkan pada bulan?",
    answers: ["Rajab", "Ramadhan", "Syawal", "Muharram"],
    correct: 1
  },
  {
    question: "Takbir dikumandangkan saat?",
    answers: ["Sebelum Maghrib", "Idul Fitri", "Sholat Jumat", "Maulid Nabi"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let username = "";

function startQuiz() {
  username = document.getElementById("username").value;
  if (!username) return alert("Masukkan nama!");

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  let q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    let btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (index === questions[currentQuestion].correct) {
    score += 10;
    document.getElementById("score").innerText = score;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("finalScore").innerText = score;
}

async function saveScore() {
  await fetch("/.netlify/functions/leaderboard", {
    method: "POST",
    body: JSON.stringify({ name: username, score: score })
  });
  loadLeaderboard();
}

async function loadLeaderboard() {
  const res = await fetch("/.netlify/functions/leaderboard");
  const data = await res.json();
  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  data.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item.name + " - " + item.score;
    list.appendChild(li);
  });
}

loadLeaderboard();