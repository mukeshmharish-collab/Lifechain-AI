/*==========================================================
 LifeChain AI
 script.js
 Part 1
==========================================================*/

"use strict";

/*==========================================================
 Helper Functions
==========================================================*/

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/*==========================================================
 Loading Screen
==========================================================*/

window.addEventListener("load", () => {

    const loader = $("#loading-screen");

    setTimeout(() => {

        loader.classList.add("is-hidden");

    }, 1200);

});


/*==========================================================
 Sticky Header
==========================================================*/

const header = $("#site-header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        header.classList.add("is-scrolled");

    }

    else{

        header.classList.remove("is-scrolled");

    }

});


/*==========================================================
 Scroll Progress Bar
==========================================================*/

const progressBar = $("#scroll-progress-bar");

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});


/*==========================================================
 Cursor Glow
==========================================================*/

const cursorGlow = $("#cursor-glow");

document.addEventListener("mousemove", (e)=>{

    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

});


document.addEventListener("mouseleave", ()=>{

    cursorGlow.style.opacity = 0;

});

document.addEventListener("mouseenter", ()=>{

    cursorGlow.style.opacity = 1;

});


/*==========================================================
 Mobile Navigation
==========================================================*/

const hamburger = $("#hamburger-btn");
const navLinks = $("#nav-links");
const navActions = $("#nav-actions");

hamburger.addEventListener("click", ()=>{

    hamburger.classList.toggle("is-active");

    navLinks.classList.toggle("is-open");

    navActions.classList.toggle("is-open");

});


/*==========================================================
 Close Menu After Click
==========================================================*/

$$(".nav-links__link").forEach(link=>{

    link.addEventListener("click", ()=>{

        hamburger.classList.remove("is-active");
        navLinks.classList.remove("is-open");
        navActions.classList.remove("is-open");

    });

});


/*==========================================================
 Smooth Scrolling
==========================================================*/

$$('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",(e)=>{

        e.preventDefault();

        const target = document.querySelector(
            anchor.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==========================================================
 Scroll Reveal
==========================================================*/

const revealElements = $$("[data-reveal]");

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("is-visible");

        }

    });

},

{

    threshold:0.2

}

);

revealElements.forEach(element=>{

    revealObserver.observe(element);

});


/*==========================================================
 Hero Particle Generator
==========================================================*/

const particleLayer = $("#particle-layer");

for(let i=0;i<50;i++){

    const particle = document.createElement("span");

    particle.style.left = Math.random()*100 + "%";

    particle.style.top = Math.random()*100 + "%";

    particle.style.animationDuration =
        6 + Math.random()*10 + "s";

    particle.style.animationDelay =
        Math.random()*8 + "s";

    particle.style.opacity =
        Math.random();

    particleLayer.appendChild(particle);

}


/*==========================================================
 Current Year
==========================================================*/

$("#current-year").textContent =
new Date().getFullYear();


/*==========================================================
 Hero Buttons
==========================================================*/

$("#register-btn").addEventListener("click", () => {

    window.location.href = "register.html";

});

$("#watch-demo-btn").addEventListener("click",()=>{

    alert("Demo Video Coming Soon!");

});


console.log("LifeChain AI Part 1 Loaded Successfully");

/*==========================================================
 LifeChain AI
 script.js
 Part 2
==========================================================*/


/*==========================================================
 Animated Statistics Counter
==========================================================*/

const statNumbers = document.querySelectorAll(".stats-card__number");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.count);

        let current = 0;

        const increment = target / 150;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent = Math.floor(current).toLocaleString();

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target.toLocaleString();

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: 0.5

});

statNumbers.forEach(counter => {

    counterObserver.observe(counter);

});


/*==========================================================
 FAQ Accordion
==========================================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-item__question");

    button.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {

                other.classList.remove("is-open");

                other.querySelector(".faq-item__question")
                    .setAttribute("aria-expanded", "false");

            }

        });

        item.classList.toggle("is-open");

        const expanded = item.classList.contains("is-open");

        button.setAttribute("aria-expanded", expanded);

    });

});


/*==========================================================
 Timeline Active Animation
==========================================================*/

