const text = "The quick brown fox jumps over the lazy dog.";
const textElement = document.getElementById("text");
const inputElement = document.getElementById("input");
const resultElement = document.getElementById("result");

let startTime;
let endTime;
let typedChars = 0;
let currentHighlight = 0;

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
textElement.textContent = randomTexts[randomIndex];

inputElement.addEventListener("input", (event) => {
  const typedText = event.target.value;
  const correctChars = typedText.length;

  if (typedChars === 0) {
    startTime = new Date();
  }

  typedChars = correctChars;

  if (typedText === text) {
    endTime = new Date();
    const timeTaken = endTime - startTime;
    const wpm = Math.round((correctChars / 5) / (timeTaken / 60000));

    resultElement.textContent = `Time: ${timeTaken / 1000} seconds, WPM: ${wpm}`;
    inputElement.style.backgroundColor = 'lightgreen'; 
    inputElement.style.color = 'black'; 
  } else {
    const incorrectChars = typedText.slice(text.length); 
    inputElement.style.backgroundColor = 'lightpink';
    inputElement.style.color = 'black'; 
    inputElement.setSelectionRange(text.length, typedText.length);
  }

  if (correctChars > currentHighlight) {
    const highlightSpan = document.createElement("span");
    highlightSpan.classList.add("highlight");
    highlightSpan.textContent = text.charAt(currentHighlight);
    textElement.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      if (i < currentHighlight) {
        span.classList.add('highlight');
      } else if (i === currentHighlight) {
        span.classList.add('grayed'); 
      } else {
        span.classList.add('incorrect'); 
      }
      span.textContent = text.charAt(i);
      textElement.appendChild(span);
    }
    currentHighlight++;
  }

});