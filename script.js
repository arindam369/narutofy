console.log("Narutofy Console -- created by Arindam");

const music_image = document.getElementById("music-image");
const music = document.getElementById("music");
const music_title = document.getElementById("music-title");
const music_singer = document.getElementById("music-singer");
const prevBtn = document.getElementById("prev-button");
const playBtn = document.getElementById("play-button");
const nextBtn = document.getElementById("next-button");
const progress = document.getElementById("onProgress");
const progressBox = document.getElementById("progress-box");
const currTime = document.getElementById("current-time");
const timeSpan = document.getElementById("duration");
const forwardBtn = document.getElementById("5s_front");
const backwardBtn = document.getElementById("5s_back");
const volIcon = document.getElementById("volIcon");
const muteIcon = document.getElementById("muteIcon");
const volBar = document.getElementById("volBar");
const vol = document.getElementById("vol");

vol.style.width="50%";
music.volume=50/100;

volBar.hidden=true;
music.hidden = true;
muteIcon.hidden=true;

var musicArray = [
    {
        fileName: "3",
        title: "Blue Bird",
        singer: "Ikimono Gakari"
    },
    {
        fileName: "4",
        title: "Closer",
        singer: "Joe Inoue"
    },
    {
        fileName: "5",
        title: "Hotaru No Hikaru",
        singer: "Ikimono Gakari"
    },
    {
        fileName: "6",
        title: "Sign",
        singer: "Flow"
    },
    {
        fileName: "7",
        title: "Tomei Datta Sekai",
        singer: "Motohir o Hata"
    },
    {
        fileName: "8",
        title: "Diver",
        singer: "Nico Touches The Walls"
    },
    {
        fileName: "9",
        title: "Lovers",
        singer: "7!!"
    },
    {
        fileName: "10",
        title: "New Song",
        singer: "Tacica"
    },
    {
        fileName: "11",
        title: "Silhouette",
        singer: "Kana Boon"
    }
];
var musicIndex = 0;

function playSong(mysong) {
    music_title.textContent = mysong.title;
    music_singer.textContent = mysong.singer;
    music.src = `./static/music/${mysong.fileName}.mp3`;
    music_image.src = `./static/images/${mysong.fileName}.jpg`;
    music.play();
}

var checkMusicPlaying = false;
function play_pause(){
    if (checkMusicPlaying === false) {
        music.play();
        checkMusicPlaying = true;
        playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
    }
    else {
        music.pause();
        checkMusicPlaying = false;
        playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
    }
}
function play_next(){
    if (musicIndex < musicArray.length - 1) {
        musicIndex++;
    }
    else {
        musicIndex = 0;
    }
    setTimeout(() => {
        playBtn.classList.replace("fa-play-circle", "fa-pause-circle");        
    }, 500);
    playBtn.classList.replace("fa-pause-circle", "fa-play-circle");

    playSong(musicArray[musicIndex]);
}
function play_prev(){
    if (musicIndex > 0) {
        musicIndex--;
    }
    else {
        musicIndex = musicArray.length - 1;
    }
    setTimeout(() => {
        playBtn.classList.replace("fa-play-circle", "fa-pause-circle");        
    }, 500);
    playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
    playSong(musicArray[musicIndex]);
}

playBtn.addEventListener("click", play_pause);
document.addEventListener("keydown", function(e) {
    if (e.code === 'Space') {
        play_pause();
    }
});
nextBtn.addEventListener("click", play_next);
prevBtn.addEventListener("click", play_prev);
forwardBtn.addEventListener("click",function(){
    music.currentTime+=5;
});
backwardBtn.addEventListener("click",function(){
    music.currentTime-=5;
});

function updateProgress(e) {
    if (checkMusicPlaying) {
        const { currentTime, duration } = e.srcElement;
        var progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;

        var sec = Math.floor(currentTime % 60);
        var min = Math.floor(currentTime / 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        var min_duration = Math.floor(duration / 60);
        var sec_duration = Math.floor(duration%60);
        if(sec_duration<10){
            sec_duration = '0' + sec_duration;
        }
        
        currTime.textContent = `${min}:${sec}`;
        if(min_duration){
            timeSpan.textContent = `${min_duration}:${sec_duration}`;
        }
        else{
            timeSpan.textContent = "0:00";
        }
    }
    if(music.volume<=0){
        volIcon.hidden=true;
        muteIcon.hidden=false;
    }
    if(music.volume>0){
        volIcon.hidden=false;
        muteIcon.hidden = true;
    }
}

music.addEventListener("timeupdate", updateProgress);

progressBox.addEventListener("click", function (e) {
    var totalWidth = e.srcElement.clientWidth;
    var posWidth = e.offsetX;
    const { duration } = music;
    var customisedTime = (posWidth / totalWidth) * duration;
    music.currentTime = customisedTime;
})
music.addEventListener("ended", play_next);

volBar.addEventListener("click",function(e){
    var totalWidth = e.srcElement.clientWidth;
    var posWidth = e.offsetX;
    var customisedVolume = (posWidth/totalWidth)*100;
    music.volume = `${customisedVolume/100}`;
    vol.style.width = `${customisedVolume}%`;
})
volIcon.addEventListener("click",function(){
    volBar.hidden=false;
    setTimeout(() => {
        volBar.hidden = true;    
    },5000);
})
muteIcon.addEventListener("click",function(){
    volBar.hidden=false;
    setTimeout(() => {
        volBar.hidden = true;    
    },5000);
})