const timelineSteps = document.querySelectorAll(".timeline__step");

const timelineObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            timelineSteps.forEach(step => {

                step.classList.remove("is-active");

            });

            entry.target.classList.add("is-active");

        }

    });

}, {

    threshold: 0.5

});

timelineSteps.forEach(step => {

    timelineObserver.observe(step);

});


/*==========================================================
 3D Card Tilt Effect
==========================================================*/

const tiltCards = document.querySelectorAll(

".feature-card, .future-card, .about-card, .donor-card, .hospital-card"

);

tiltCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 18;

        const rotateY = (x - centerX) / 18;

        card.style.transform =

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.04)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =

            "perspective(900px) rotateX(0) rotateY(0) scale(1)";

    });

});


/*==========================================================
 Ripple Button Effect
==========================================================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.style.position = "relative";

    button.style.overflow = "hidden";

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const size = Math.max(

            button.clientWidth,

            button.clientHeight

        );

        ripple.style.width = ripple.style.height =

            size + "px";

        ripple.style.left =

            e.offsetX - size / 2 + "px";

        ripple.style.top =

            e.offsetY - size / 2 + "px";

        ripple.style.position = "absolute";

        ripple.style.borderRadius = "50%";

        ripple.style.background =

            "rgba(255,255,255,.35)";

        ripple.style.transform = "scale(0)";

        ripple.style.animation =

            "ripple .6s linear";

        ripple.style.pointerEvents = "none";

        button.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/*==========================================================
 Ripple Animation Style
==========================================================*/

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

@keyframes ripple{

0%{

transform:scale(0);

opacity:1;

}

100%{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(rippleStyle);


/*==========================================================
 Floating QR Card Animation
==========================================================*/

const qrCard = document.getElementById("floating-qr-card");

if (qrCard) {

    let angle = 0;

    function animateCard() {

        angle += 0.015;

        qrCard.style.transform =

            `translateY(${Math.sin(angle) * 8}px)`;

        requestAnimationFrame(animateCard);

    }

    animateCard();

}


/*==========================================================
 Button Hover Glow
==========================================================*/

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.boxShadow =

            "0 0 30px rgba(0,230,195,.4)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.boxShadow = "";

    });

});


/*==========================================================
 Double Click Logo
==========================================================*/

const logo = document.getElementById("logo");

