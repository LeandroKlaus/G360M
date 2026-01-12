window.addEventListener('load', () => {
    const bar = document.getElementById('loader-bar');
    const loader = document.getElementById('loader');
    
    setTimeout(() => { bar.style.width = '50%'; }, 200);
    setTimeout(() => { bar.style.width = '100%'; }, 800);
    
    setTimeout(() => {
        gsap.to(loader, {
            yPercent: -100,
            duration: 0.8,
            ease: "expo.inOut"
        });
        
        initHeroAnimations();
    }, 1500);
});

function initHeroAnimations() {
    gsap.to(".hero-text-anim", {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2
    });
    
    gsap.to(".hero-fade-anim", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.2)",
        delay: 0.6
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
let confettis = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Confetti {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        
        const colors = [
            '#FFD700',
            '#C0C0C0',
            '#FF0000',
            '#0088FF',
            '#00FF00',
            '#FFFFFF'
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.w = Math.random() * 8 + 4;
        this.h = Math.random() * 6 + 3;
        
        this.speedY = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        
        this.oscillationSpeed = Math.random() * 0.05 + 0.01;
        this.oscillationOffset = Math.random() * 100;
    }

    update() {
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        this.x += Math.sin(this.y * this.oscillationSpeed + this.oscillationOffset) * 0.5 + this.speedX;

        if (this.y > height) {
            this.y = -20;
            this.x = Math.random() * width;
            this.rotation = Math.random() * 360;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        
        ctx.restore();
    }
}

for (let i = 0; i < 150; i++) confettis.push(new Confetti());

function animate() {
    ctx.clearRect(0, 0, width, height);
    confettis.forEach(c => {
        c.update();
        c.draw();
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
            rotationY: 15 * xPct,
            rotationX: -15 * yPct,
            scale: 1.05,
            transformPerspective: 500,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });
    });
});