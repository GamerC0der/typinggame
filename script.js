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
let currentHighlight = 0;
let accuracy = 0; 

const randomTexts = [
  "The quick brown rabbit jumps over the lazy cat.",
  "The lazy dog sleeps under the warm sun.",
  "The little green frog sits on a lily pad.",
  "The old oak tree stands tall above the bustling meadow.",
  "The silver fish swims swiftly through the clear blue stream.",
  "The red fox sneaks quietly through the dense underbrush.",
  "The cheerful songbird sings sweetly from the high treetop.",
  "The golden sun sets gracefully behind the rolling hills.",
  "The curious kitten plays with a ball of yarn.",
  "The wise old owl hoots softly in the silent night.",
  "The playful otters splash joyfully in the shimmering lake.",
  "The vibrant flowers bloom brightly in the spring garden.",
  "The majestic eagle soars high above the snowy mountains."
];
const randomIndex = Math.floor(Math.random() * randomTexts.length);
text = randomTexts[randomIndex];

let wpmData = [];
let timer;

let typingStarted = false;

inputElement.addEventListener("input", (event) => {
  const typedText = event.target.value;
  const correctChars = typedText.length; 

  if (!typingStarted) {
    startTime = new Date();
    timer = setInterval(updateWpm, 300);
    typingStarted = true; 
  }

  const currentTime = new Date();
  const timeTaken = currentTime - startTime;
  const wpm = Math.round((typedChars / 5) / (timeTaken / 60000));
  wpmElement.textContent = `WPM: ${wpm}`;

  accuracy = Math.round((typedChars / text.length) * 100);
  accuracyElement.textContent = `Accuracy: ${accuracy}%`;

  if (typedText === text) {
    endTime = new Date();
    const timeTaken = endTime - startTime;
    const wpm = Math.round((typedChars / 5) / (timeTaken / 60000));

    resultElement.textContent = `Time: ${timeTaken / 1000} seconds, WPM: ${wpm}, Accuracy: ${accuracy}%`;
    inputElement.style.backgroundColor = 'lightgreen';
    inputElement.style.color = 'black';

    clearInterval(timer);
    wpmChart.style.display = "block";
  }

  textElement.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    if (i < correctChars) {
      if (typedText[i] === text[i]) {
        span.classList.add('highlight'); 
        typedChars = i + 1; 
      } else {
        span.classList.add('incorrect'); 
      }
    } else if (i === currentHighlight) {
      span.classList.add('current');
    }
    span.textContent = text.charAt(i);
    textElement.appendChild(span);
  }
  currentHighlight = typedText.length; 
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
  const wpm = Math.round((typedChars / 5) / (timeTaken / 60000));
  wpmData.push(wpm);
  updateWpmChart(); 
}

wpmChart.style.display = "none";

inputElement.style.color = "white";