const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const progContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const volumeContainer = document.getElementById('volume-container')
const volumeEl = document.getElementById('volume')
const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Musics
const songs = [
    {
        musicName: 'Ichika nito - ice',
        displayName: 'Ice',
        artist: 'Ichika Niko'
    },
    {
        musicName: 'Ichika nito - i miss you',
        displayName: 'I miss you',
        artist: 'Ichika Niko'
    }
]

// Current song
let songIndex = 0

// Check if playing
let isPlaying = false

// Play
function playSong() {
    music.play()
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
}
// Pause
function pauseSong() {
    music.pause()
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
}

// Prev Song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next Song
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.musicName}.mp3`
    image.src = `img/${song.displayName}.jpg`
    console.log(music.volume)
}

// Update progress Bar & time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay Sitching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar 
function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = music
    music.currentTime = (clickX / width) * duration
}

// Update volume bar width
function updateVolume(e) {
    volumeEl.style.width = `${music.volume * 100}%`
}

//  Set Volume
function setVolume(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    music.volume = clickX / width
}

// On load - Select first song
loadSong(songs[songIndex])


// Event listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
music.addEventListener('volumechange', updateVolume)
progContainer.addEventListener('click', setProgressBar)
volumeContainer.addEventListener('click', setVolume)
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong())