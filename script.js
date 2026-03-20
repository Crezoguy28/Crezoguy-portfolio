const moveImg = document.querySelector('.move-img');
const heroSection = document.querySelector('.hero-section');
const moveText = document.querySelector('#text');
const moveName = document.querySelector('.name')

let mouseX = 0, mouseY = 0; 
let currentImgX = 0, currentImgY = 0; 
let currentTextX = 0, currentTextY = 0;
let currentNameX = 0, currentNameY = 0;

// heroSection.addEventListener('mousemove', (e) => {
//     const centerX = window.innerWidth / 2;
//     const centerY = window.innerHeight / 2;
    
//     mouseX = (e.clientX - centerX);
//     mouseY = (e.clientY - centerY);
// });

// heroSection.addEventListener('mouseleave', () => {
//     mouseX = 0;
//     mouseY = 0;
// });

// const moveImg = document.querySelector('.move-img');
// const heroSection = document.querySelector('.hero-section');
// const moveText = document.querySelector('#text');
// const moveName = document.querySelector('.name');

// let mouseX = 0, mouseY = 0;

heroSection.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    mouseX = (e.clientX - centerX);
    mouseY = (e.clientY - centerY);

    // GSAP smooth animation
    gsap.to(moveImg, {
        x: mouseX * 0.05,
        y: mouseY * 0.05,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.to(moveName, {
        x: mouseX * 0.06,
        y: mouseY * 0.06,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.to(moveText, {
        x: mouseX * -0.03,
        y: mouseY * -0.03,
        duration: 0.6,
        ease: "power3.out"
    });
});

heroSection.addEventListener('mouseleave', () => {
    gsap.to([moveImg, moveText, moveName], {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

function animate() {

    const ease = 0.08;

    currentImgX += (mouseX * 0.05 - currentImgX) * ease;
    currentImgY += (mouseY * 0.05 - currentImgY) * ease;

    currentNameX += (mouseX * 0.06 - currentNameX) * ease;
    currentNameY += (mouseY * 0.06 - currentNameY) * ease;

    currentTextX += (mouseX * -0.03 - currentTextX) * ease;
    currentTextY += (mouseY * -0.03 - currentTextY) * ease;

    moveImg.style.transform = `translate(${currentImgX}px, ${currentImgY}px)`;
    moveText.style.transform = `translate(${currentTextX}px, ${currentTextY}px)`;
    moveName.style.transform = `translate(${currentNameX}px, ${currentNameY}px)`;

    requestAnimationFrame(animate);
}

animate();

// tiperX animation 
const FRAMES = ["images/device/deviceframes1.png","images/device/deviceframes (2).png","images/device/deviceframes (3).png","images/device/deviceframes (4).png","images/device/deviceframes (5).png","images/device/deviceframes (6).png","images/device/deviceframes (7).png","images/device/deviceframes (8).png","images/device/deviceframes (9).png","images/device/deviceframes (10).png","images/device/deviceframes (11).png","images/device/deviceframes (12).png","images/device/deviceframes (13).png","images/device/deviceframes (14).png","images/device/deviceframes (15).png","images/device/deviceframes (16).png","images/device/deviceframes17.png"];
const TOTAL = FRAMES.length;
const canvas = document.getElementById('frameCanvas');
const dotsEl = document.getElementById('frameDots');
const progressFill = document.getElementById('progressFill');
const cinematic = document.getElementById('cinematic');
const ambientBg = document.getElementById('ambientBg');

// Ambient color hints per frame cluster
const ambients = [
  'radial-gradient(ellipse 120% 100% at 50% 30%, #0d0818 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #0d0818 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #0d0818 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #100a20 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #100a20 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #120b22 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #130c25 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #140d28 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #150d2a 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #160e2c 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #160e2e 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #170f30 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #181030 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #191030 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #1a1132 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #1a1135 0%, #000 100%)',
  'radial-gradient(ellipse 120% 100% at 50% 30%, #1b1238 0%, #000 100%)',
];

// Build img elements
const imgs = FRAMES.map((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'device-img' + (i === 0 ? ' active' : '');
  img.draggable = false;
  canvas.appendChild(img);
  return img;
});

// Build dots
FRAMES.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'fdot' + (i === 0 ? ' on' : '');
  d.title = `Frame ${i+1}`;
  d.addEventListener('click', () => jumpToFrame(i));
  dotsEl.appendChild(d);
});

const dots = dotsEl.querySelectorAll('.fdot');

let currentFrame = 0;

function setFrame(idx) {
  idx = Math.max(0, Math.min(TOTAL - 1, idx));
  if (idx === currentFrame) return;
  
  imgs[currentFrame].classList.remove('active');
  dots[currentFrame].classList.remove('on');
  
  currentFrame = idx;
  
  imgs[currentFrame].classList.add('active');
  dots[currentFrame].classList.add('on');
//   ambientBg.style.background = ambients[currentFrame];
  
  const num = String(currentFrame + 1).padStart(2, '0');
}

function jumpToFrame(idx) {
  const rect = cinematic.getBoundingClientRect();
  const totalScroll = cinematic.offsetHeight - window.innerHeight;
  const target = cinematic.offsetTop + (idx / (TOTAL - 1)) * totalScroll;
  window.scrollTo({ top: target, behavior: 'smooth' });
}

// Scroll logic
function onScroll() {
  const rect = cinematic.getBoundingClientRect();
  const totalScroll = cinematic.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  const rawProgress = Math.max(0, Math.min(1, scrolled / totalScroll));
  
  // In cinematic zone?
  const inZone = scrolled > -window.innerHeight * 0.5 && scrolled < totalScroll + window.innerHeight * 0.5;
  dotsEl.classList.toggle('visible', inZone);
  document.body.classList.toggle('cinematic-mode', inZone && rawProgress > 0 && rawProgress < 1);
  
  // Frame index
  const frameIdx = Math.round(rawProgress * (TOTAL - 1));
  setFrame(frameIdx);
  
  // Global progress
  const globalMax = document.body.scrollHeight - window.innerHeight;
  const globalP = window.scrollY / globalMax;
  progressFill.style.width = (globalP * 100) + '%';
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();