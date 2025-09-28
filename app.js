    let timer;
    let seconds = 0;
    let running = false;

    const timeEl = document.getElementById("time");
    const circle = document.getElementById("circle");

    function updateTime() {
      let min = String(Math.floor(seconds / 60)).padStart(2, "0");
      let sec = String(seconds % 60).padStart(2, "0");
      timeEl.textContent = `${min}:${sec}`;

      let progress = (seconds % 60) * (100 / 60);
      circle.style.setProperty("--progress", `${progress}%`);
    }

    document.getElementById("start").addEventListener("click", () => {
      if (!running) {
        running = true;
        timer = setInterval(() => {
          seconds++;
          updateTime();
        }, 1000);
      }
    });

    document.getElementById("pause").addEventListener("click", () => {
      running = false;
      clearInterval(timer);
    });

    document.getElementById("reset").addEventListener("click", () => {
      running = false;
      clearInterval(timer);
      seconds = 0;
      updateTime();
    });

    updateTime();

    // ---- CÁMARA ----
    const camBtn = document.getElementById("camBtn");
    const cameraContainer = document.getElementById("cameraContainer");
    const video = document.getElementById("camera");
    let camActive = false;

    camBtn.addEventListener("click", async () => {
      if (!camActive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          cameraContainer.style.display = "flex";
          camBtn.textContent = "❌ Stop Cam";
          camActive = true;
        } catch (err) {
          alert("No se pudo acceder a la cámara: " + err);
        }
      } else {
        let tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        cameraContainer.style.display = "none";
        camBtn.textContent = "🎥 Smart Mode";
        camActive = false;
      }
    });