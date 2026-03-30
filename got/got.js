const fullText = "Power rules everything, and trust is a dangerous game. In Game of Thrones, every choice can cost a life—and no one is ever truly safe.";
const typingElement = document.getElementById("typing-text");
const textWrapper = document.getElementById("text-wrapper");
const logoReveal = document.getElementById("logo-reveal");
const nav = document.getElementById("nav-id");

let index = 0;
let isSkipped = false;
let typingTimeout;

document.body.style.overflow = "hidden";

function typeEffect() {
  if (isSkipped) return;
  if (index < fullText.length) {
    typingElement.textContent += fullText.charAt(index);
    index++;
    typingTimeout = setTimeout(typeEffect, 50);
  } else {
    setTimeout(() => {
      finishAnimation();
    }, 3000); 
  }
  
}

function skipTyping() {
  if (isSkipped || index >= fullText.length) return;
  isSkipped = true;
  clearTimeout(typingTimeout);
  finishAnimation();
}

function finishAnimation() {
  textWrapper.classList.add("fade-text");
  setTimeout(() => {
    textWrapper.style.display = "none";
    logoReveal.style.display = "flex";
    
    // إظهار اللوجو والنابار ببطء
    setTimeout(() => {
        logoReveal.classList.add("visible");
        nav.classList.add("visible");
        document.querySelector('.rating-box').classList.add('show');
        
        // طلق الـ Scroll دابا
        document.body.style.overflow = "auto";
        document.body.style.overflowX = "hidden";
        
        initSwiper();
    }, 100);
  }, 600);
}

function initSwiper() {
  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 25,
    navigation: {
      nextEl: ".custom-next",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
}
const characters = {
    tyrion: {
        name: "Tyrion Lannister",
        desc: "Lord Tyrion Lannister is the youngest child of Lord Tywin Lannister and younger brother of Cersei and Jaime Lannister. A dwarf, he uses his wit and intellect to overcome the prejudice he faces.",
        img: "https://i.pinimg.com/736x/d4/19/0c/d4190cffb4c5ddaae39ad6632c2be2fe.jpg"
    },
    jaime: {
        name: "Jaime Lannister",
        desc: "Ser Jaime Lannister was the eldest son of Lord Tywin Lannister. Known as the Kingslayer, he is one of the most skilled swordsmen in the Seven Kingdoms.",
        img: "https://i.pinimg.com/1200x/7c/15/09/7c15099c373eb9528bdb6293aac3f2bb.jpg"
    },
    cersei: {
        name: "Cersei Lannister",
        desc: "Queen Cersei Lannister is the widow of King Robert Baratheon. She is fierce, protective of her children, and willing to do anything to hold onto power.",
        img: "https://i.pinimg.com/avif/1200x/4f/ef/65/4fef6568fe55439881443271511b701d.avf"
    },
    daenerys: {
    name: "Daenerys Targaryen",
    desc: "The last confirmed member of House Targaryen. Known as the Mother of Dragons, she began her journey as an exiled princess and rose to become a powerful conqueror with three dragons by her side.",
    img: "https://i.pinimg.com/736x/c8/87/b0/c887b06ad71195db6a1a70623e05953e.jpg" // T-9der t-beddel l-link b t-swira lli 3ndek
}
};

document.querySelectorAll('.char-thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
        // Active Class toggle
        document.querySelector('.char-thumb.active').classList.remove('active');
        this.classList.add('active');

        // Get Data
        const charKey = this.getAttribute('data-target');
        const data = characters[charKey];

        // Update Content with Fade effect
        const infoDiv = document.getElementById('character-info');
        const bigImg = document.getElementById('char-big-img');

        infoDiv.style.opacity = 0;
        bigImg.style.opacity = 0;

        setTimeout(() => {
            document.getElementById('char-name').textContent = data.name;
            document.getElementById('char-desc').textContent = data.desc;
            bigImg.src = data.img;
            
            infoDiv.style.opacity = 1;
            bigImg.style.opacity = 1;
        }, 300);
    });
});
window.onload = typeEffect;