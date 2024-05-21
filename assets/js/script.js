/*======= SHOW MENU ========*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu Show */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    document.body.classList.add('no-scroll'); // bodyにno-scrollクラスを追加
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('no-scroll'); // bodyからno-scrollクラスを削除
  });
}

/* Close menu on clicking outside of it */
document.addEventListener('click', (event) => {
  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('no-scroll'); // bodyからno-scrollクラスを削除
  }
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
  const header = document.getElementById('header')
  this.scrollY >= 50 ? header.classList.add('shadow-header')
                     : header.classList.remove('shadow-header')

 }
 window.addEventListener('scroll',shadowHeader)

 /*=============== SWIPER FAVORITES ===============*/
const swiperFavorites = new Swiper("#swiper1", {
  loop: true,
  grabCursor:true,
  slidesPerView:'auto',
  centeredSlides:'auto',
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  if (window.scrollY >= 350) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUp);


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (sectionClass) { // sectionClassが存在するかを確認
      if (scrollDown >= sectionTop && scrollDown < sectionTop + sectionHeight) {
        sectionClass.classList.add('active-link');
      } else {
        sectionClass.classList.remove('active-link');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

/*=============== SMOOTH SCROLL ===============*/
const navLinks = document.querySelectorAll('.nav__menu a');
const scrollUpLink = document.getElementById('scroll-up');

navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 58, // Adjust for fixed header height
        behavior: 'smooth'
      });
    }
  });
});

scrollUpLink.addEventListener('click', function(event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
origin:'top',
distance:'60px',
duration:2500,
delay:300,
//reset:true, Animation repeat
})

sr.reveal(`.home__data, .favorites__container, .footer__container`)
sr.reveal(`.home__data, .home__img`,{delay:600, scale:0.5})
sr.reveal(`.home__chips-1, .home__chips-2, .home__chips-3`,{delay:1000,interval:100})
sr.reveal(`.home__leaf`,{delay:1200})
sr.reveal(`.home__tomato-1, .home__tomato-2`,{delay:1400,interval:100})
sr.reveal(`.care__img ,.contact__img`,{origin:'left'})
sr.reveal(`.care__list, .contact__data`,{origin:'right'})
sr.reveal(`.banner__item, .products__card`,{interval:100})
