const moveImg = document.querySelector('.move-img');
const heroSection = document.querySelector('.hero-section');
const moveText = document.querySelector('#text');
const moveName = document.querySelector('.name')

let mouseX = 0, mouseY = 0; 
let currentImgX = 0, currentImgY = 0; 
let currentTextX = 0, currentTextY = 0;
let currentNameX = 0, currentNameY = 0;

heroSection.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    mouseX = (e.clientX - centerX);
    mouseY = (e.clientY - centerY);
});

heroSection.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
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
