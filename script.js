let text = "The quick brown fox jumps over the lazy dog.";
const textElement = document.getElementById("text");
const inputElement = document.getElementById("input");
const resultElement = document.getElementById("result");
const wpmChart = document.getElementById('wpmChart');
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

let startTime;
let endTime;
let typedChars = 0; 
let correctChars = 0;
let accuracy = 0; 

const randomTexts = [
  "The quick brown rabbit jumps over the lazy cat. The lazy dog sleeps under the warm sun. The little green frog sits on a lily pad. ",
];
const randomIndex = Math.floor(Math.random() * randomTexts.length);
text = randomTexts[randomIndex];

let wpmData = [];
let timer;
let typingStarted = false;

inputElement.addEventListener("input", (event) => {
  const typedText = event.target.value;

  if (!typingStarted) {
    startTime = new Date();
    timer = setInterval(updateWpm, 300);
    typingStarted = true;
  }

  correctChars = 0;
  typedChars = 0;
  let isCorrect = true;
  let mistakes = 0;
  textElement.innerHTML = '';

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    if (i < typedText.length) {
      if (typedText[i] === text[i] && isCorrect) {
        span.classList.add('highlight');
        correctChars++;
      } else {
        span.classList.add('incorrect');
        isCorrect = false; 
        mistakes++; 
      }
      typedChars++;
    } else if (i === typedText.length) {
      span.classList.add('current');
    }
    span.textContent = text.charAt(i);
    textElement.appendChild(span);
  }

  if (isCorrect) {
    currentHighlight = typedText.length;
  } else {
    inputElement.value = typedText.substring(0, correctChars);
  }

  accuracy = Math.round(((correctChars - mistakes) / text.length) * 100) + 1; 
  if (accuracy >= 99) {
    accuracy = 100; 
  }
  accuracyElement.textContent = `Accuracy: ${accuracy}%`;

  if (accuracy === 100) {
    endTime = new Date();
    const timeTaken = endTime - startTime;
    const adjustedAccuracy = accuracy / 100; 
    const adjustedTypedChars = typedChars * adjustedAccuracy; 
    const wpm = Math.round((adjustedTypedChars / 5) / (timeTaken / 60000));

    resultElement.textContent = `Time: ${timeTaken / 1000} seconds, Accuracy: ${accuracy}%`;
    inputElement.style.backgroundColor = 'lightgreen';
    inputElement.style.color = 'black';

    clearInterval(timer);
    wpmData.push(wpm); 
    updateWpmChart();
    wpmChart.style.display = "block";

    const averageWpm = Math.round(wpmData.reduce((sum, wpm) => sum + wpm, 0) / wpmData.length);
    wpmElement.textContent = `Average WPM: ${averageWpm}`;
  }
});

function updateWpmChart() {
  const ctx = document.getElementById('wpmChart').getContext('2d');

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: wpmData.length }, (_, i) => i + 1),
      datasets: [{
        label: 'WPM',
        data: wpmData,
        borderColor: 'lightblue',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function updateWpm() {
  const timeTaken = new Date() - startTime;
  const adjustedAccuracy = accuracy / 100; 
  const adjustedTypedChars = typedChars * adjustedAccuracy; 
  const wpm = Math.round((adjustedTypedChars / 5) / (timeTaken / 60000));
  wpmData.push(wpm);
  updateWpmChart(); 
}

wpmChart.style.display = "none";
inputElement.style.color = "white";