logo.addEventListener("dblclick", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*==========================================================
 Keyboard Shortcut
Press Home Key → Scroll to Top
==========================================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Home") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});


console.log("LifeChain AI Part 2 Loaded Successfully");

/*==========================================================
LifeChain AI
script.js
Part 3
==========================================================*/


/*==========================================================
Demo Patient Database
==========================================================*/

const patientDatabase = {

    "LC-000001":{

        name:"Ananya Rao",
        age:"27",

        bloodGroup:"O+",

        allergies:"Penicillin",

        diseases:"Asthma",

        medications:"Salbutamol",

        emergencyContacts:"Ravi Rao (+91 9876543210)",

        organDonor:"Yes",

        bloodDonor:"Available"

    },

    "LC-000002":{

        name:"Rahul Sharma",

        age:"35",

        bloodGroup:"A+",

        allergies:"None",

        diseases:"Diabetes",

        medications:"Metformin",

        emergencyContacts:"Sneha Sharma (+91 9876543200)",

        organDonor:"No",

        bloodDonor:"Unavailable"

    },

    "LC-000003":{

        name:"Fatima Sheikh",

        age:"30",

        bloodGroup:"AB+",

        allergies:"Dust",

        diseases:"None",

        medications:"None",

        emergencyContacts:"Ahmed Sheikh (+91 9876543100)",

        organDonor:"Yes",

        bloodDonor:"Available"

    }

};



/*==========================================================
Generate Random Patient ID
==========================================================*/

const randomPatientID =

"LC-" +

Math.floor(100000 + Math.random()*900000);

document.getElementById("demo-patient-id").textContent =

"Patient ID : " + randomPatientID;



/*==========================================================
QR Code Generator
==========================================================*/

if(typeof QRCode !== "undefined"){

    new QRCode(

        document.getElementById("demo-qr-code"),

        {

            text:randomPatientID,

            width:200,

            height:200,

            colorDark:"#000000",

            colorLight:"#ffffff",

            correctLevel:QRCode.CorrectLevel.H

        }

    );

}



/*==========================================================
Download QR
==========================================================*/

document.getElementById("download-qr-btn")

.addEventListener("click",()=>{

    const image =

    document.querySelector("#demo-qr-code img");

    if(image){

        const link=document.createElement("a");

        link.href=image.src;

        link.download="LifeChainQR.png";

        link.click();

    }

});



/*==========================================================
Print QR
==========================================================*/

document.getElementById("print-qr-btn")

.addEventListener("click",()=>{

    window.print();

});



/*==========================================================
Blood Donor Search
==========================================================*/

const donorForm =

document.getElementById("donor-search-form");

donorForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const blood=

    document.getElementById("blood-group-select")

    .value.toUpperCase();

    const city=

    document.getElementById("city-input")

    .value.toLowerCase();

    const cards=

    document.querySelectorAll(".donor-card");

    cards.forEach(card=>{

        const group=

        card.querySelector(".donor-card__blood-group")

        .textContent.toUpperCase();

        const location=

        card.querySelector(".donor-card__location")

        .textContent.toLowerCase();

        const bloodMatch=

        blood==="" || group===blood;

        const cityMatch=

        city==="" || location.includes(city);

        if(bloodMatch && cityMatch){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

});



/*==========================================================
Emergency Profile Viewer
==========================================================*/

const viewButton=

document.getElementById("view-profile-btn");

viewButton.addEventListener("click",()=>{

    const id=

    document.getElementById("patient-id-input")

    .value.trim();

    const patient=

    patientDatabase[id];

    if(!patient){

        alert("Patient Not Found");

        return;

    }

    document.querySelector("#profile-name dd")

    .textContent=patient.name;

    document.querySelector("#profile-age dd")

    .textContent=patient.age;

    document.querySelector("#profile-blood-group dd")

    .textContent=patient.bloodGroup;

    document.querySelector("#profile-allergies dd")

    .textContent=patient.allergies;

    document.querySelector("#profile-diseases dd")

    .textContent=patient.diseases;

    document.querySelector("#profile-medications dd")

    .textContent=patient.medications;

    document.querySelector("#profile-emergency-contacts dd")

    .textContent=patient.emergencyContacts;

    document.querySelector("#profile-organ-donor dd")

    .textContent=patient.organDonor;

    document.querySelector("#profile-blood-donor dd")

    .textContent=patient.bloodDonor;

});



/*==========================================================
Mock QR Scan
==========================================================*/

document.getElementById("scan-qr-btn")

.addEventListener("click",()=>{

    document.getElementById("patient-id-input").value=

    "LC-000001";

    alert("QR Code Scanned Successfully");

});



/*==========================================================
Hospital Directions
==========================================================*/

document

.querySelectorAll(".hospital-card__directions-btn")

.forEach(button=>{

    button.addEventListener("click",()=>{

        const hospital=

        button.parentElement

        .querySelector(".hospital-card__name")

        .textContent;

        window.open(

            "https://www.google.com/maps/search/"

            + encodeURIComponent(hospital),

            "_blank"

        );

    });

});



/*==========================================================
Donor Contact Button
==========================================================*/

document

.querySelectorAll(".donor-card__contact-btn")

.forEach(button=>{

    button.addEventListener("click",()=>{

        const donor=

        button.parentElement

        .querySelector(".donor-card__name")

        .textContent;

        alert(

            "Contact request sent to "

            + donor

        );

    });

});



console.log("LifeChain AI Part 3 Loaded Successfully");

/*==========================================================
 LifeChain AI
 script.js
 Part 4A
==========================================================*/


/*==========================================================
 Toast Notification System
==========================================================*/

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.padding = "14px 22px";
    toast.style.borderRadius = "10px";
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "0.4s";

    toast.style.background =
        type === "success"
            ? "#00C896"
            : "#FF3B5C";

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";

        setTimeout(() => {

            toast.remove();

        },400);

    },3000);

}



