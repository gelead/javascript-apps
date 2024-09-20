const startBtn = document.querySelector('.btn');
const display = document.querySelector('.timer');
const input = document.querySelector('.input');
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;

let endTime = 0;

startBtn.addEventListener('click', () =>{
    endTime = new Date(input.value).getTime()
    if(isNaN(endTime)){
        alert('Please Enter a Date: ');
        return;
    }
    updateTimer();
})

function updateTimer(){
    timer = setInterval(currentTime, 1000);
}
function currentTime(){
    const timeRemaining = endTime - new Date().getTime();

    seconds = Math.floor((timeRemaining / 1000) % 60)
    minutes = Math.floor((timeRemaining / 1000 / 60) % 60)
    hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24)
    days = Math.floor((timeRemaining / 1000 / 60 / 60 / 24))

    const dateString = `${days}D:${hours}H:${minutes}M:${seconds}S`;

    display.textContent = dateString;

} 