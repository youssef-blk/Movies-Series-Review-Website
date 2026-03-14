const slides = [
    { 
        img: "https://i.pinimg.com/1200x/18/db/b2/18dbb2f591bfe59baabd8d77c46f694a.jpg", 
        title: "DARK", 
        p: "A complex supernatural thriller where the disappearance of two children exposes the double lives and fractured relationships among four families. This mind-bending saga explores the dark secrets of a small town across generations..." 
    },
    { 
        img: "https://i.pinimg.com/1200x/a4/74/f9/a474f94adc86667848f4681bec86eb77.jpg", 
        title: "VIKINGS", 
        p: "The brutal and epic journey of Ragnar Lothbrok, a restless warrior who seeks to explore and raid distant shores across the ocean. Witness the rise of a legendary Norse king and the fierce battles that shaped the Viking Age..." 
    },
    { 
        img: "https://i.pinimg.com/1200x/4d/77/53/4d775329643964a73d3edf5089c039b4.jpg", 
        title: "FROM", 
        p: "Unravel the terrifying mystery of a nightmare town in middle America that traps everyone who enters. As the residents struggle to maintain a sense of normalcy, they must also survive the threats of the surrounding forest..." 
    },
    { 
        img: "https://i.pinimg.com/1200x/b3/35/10/b33510f403f7f17c75d4a9a02460099e.jpg", 
        title: "MINDHUNTER", 
        p: "Set in the late 1970s, two FBI agents expand criminal science by delving into the psychology of murder. By interviewing imprisoned serial killers, they hope to understand how these monsters think to solve ongoing cases..." 
    },
    { 
        img: "https://i.pinimg.com/1200x/ab/93/99/ab9399d4928087e66e3db782b554c70b.jpg", 
        title: "THE JOKER", 
        p: "A deep and haunting character study of Arthur Fleck, a man disregarded by society who eventually transforms into a criminal mastermind. This story explores the origins of Gotham's most iconic villain..." 
    }
];

let i = 0;
const bg = document.getElementById("bg");
const desc = document.getElementById("desc");
const title = document.getElementById("show-title");
const infoContainer = document.querySelector(".hero-info");

setInterval(() => {
    
    bg.style.opacity = 0;
    infoContainer.classList.add("fade-out");

    setTimeout(() => {
        
        
       
        bg.src = slides[i].img;
        title.innerText = slides[i].title;
        desc.textContent = slides[i].p;
        

        
        bg.style.opacity = 1;
        infoContainer.classList.remove("fade-out");
        i ++;
        if(i===4){
          i=0
        }
    }, 800); 
}, 5000);