/*==========================================================
 Contact Form Validation
==========================================================*/

const contactForm =
document.getElementById("contact-form");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const name =
    document.getElementById("contact-name");

    const email =
    document.getElementById("contact-email");

    const message =
    document.getElementById("contact-message");

    let valid = true;

    clearErrors();

    if(name.value.trim().length < 3){

        showError(name,"Minimum 3 characters");

        valid = false;

    }

    if(!validateEmail(email.value)){

        showError(email,"Invalid Email");

        valid = false;

    }

    if(message.value.trim().length < 10){

        showError(message,"Minimum 10 characters");

        valid = false;

    }

    if(valid){

        showToast("Message Sent Successfully!");

        contactForm.reset();

    }

});

}



/*==========================================================
 Email Validation
==========================================================*/

function validateEmail(email){

    const regex =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}



/*==========================================================
 Show Error
==========================================================*/

function showError(input,message){

    input.classList.add("is-invalid");

    const error =

    input.parentElement.querySelector(

    ".contact-form__error"

    );

    if(error){

        error.textContent = message;

    }

}



/*==========================================================
 Clear Errors
==========================================================*/

function clearErrors(){

document.querySelectorAll(

".contact-form__error"

).forEach(error=>{

error.textContent="";

});

document.querySelectorAll(

".form-input,.form-textarea"

).forEach(field=>{

field.classList.remove("is-invalid");

});

}



/*==========================================================
 Live Validation
==========================================================*/

document

.querySelectorAll(

".form-input,.form-textarea"

)

.forEach(input=>{

input.addEventListener("input",()=>{

input.classList.remove("is-invalid");

});

});



/*==========================================================
 Back To Top Button
==========================================================*/

const topButton =

document.createElement("button");

topButton.innerHTML="↑";

topButton.id="backToTop";

topButton.style.position="fixed";

topButton.style.right="25px";

topButton.style.bottom="25px";

topButton.style.width="52px";

topButton.style.height="52px";

topButton.style.borderRadius="50%";

topButton.style.background="#00E6C3";

topButton.style.color="#04111A";

topButton.style.fontSize="22px";

topButton.style.fontWeight="bold";

topButton.style.cursor="pointer";

topButton.style.display="none";

topButton.style.zIndex="999";

topButton.style.boxShadow=

"0 8px 25px rgba(0,230,195,.35)";

document.body.appendChild(topButton);



window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topButton.style.display="block";

}

else{

topButton.style.display="none";

}

});



topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});



/*==========================================================
 Hero Typing Animation
==========================================================*/

const typingElement =

document.getElementById("typing-text");

if(typingElement){

const texts=[

"Saving Lives Through Technology",

"Emergency Healthcare Platform",

"Instant QR Medical Access",

"Connecting Donors & Hospitals"

];

let textIndex=0;

let charIndex=0;

let deleting=false;

function typeEffect(){

const current=texts[textIndex];

if(!deleting){

typingElement.textContent=

current.substring(0,charIndex++);

if(charIndex>current.length){

deleting=true;

setTimeout(typeEffect,1500);

return;

}

}

else{

typingElement.textContent=

current.substring(0,charIndex--);

if(charIndex<0){

deleting=false;

textIndex=(textIndex+1)%texts.length;

}

}

setTimeout(typeEffect,

deleting?40:90);

}

typeEffect();

}



/*==========================================================
 Replace alert() with Toasts
==========================================================*/

window.showSuccess=function(msg){

showToast(msg,"success");

}

window.showErrorToast=function(msg){

showToast(msg,"error");

}



console.log("LifeChain AI Part 4A Loaded Successfully");

