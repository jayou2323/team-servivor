const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const loadingScreen = document.getElementById('loading');
const ctx = canvas.getContext('2d');

// 1. 카메라 초기화
async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
    audio: false,
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

// 2. 모델 로드 및 객체 탐지
async function detectObjects() {
  // 로딩 메시지 표시
  loadingScreen.style.display = 'flex';

  // COCO-SSD 모델 로드
  const model = await cocoSsd.load();
  console.log('Model loaded!');

  // 로딩 메시지 숨기고 비디오/캔버스 표시
  loadingScreen.style.display = 'none';
  video.style.display = 'block';
  canvas.style.display = 'block';

  // 캔버스 크기를 비디오 크기와 동일하게 설정
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // 실시간 객체 탐지
  async function detectFrame() {
    const predictions = await model.detect(video);

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 비디오 그리기
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 객체 탐지 결과 그리기
    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;

      // 박스 그리기
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // 텍스트 그리기
      ctx.font = '18px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText(text, x, y > 10 ? y - 5 : 10);
    });

    // 다음 프레임 처리
    requestAnimationFrame(detectFrame);
  }

  detectFrame();
}

// 3. 카메라 설정 후 객체 탐지 시작
setupCamera().then(() => {
  video.play();
  detectObjects();
});
