let allQuestions = {
  easy: [
    {question:"Apa arti Idul Fitri?",answers:["Hari Raya","Kembali Suci","Puasa","Lebaran"],correct:1},
    {question:"Idul Fitri tanggal?",answers:["1 Syawal","1 Ramadhan","10 Dzulhijjah","12 Rabiul Awal"],correct:0},
    {question:"Sholat Id berapa rakaat?",answers:["1","2","3","4"],correct:1},
    {question:"Zakat fitrah hukumnya?",answers:["Wajib","Sunnah","Makruh","Mubah"],correct:0},
    {question:"Bulan puasa adalah?",answers:["Rajab","Ramadhan","Syawal","Muharram"],correct:1}
  ],
  medium: [
    {question:"Zakat fitrah dibayar sebelum?",answers:["Sholat Id","Maghrib","Subuh","Tarawih"],correct:0},
    {question:"Malam takbiran terjadi saat?",answers:["Awal Ramadhan","Akhir Ramadhan","Subuh","Siang"],correct:1},
    {question:"Tujuan zakat fitrah?",answers:["Membersihkan jiwa","Menambah harta","Pamer","Biasa saja"],correct:0},
    {question:"Hukum sholat Id?",answers:["Wajib","Sunnah Muakkad","Makruh","Mubah"],correct:1},
    {question:"Hari raya umat Islam ada berapa?",answers:["1","2","3","4"],correct:1}
  ],
  hard: [
    {question:"Takbir Idul Fitri dimulai setelah?",answers:["Maghrib akhir Ramadhan","Subuh","Dzuhur","Ashar"],correct:0},
    {question:"Zakat fitrah dibayarkan dalam bentuk?",answers:["Uang saja","Emas","Makanan pokok","Pakaian"],correct:2},
    {question:"Siapa yang wajib zakat fitrah?",answers:["Muslim mampu","Semua orang","Anak kecil saja","Orang sakit saja"],correct:0},
    {question:"Khutbah Id dilakukan setelah?",answers:["Sholat","Adzan","Iqamah","Subuh"],correct:0},
    {question:"Hikmah Idul Fitri?",answers:["Silaturahmi","Marah","Bertengkar","Menyendiri"],correct:0}
  ]
};

let questions = [];
let current = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let time = 20;
let timerInterval;

function shuffle(array){
  return array.sort(()=>Math.random()-0.5);
}

function startQuiz(){
  let level = document.getElementById("levelSelect").value;
  questions = shuffle([...allQuestions[level]]);

  current=0;
  score=0;
  correctCount=0;
  wrongCount=0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");

  loadQuestion();
  startTimer();
}

function loadQuestion(){
  let q = questions[current];
  document.getElementById("question").innerText = q.question;
  document.getElementById("progress").innerText=`Soal ${current+1}/${questions.length}`;
  document.getElementById("score").innerText="Poin: "+score;

  let answersDiv=document.getElementById("answers");
  answersDiv.innerHTML="";

  q.answers.forEach((ans,index)=>{
    let btn=document.createElement("button");
    btn.innerText=ans;
    btn.onclick=()=>checkAnswer(btn,index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button,index){
  let correctIndex=questions[current].correct;
  let buttons=document.querySelectorAll("#answers button");

  buttons.forEach((btn,i)=>{
    btn.disabled=true;
    if(i===correctIndex) btn.classList.add("correct");
    if(i===index && i!==correctIndex) btn.classList.add("wrong");
  });

  if(index===correctIndex){
    score+=10;
    correctCount++;
  } else {
    wrongCount++;
  }

  setTimeout(()=>{
    current++;
    if(current<questions.length){
      loadQuestion();
    } else {
      endQuiz();
    }
  },1000);
}

function startTimer(){
  time=20;
  document.getElementById("timer").innerText="Waktu: "+time;

  timerInterval=setInterval(()=>{
    time--;
    document.getElementById("timer").innerText="Waktu: "+time;
    if(time<=0) endQuiz();
  },1000);
}

function endQuiz(){
  clearInterval(timerInterval);

  document.getElementById("quizBox").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("finalScore").innerText="Skor Akhir: "+score;
  document.getElementById("correctStat").innerText="Jawaban Benar: "+correctCount;
  document.getElementById("wrongStat").innerText="Jawaban Salah: "+wrongCount;

  let name=prompt("Masukkan nama kamu:");
  if(!name) name="Player";
  saveScore(name,score);
}

function saveScore(name,score){
  let leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[];
  leaderboard.push({name,score});
  leaderboard.sort((a,b)=>b.score-a.score);
  leaderboard=leaderboard.slice(0,10);
  localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
}

function showLeaderboard(){
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("leaderboardBox").classList.remove("hidden");

  let leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[];
  let list=document.getElementById("leaderboardList");
  list.innerHTML="";

  leaderboard.forEach((item,index)=>{
    let li=document.createElement("li");
    li.innerText=`${index+1}. ${item.name} - ${item.score}`;
    list.appendChild(li);
  });
}

function backToMenu(){
  document.querySelectorAll("main > div").forEach(div=>div.classList.add("hidden"));
  document.getElementById("menu").classList.remove("hidden");
}