const drums = document.querySelectorAll('.drum');
const sounds = {
  kick: new Audio('sounds/kick.wav'),
  snare: new Audio('sounds/snare.wav'),
  hihat: new Audio('sounds/hihat.wav'),
  tom1: new Audio('sounds/tom1.wav'),
  tom2: new Audio('sounds/tom2.wav'),
  crash: new Audio('sounds/crash.wav'),
  ride: new Audio('sounds/ride.wav'),
  clap: new Audio('sounds/clap.wav'),
  perc: new Audio('sounds/perc.wav')
};

let isRecording = false;
let recordedSequence = [];
let startTime;
const volumeControl = document.getElementById('volume');
volumeControl.addEventListener('input', updateVolume);

// Add event listeners for mouse clicks and key presses
drums.forEach(drum => {
  drum.addEventListener('click', playSound);
});

window.addEventListener('keydown', (e) => {
  const key = document.querySelector(`.drum[data-key="${e.keyCode}"]`);
  if (key) playSound({ target: key });
});

// Play sound and add visual effect
function playSound(e) {
  const drum = e.target;
  const soundId = drum.id;
  const sound = sounds[soundId];
  
  if (sound) {
    sound.currentTime = 0; // Rewind to the start
    sound.volume = volumeControl.value;
    sound.play();
    drum.classList.add('active');
    
    setTimeout(() => {
      drum.classList.remove('active');
    }, 100);

    if (isRecording) {
      recordedSequence.push({
        soundId: soundId,
        time: Date.now() - startTime
      });
    }
  }
}

// Recording feature
document.getElementById('record').addEventListener('click', () => {
  if (isRecording) {
    isRecording = false;
    alert('Recording stopped.');
  } else {
    recordedSequence = [];
    startTime = Date.now();
    isRecording = true;
    alert('Recording started!');
  }
});

// Playback feature
document.getElementById('playback').addEventListener('click', () => {
  if (recordedSequence.length === 0) return alert('Nothing recorded!');
  recordedSequence.forEach(note => {
    setTimeout(() => {
      const drum = document.getElementById(note.soundId);
      playSound({ target: drum });
    }, note.time);
  });
});

// Update volume control
function updateVolume() {
  Object.values(sounds).forEach(sound => {
    sound.volume = volumeControl.value;
  });
}
