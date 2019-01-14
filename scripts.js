// Submitted By: James Lau
// Submitted To: Tiff Nogueira
// Assignment: 2019 Winter Accerlerated Javascript - Project One
// Date Submitted: January 13, 2019


let countdown; // Global variable
const timerDisplay = document.querySelector('.countdown');
const returnTime = document.querySelector('.returnTime');
const buttons = document.querySelectorAll('[data-sec]');
const reset = document.querySelector('.reset');
const add = document.getElementById("add");

function timer(seconds) {
    clearInterval(countdown); // Clear existing timer

    const now = Date.now();
    const then = now + seconds * 1000;
    displayCountdown(seconds);
    displayReturnTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000); // Countdown in seconds
        if(secondsLeft < 0) {
        clearInterval(countdown);
        return;
        }
        displayCountdown(secondsLeft);
    }, 1000);
}
// Countdown timer display
function displayCountdown(seconds) {
  const minutes = Math.floor(seconds / 60); // Round to whole minutes
  const remainingSeconds = seconds % 60; // Remaining seconds
  const display = `${minutes}:${remainingSeconds < 10 ? '0' : '' }${remainingSeconds}`; // shorthand ternary operator (?)used in place of 'if' statement
  document.title = display; // Updates html title with countdown timer
  timerDisplay.textContent = display; //Display countdown timer in 'h1 class=countdown'
  // Change background colour when timer hits below 1 minute, red background when timer has expired
  if (timerDisplay.style.display === "block" && returnTime.style.display === "block" ) {
    if (minutes < 1 && remainingSeconds > 1) {
        document.body.style.background = "linear-gradient(#f0f772,#E8F14D,#FFFFFF,#F2FE20,#F8FE8C)";
        // returnTime.style.color = "black";
      } else if (minutes === 0 && remainingSeconds === 0){
        document.body.style.background = "linear-gradient(#FE2F32,#FC3D40,#FFFFFF,#FE6264,#F20A0D)";
      }
  }
};

// Be back time display
function displayReturnTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  returnTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}!`; //Display return time in 'p class =returnTime'
  returnTime.style.display = "block"; // Prevents rerun
}

// Function to start the timer
function startTimer(button) {
  const seconds = parseInt(button.dataset.sec);
  timer(seconds);
};

// Activate timer settings buttons
buttons.forEach(button => button.addEventListener('click', () => {
    startTimer(button);
    timerDisplay.style.display = "block";
    document.body.style.background = "linear-gradient(#019CFE,#4FAFEB, #ffffff, #9CD689, #42AE1F)";
    returnTime.style.color = "black";
 
}));


// Input form
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60); // Convert to seconds
    this.reset(); // Clear value in form
    timerDisplay.style.display = "block";
    document.body.style.background = "linear-gradient(#019CFE,#4FAFEB, #ffffff, #9CD689, #42AE1F)";
    returnTime.style.color = "black";
})

// Reset button
 function resetTimer () {
     timerDisplay.style.display = "none";
     returnTime.style.display = "none";
     
};
reset.addEventListener('click',(e) => {
    e.preventDefault();
    resetTimer();
    console.log('reset clicked');
    document.body.style.background = "linear-gradient(#019CFE,#4FAFEB, #9CD689, #42AE1F)";
    returnTime.style.color = "black";

});

