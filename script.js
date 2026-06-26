// TYPING EFFECT
const words = ["Web Developer", "UI Designer", "Freelancer"];
let i = 0, j = 0, isDeleting = false;

function type(){
    const display = document.querySelector(".typing");
    if(!display) return;

    let current = words[i];

    display.textContent = isDeleting
        ? current.substring(0, j--)
        : current.substring(0, j++);

    if(!isDeleting && j === current.length){
        isDeleting = true;
        setTimeout(type, 1200);
        return;
    }

    if(isDeleting && j === 0){
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 60 : 120);
}
type();

// SCROLL BAR
window.addEventListener("scroll", () => {
    let winScroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;

    document.getElementById("progress-bar").style.width = scrolled + "%";
});

// EMAILJS INIT
(function(){
    emailjs.init("lQxLTJp1IQbMhcOwM");
})();

// CONTACT FORM
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const btn = document.getElementById("sendBtn");
    btn.innerText = "Sending...";
    btn.disabled = true;

    emailjs.sendForm("service_y8ulps3", "template_zr2dg55", this)
    .then(() => {
        btn.innerText = "Sent ✅";
        btn.style.background = "green";
        form.reset();
    })
    .catch((error) => {
        btn.innerText = "Failed ❌";
        btn.disabled = false;
        console.log(error);
    });
});