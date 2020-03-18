const HEADER = document.getElementById("header"),
    NAVIGATION = document.getElementById('navigation'),
    MENU_ANCHORS = document.querySelectorAll('.menu-anchor'),
    PHONES_ITEM = document.querySelectorAll('.phones__item'),
    PORTFOLIO_CONTAINER = document.querySelector('.portfolio__container'),
    PORTFOLIO__MENU = document.getElementById("portfolio__menu"),
    CONTACT_US_FORM = document.getElementById('contact-us-form'),
    BUTTON_OK = document.getElementById('button_ok'),
    FORM_SUBMIT = document.getElementById('form__submit'),
    MESSAGE_BOX = document.getElementById('message-box'),
    SLIDES = document.querySelectorAll('.slider__item'),
    SLIDER_BUTTON = document.querySelectorAll('.slider__button');


function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


/* sticky header*/
window.onscroll = function() {
    if (window.pageYOffset > 0) {
        HEADER.classList.add('header_sticky');
    } else {
        HEADER.classList.remove('header_sticky');
    }
};

/* navigation */
NAVIGATION.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName === 'A') {
        // add/remove active class
        NAVIGATION.querySelectorAll('a').forEach(elem => {
            elem.classList.remove('navigation__link_active');
        });
        event.target.classList.add('navigation__link_active');

        //smooth scroll
        const ANCHOR_ID = event.target.getAttribute('href').substr(1);
        // document.getElementById(ANCHOR_ID).scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start'
        // });
        const y = document.getElementById(ANCHOR_ID).getBoundingClientRect().top + window.pageYOffset - 50;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }
});

const MENU_SITE_BLOCKS = {};

Array.from(MENU_ANCHORS, el => {
    MENU_SITE_BLOCKS[el.id] = el.offsetTop - 800;
})


window.addEventListener("scroll", (event) => {
    let currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    for (let anchor in MENU_SITE_BLOCKS) {
        if (MENU_SITE_BLOCKS[anchor] <= currentScrollPosition) {
            document.querySelector('.navigation__link_active').classList.remove("navigation__link_active");
            document.querySelector(`a[href*='${anchor}']`).classList.add("navigation__link_active");
        }
    }
});

/*slider*/
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(sliderNumber) {
    showSlides(slideIndex += sliderNumber);
}

function showSlides(sliderNumber) {
    if (sliderNumber > SLIDES.length) { slideIndex = 1 }
    if (sliderNumber < 1) { slideIndex = SLIDES.length }

    for (let i = 0; i < SLIDES.length; i++) {
        SLIDES[i].style.display = 'none';
        SLIDES[i].classList.remove('slide-left');
        SLIDES[i].classList.remove('slide-right');
    }
    SLIDES[slideIndex - 1].style.display = 'block';
    if (slideIndex % 2 === 0) {
        SLIDES[slideIndex - 1].closest('.slider').style.backgroundColor = '#648BF0';
        SLIDES[slideIndex - 1].closest('.slider').style.borderColor = '#7e9be8';
    } else {
        SLIDES[slideIndex - 1].closest('.slider').style.backgroundColor = '#f06c64';
        SLIDES[slideIndex - 1].closest('.slider').style.borderColor = '#ea676b';
    }
}

Array.from(SLIDER_BUTTON, el => el.addEventListener('click', slider));

function slider(event) {
    event.preventDefault();
    if (event.target.classList.contains('slider__button_arrow-left')) {
        plusSlides(-1);
        SLIDES.forEach(el => el.classList.add('slide-left'));
    } else if (event.target.classList.contains('slider__button_arrow-right')) {
        plusSlides(1);
        SLIDES.forEach(el => el.classList.add('slide-right'));
    }
}


/*phones*/
Array.from(PHONES_ITEM, el => el.addEventListener('click', event => {
    if (event.target.className !== 'phone__shadow') {
        event.target.parentNode.querySelector('.phone__screen').classList.toggle('phone__screen_off');
    }
}));

/*portfolio*/
PORTFOLIO_CONTAINER.addEventListener('click', event => {
    event.preventDefault();
    let PORTFOLIO_IMG = document.querySelectorAll('.portfolio__img');
    if (event.target.tagName === 'IMG') {
        PORTFOLIO_IMG.forEach(elem => {
            elem.classList.remove('portfolio__img_active');
        });
        event.target.closest('.portfolio__img').classList.toggle('portfolio__img_active');
    }
});

PORTFOLIO__MENU.addEventListener('click', event => {
    event.preventDefault();
    let PORTFOLIO_IMG = document.querySelectorAll('.portfolio__img');

    // add/remove active class
    if (event.target.tagName === 'A') {
        PORTFOLIO_IMG.forEach(elem => {
            elem.classList.remove('portfolio__img_active');
        });

        PORTFOLIO__MENU.querySelectorAll('a').forEach(elem => {
            elem.classList.remove('menu__link_active');
        });
        event.target.tagName === 'A' && event.target.classList.add('menu__link_active');

        let arrImg = Array.from(PORTFOLIO_IMG);
        PORTFOLIO_CONTAINER.innerHTML = '';

        shuffleArr(arrImg).forEach(elem => {
            // console.log(elem.outerHTML);
            PORTFOLIO_CONTAINER.innerHTML += elem.outerHTML;
        });
    }
});

/*form*/
FORM_SUBMIT.addEventListener('click', event => {
    event.preventDefault();

    const formName = document.querySelector('input[class=form__name]'),
        formEmail = document.querySelector('input[class=form__email]'),
        formSubject = document.querySelector('input[class=form__subject]'),
        formDetail = document.querySelector('textarea[class=form__detail]');

    if (CONTACT_US_FORM.checkValidity()) {
        let messageSubject = document.getElementById('message-subject');
        let messageDescription = document.getElementById('message-description');

        messageSubject.innerHTML = formSubject.value ? `Subject: ${formSubject.value}` : `Without subject`;
        messageDescription.innerHTML = formDetail.value ? `Description: ${formDetail.value}` : `Without description`;

        MESSAGE_BOX.classList.remove('hidden');
    } else {
        CONTACT_US_FORM.reportValidity();
    };
});


BUTTON_OK.addEventListener('click', event => {
    event.preventDefault();
    CONTACT_US_FORM.reset();

    MESSAGE_BOX.classList.add('hidden');
});