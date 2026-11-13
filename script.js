// ---------- showing the different pages ----------
var pages = document.querySelectorAll(".page");
var allPageButtons = document.querySelectorAll("[data-page]");
var navButtons = document.querySelectorAll(".nav-btn");

function showPage(name) {
  // hide every page first
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  // then show the one that was clicked
  document.getElementById(name).classList.add("active");

  // highlight the right button in the navbar
  for (var j = 0; j < navButtons.length; j++) {
    if (navButtons[j].dataset.page === name) {
      navButtons[j].classList.add("active");
    } else {
      navButtons[j].classList.remove("active");
    }
  }

  window.scrollTo(0, 0);
}

for (var k = 0; k < allPageButtons.length; k++) {
  allPageButtons[k].addEventListener("click", function () {
    showPage(this.dataset.page);
  });
}

// ---------- dark mode ----------
var themeBtn = document.getElementById("theme-btn");

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeBtn.textContent = "🌙";
  }
  localStorage.setItem("dark", isDark);
}

// remember what the visitor picked last time
setTheme(localStorage.getItem("dark") === "true");

themeBtn.addEventListener("click", function () {
  setTheme(!document.body.classList.contains("dark"));
});

// ---------- music player ----------
var musicPanel = document.getElementById("music-panel");
var playBtn = document.getElementById("play-btn");
var songName = document.getElementById("song-name");
var volumeControl = document.getElementById("volume");
var defaultSongVideoId = "kWnxXiFUkag";
var defaultSongStart = 311;
var youtubePlayer;
var youtubeReady = false;

songName.textContent = "♪ Now playing: YouTube song";

window.onYouTubeIframeAPIReady = function () {
  youtubePlayer = new YT.Player("youtube-player", {
    width: "224",
    height: "126",
    videoId: defaultSongVideoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: defaultSongVideoId,
      playsinline: 1,
      start: defaultSongStart
    },
    events: {
      onReady: function (event) {
        youtubeReady = true;
        event.target.setVolume(Number(volumeControl.value) * 100);
        event.target.playVideo();
      },
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.PLAYING) {
          playBtn.textContent = "⏸ Pause";
          songName.textContent = "♪ Now playing: YouTube song";
        } else if (event.data === YT.PlayerState.PAUSED) {
          playBtn.textContent = "▶ Play";
        } else if (event.data === YT.PlayerState.ENDED) {
          playBtn.textContent = "▶ Play";
        }
      },
      onError: function () {
        songName.textContent = "This YouTube video cannot be played here.";
        playBtn.textContent = "▶ Play";
      }
    }
  });
};

function startMusic() {
  if (!youtubeReady) {
    songName.textContent = "Loading YouTube player…";
    return;
  }
  youtubePlayer.playVideo();
}

// open and close the panel
document.getElementById("music-btn").addEventListener("click", function () {
  musicPanel.classList.toggle("open");
  if (youtubeReady && youtubePlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
    startMusic();
  }
});

playBtn.addEventListener("click", function () {
  if (!youtubeReady) {
    songName.textContent = "Loading YouTube player…";
  } else if (youtubePlayer.getPlayerState() === YT.PlayerState.PLAYING) {
    youtubePlayer.pauseVideo();
  } else {
    startMusic();
  }
});

volumeControl.addEventListener("input", function () {
  if (youtubeReady) {
    youtubePlayer.setVolume(Number(this.value) * 100);
  }
});

var youtubeApi = document.createElement("script");
youtubeApi.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(youtubeApi);

// ---------- hearts when the avatar is clicked ----------
document.getElementById("avatar").addEventListener("click", function (event) {
  var emojis = ["💖", "✨", "🌸", "⭐"];
  for (var i = 0; i < emojis.length; i++) {
    var heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = emojis[i];
    heart.style.left = event.clientX + (i - 1.5) * 25 + "px";
    heart.style.top = event.clientY + "px";
    document.body.appendChild(heart);
    // remove it after the animation so the page doesn't get messy
    setTimeout(function (h) {
      h.remove();
    }, 1200, heart);
  }
});
