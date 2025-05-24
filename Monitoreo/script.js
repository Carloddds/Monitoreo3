const heart = document.getElementById('heart');
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const timerEl = document.getElementById('timer');

const startDate = new Date("2022-09-23T00:00:00");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = new Date(diff).getUTCHours();
  const minutes = new Date(diff).getUTCMinutes();
  const seconds = new Date(diff).getUTCSeconds();
  timerEl.textContent = `Juntos desde hace: ${days} días ${hours}h ${minutes}m ${seconds}s`;
}

function heartShape(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -13 * Math.cos(t) + 5 * Math.cos(2 * t) + 2 * Math.cos(3 * t) + Math.cos(4 * t);
  return { x, y };
}

let particles = [];

function initParticles() {
  particles = [];
  for (let i = 0; i < 300; i++) {
    const t = Math.random() * Math.PI * 2;
    const pos = heartShape(t);
    particles.push({
      x: 200 + pos.x * 8,
      y: 150 + pos.y * 8,
      r: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Tronco
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(195, 240, 10, 60);

  // Ramas
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 2;

  const branches = [
    { x1: 200, y1: 240, x2: 170, y2: 200 },
    { x1: 200, y1: 240, x2: 230, y2: 200 },
    { x1: 200, y1: 220, x2: 160, y2: 180 },
    { x1: 200, y1: 220, x2: 240, y2: 180 },
  ];

  for (let b of branches) {
    ctx.beginPath();
    ctx.moveTo(b.x1, b.y1);
    ctx.lineTo(b.x2, b.y2);
    ctx.stroke();
  }

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) {
      p.x = 200;
      p.y = 150;
    }
  }

  requestAnimationFrame(animateParticles);
}

heart.addEventListener('click', () => {
  heart.style.display = 'none';
  canvas.style.display = 'block';
  message.style.display = 'block';
  initParticles();
  animateParticles();
  setInterval(updateTimer, 1000);
  updateTimer();
});
