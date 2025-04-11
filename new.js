
console.log("JavaScript is loaded!");

let currentAudio = null; // Variable to track the currently playing audio

// Function to play a selected song from the dropdown
function playSelectedSong() {
    const songSelect = document.getElementById('songSelect');
    const selectedSong = songSelect.value;

    // Define the song paths
    const songs = {
        song1: 'audio/song1.mp3',
        song2: 'audio/song2.mp3',
        song3: 'audio/song3.mp3'
    };

    // Check if a valid song is selected
    if (selectedSong !== 'none' && songs[selectedSong]) {
        console.log(`Playing: ${songs[selectedSong]}`);

        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // Create a new Audio instance and play the selected song
        currentAudio = new Audio(songs[selectedSong]);
        currentAudio.play()
            .then(() => console.log("Song started playing."))
            .catch(err => console.error("Error playing song:", err));

        // Enable control buttons
        document.getElementById('playBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('stopBtn').disabled = false;
    } else {
        console.log("No valid song selected.");
    }
}

// Function to play the current audio
function playAudio() {
    if (currentAudio) {
        currentAudio.play()
            .then(() => console.log("Resumed audio playback."))
            .catch(err => console.error("Error resuming playback:", err));
    }
}

// Function to pause the current audio
function pauseAudio() {
    if (currentAudio) {
        currentAudio.pause();
        console.log("Audio paused.");
    }
}

// Function to stop the current audio
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset to the beginning
        console.log("Audio stopped.");
    }
}

// Event listeners for the dropdown and buttons
document.getElementById('songSelect').addEventListener('change', playSelectedSong);
document.getElementById('playBtn').addEventListener('click', playAudio);
document.getElementById('pauseBtn').addEventListener('click', pauseAudio);
document.getElementById('stopBtn').addEventListener('click', stopAudio);

// Function to open new pages for Tutorial, About, and Login/Register
function openTutorialPage() {
    console.log("Opening tutorial...");
    window.open('tutorial.html', '_blank');
}

function openAboutPage() {
    console.log("Opening about...");
    window.open('about.html', '_blank');
}

function openLoginPage() {
    console.log("Opening login/register page...");
    window.open('login.html', '_blank');
}

function goHome() {
    console.log("Going home...");
    window.open('home.html', '_self');
}

// Function to play sound for a piano key
function playSound(keyElement) {
    if (!keyElement) return; // Return if no key element is provided

    const note = keyElement.getAttribute('data-note'); // Get the note from the key
    const audioPath = `sounds/${note}.mp3`; // Path to the corresponding audio file

    // Stop the current audio if it's playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset the audio playback
    }

    // Create and play the new audio
    try {
        currentAudio = new Audio(audioPath);
        currentAudio.play()
            .then(() => console.log(`Playing note: ${note}`))
            .catch(err => console.error("Audio play error:", err));
    } catch (error) {
        console.error(`Error playing sound for note: ${note}`, error);
    }
}

// Add keydown and keyup event listeners for keyboard interaction
document.addEventListener('keydown', (event) => {
    const keyElement = document.querySelector(`.key[data-key="${event.code}"]`); // Match the pressed key
    if (keyElement) {
        keyElement.classList.add('pressed'); // Highlight the key
        playSound(keyElement);
    }
});

document.addEventListener('keyup', (event) => {
    const keyElement = document.querySelector(`.key[data-key="${event.code}"]`);
    if (keyElement) {
        keyElement.classList.remove('pressed'); // Remove the highlight
    }
});

// Add click event listener for mouse clicks on keys
document.querySelectorAll('.key').forEach((keyElement) => {
    keyElement.addEventListener('mousedown', () => playSound(keyElement));
});
// Handle Key Assist functionality
document.getElementById('keyAssist').addEventListener('click', function() {
  alert("Key Assist Activated: Visual guidance for keys.");
  // Example: Highlight keys, or display a visual guide to assist the user
});

// Handle Metronome functionality
document.getElementById('metronome').addEventListener('click', function() {
  alert("Metronome Activated: Helps you keep the tempo.");
  // Example: You could implement a basic metronome sound at intervals
});

// Handle Sound functionality
document.getElementById('sound').addEventListener('click', function() {
  alert("Sound Settings: Adjust volume or change instrument.");
  // Example: Toggle sound volume or allow instrument changes
});

// Handle Styles functionality
document.getElementById('styles').addEventListener('click', function() {
  alert("Styles Activated: Choose musical styles or effects.");
  // Example: Apply different sound styles or piano themes
});

// Handle Save functionality
document.getElementById('save').addEventListener('click', function() {
  alert("Save Feature: Save your settings or your recordings.");
  // Example: Allow the user to save their progress, settings or recording
});