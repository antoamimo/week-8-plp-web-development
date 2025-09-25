document.addEventListener('DOMContentLoaded', function(){
  // Slider logic (same as before)
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.querySelector('.arrow.prev');
  const next = document.querySelector('.arrow.next');
  const dotsContainer = document.getElementById('dots');
  let current = 0;
  let timer = null;
  const interval = 5000;

  function goTo(n){
    slides.forEach(s => s.classList.remove('active'));
    dotsContainer.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.querySelectorAll('.dot')[current].classList.add('active');
    // trigger hero text animation
    const inner = slides[current].querySelector('.slide-inner');
    inner.classList.remove('show');
    // allow reflow then show
    setTimeout(()=> inner.classList.add('show'), 60);
  }

  function nextSlide(){ goTo(current + 1); }
  function prevSlide(){ goTo(current - 1); }

  slides.forEach((s, i) => {
    const d = document.createElement('button');
    d.className = 'dot';
    d.setAttribute('aria-label','Go to slide '+(i+1));
    d.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsContainer.appendChild(d);
  });

  if(next) next.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if(prev) prev.addEventListener('click', () => { prevSlide(); resetTimer(); });

  function startTimer(){ timer = setInterval(nextSlide, interval); }
  function resetTimer(){ clearInterval(timer); startTimer(); }

  goTo(0);
  startTimer();

  const hero = document.querySelector('.hero');
  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', () => { resetTimer(); });

  // Intersection Observer for section animations
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, {threshold:0.15});

  document.querySelectorAll('.animate').forEach(el=> observer.observe(el));

  // initial hero text animate
  const firstInner = document.querySelector('.slide.active .slide-inner');
  if(firstInner) setTimeout(()=> firstInner.classList.add('show'), 150);

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if(navToggle && navList){
    navToggle.addEventListener('click', function(){
      if(navList.style.display === 'flex') navList.style.display = 'none';
      else navList.style.display = 'flex';
    });
  }
});


// Back to Top functionality
const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.innerText = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if(window.scrollY > 300){
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
});
// Hamburger toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }
});
