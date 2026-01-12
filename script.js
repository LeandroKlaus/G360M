window.addEventListener('load', () => {
    const bar = document.getElementById('loader-bar');
    const loader = document.getElementById('loader');
    
    setTimeout(() => { bar.style.width = '50%'; }, 200);
    setTimeout(() => { bar.style.width = '100%'; }, 800);
    
    setTimeout(() => {
        gsap.to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        });
        
        initHeroAnimations();
    }, 1500);
});

function initHeroAnimations() {
    gsap.to(".hero-text-anim", {
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    });
    gsap.to(".hero-fade-anim", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1
    });
}

const modal = document.getElementById('video-modal');
const btnOpen = document.getElementById('btn-open-video');
const btnClose = document.getElementById('btn-close-video');
const video = document.getElementById('promo-video');

if(btnOpen && modal && btnClose) {
    btnOpen.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
    });

    btnClose.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if(video) video.pause(); 
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            if(video) video.pause();
        }
    });
}

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2; 
        this.size = Math.random() * 2;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#b026ff'; 
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update(mouseX, mouseY) {
        this.x += this.speedX;
        this.y += this.speedY;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            this.x += dx / 20;
            this.y += dy / 20;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6 * this.z; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

let mouseX = width / 2;
let mouseY = height / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update(mouseX, mouseY);
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPct = (x / rect.width) - 0.5;
        const yPct = (y / rect.height) - 0.5;

        gsap.to(card, {
            rotationY: 10 * xPct,
            rotationX: -10 * yPct,
            transformPerspective: 500,
            duration: 0.5
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5
        });
    });
});