/*==========================================================
 LifeChain AI
 script.js
 Part 4B (Final)
==========================================================*/

"use strict";

/*==========================================================
 Theme Toggle
==========================================================*/

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        localStorage.setItem("theme", isLight ? "light" : "dark");

        themeToggle.innerHTML = isLight
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';

    });

}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    if (themeToggle) {
        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
    }

}


/*==========================================================
 Debounce Utility
==========================================================*/

function debounce(func, delay = 100) {

    let timeout;

    return function () {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, arguments);

        }, delay);

    };

}


/*==========================================================
 Optimized Resize Event
==========================================================*/

window.addEventListener(

    "resize",

    debounce(() => {

        console.log("Window resized");

    }, 200)

);


/*==========================================================
 Lazy Loading Images
==========================================================*/

const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver(

(entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const img = entry.target;

        img.src = img.dataset.src;

        img.removeAttribute("data-src");

        observer.unobserve(img);

    });

},

{

    threshold: 0.2

}

);

lazyImages.forEach(img => {

    imageObserver.observe(img);

});


/*==========================================================
 Keyboard Accessibility
==========================================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        if (navLinks) navLinks.classList.remove("is-open");

        if (navActions) navActions.classList.remove("is-open");

        if (hamburger) hamburger.classList.remove("is-active");

    }

});


/*==========================================================
 Prevent Double Form Submission
==========================================================*/

const forms = document.querySelectorAll("form");

forms.forEach(form => {

    form.addEventListener("submit", () => {

        const button = form.querySelector("button[type='submit']");

        if (button) {

            button.disabled = true;

            setTimeout(() => {

                button.disabled = false;

            }, 2500);

        }

    });

});


/*==========================================================
 Auto Close Mobile Menu on Resize
==========================================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth >= 1024) {

        if (navLinks) navLinks.classList.remove("is-open");

        if (navActions) navActions.classList.remove("is-open");

        if (hamburger) hamburger.classList.remove("is-active");

    }

});


/*==========================================================
 Smooth Fade-In for Entire Website
==========================================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity .8s ease";

    requestAnimationFrame(() => {

        document.body.style.opacity = "1";

    });

});


/*==========================================================
 Random Quote Generator
==========================================================*/

const quotes = [

    "Every second counts in an emergency.",

    "Technology can save lives.",

    "Together we build a healthier future.",

    "Instant access. Instant care.",

    "Connecting patients, donors and hospitals."

];

const quoteElement = document.getElementById("quote-text");

if (quoteElement) {

    let quoteIndex = 0;

    setInterval(() => {

        quoteIndex++;

        if (quoteIndex >= quotes.length)

            quoteIndex = 0;

        quoteElement.textContent = quotes[quoteIndex];

    }, 5000);

}


/*==========================================================
 Offline Detection
==========================================================*/

window.addEventListener("offline", () => {

    if (window.showErrorToast) {

        showErrorToast("No Internet Connection");

    }

});

window.addEventListener("online", () => {

    if (window.showSuccess) {

        showSuccess("Back Online");

    }

});


/*==========================================================
 Copy Patient ID
==========================================================*/

const copyButton = document.getElementById("copy-id-btn");

if (copyButton) {

    copyButton.addEventListener("click", () => {

        const id =

            document.getElementById("patient-id-input").value;

        navigator.clipboard.writeText(id);

        showSuccess("Patient ID Copied");

    });

}


/*==========================================================
 Performance Log
==========================================================*/

window.addEventListener("load", () => {

    console.log(

        "Page Loaded in",

        performance.now().toFixed(0),

        "ms"

    );

});


/*==========================================================
 Final Initialization
==========================================================*/

function initializeLifeChain() {

    console.log(

        "%cLifeChain AI Ready",

        "color:#00E6C3;font-size:18px;font-weight:bold"

    );

    console.log(

        "All Modules Loaded Successfully"

    );

}

initializeLifeChain();


/*==========================================================
 End of Script
==========================================================*/