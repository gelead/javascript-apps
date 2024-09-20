const sounds = {
  kick: new Audio("drum-kit/sounds/kick.wav"),
  snare: new Audio("drum-kit/sounds/snare.wav"),
  hihat: new Audio("drum-kit/sounds/hihat.wav"),
  tom1: new Audio("drum-kit/sounds/tom1.wav"),
  tom2: new Audio("drum-kit/sounds/tom2.wav"),
  crash: new Audio("drum-kit/sounds/crash.wav"),
  ride: new Audio("drum-kit/sounds/ride.wav"),
  clap: new Audio("drum-kit/sounds/clap.wav"),
  perc: new Audio("drum-kit/sounds/perc.wav"),
};

window.addEventListener('keydown', ((e) =>{
    let drum = '';
    switch(e.key){
        case  'a':
            drum = document.getElementById('kick')
            playSound({target: drum})
            break;
        case  's':
            drum = document.getElementById('snare')
            playSound({target: drum})
            break;
        case  'd':
            drum = document.getElementById('hihat')
            playSound({target: drum})
            break;
        case  'f':
            drum = document.getElementById('tom1')
            playSound({target: drum})
            break;
        case  'g':
            drum = document.getElementById('tom2')
            playSound({target: drum})
            break;
        case  'h':
            drum = document.getElementById('crash')
            playSound({target: drum})
            break;
        case  'j':
            drum = document.getElementById('ride')
            playSound({target: drum})
            break;
        case  'k':
            drum = document.getElementById('clap')
            playSound({target: drum})
            break;
        case  'l':
            drum = document.getElementById('perc')
            playSound({target: drum})
            break;
    }
}))



const volumeControl = document.getElementById("volume");
volumeControl.addEventListener("input", updateVolume);

const drums = document.querySelectorAll(".drum").forEach((drum) => {
  drum.addEventListener("click", playSound);
});
let isrecording = false;
let recordSequence = [];
let startTime = 0;

function playSound(e) {
  const drum = e.target;
  const soundId = drum.id;
  const sound = sounds[soundId];

  if (sound) {
    sound.play();
    drum.classList.add("active");

    setTimeout(() => {
      drum.classList.remove("active");
    }, 100);

    if (isrecording) {
      recordSequence.push({
        soundId: soundId,
        time: new Date() - startTime,
      });
    }
  }
}

document.querySelector(".record").addEventListener("click", () => {
  if (isrecording) {
    alert("recording has finished!");
    isrecording = false;
  } else {
    alert("recording has started!");
    recordSequence = [];
    isrecording = true;
    startTime = new Date();
  }
});

document.querySelector(".playback").addEventListener("click", () => {
  console.log("fuck you");
  if (recordSequence.length === 0) return alert("Nothing recorded!");
  recordSequence.forEach((note) => {
    setTimeout(() => {
      const drum = document.getElementById(note.soundId);
      playSound({ target: drum });
    }, note.time);
  });
});

function updateVolume() {
  Object.values(sounds).forEach((sound) => {
    sound.volume = volumeControl.value;
  });
}
