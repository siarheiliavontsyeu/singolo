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
    SLIDER_BUTTON = document.querySelectorAll('.slider__button'),
    HAMBURGER = document.getElementById('hamburger');

const MENU_SITE_BLOCKS = {};
let slideIndex = 1;

window.onload = function() {
    //header changes
    getMenuSiteBlocksOffsetTop();
    addScrollPageHandler();
    addHamburgerClickHandler();

    //navigation transitions
    addNavigationTransitionHandler();

    //slider
    showSlides(slideIndex);
    addSliderClickHandler();
    addPhonesClickHandler();

    //portfolio
    addPortfolioImgClickHandler();
    addPortfolioMenuClickHandler();

    //form
    addFormSubmitClickHandler();
    addModalWindowButtonOkHandler();
}

// navigation
const addHamburgerClickHandler = () => {
    HAMBURGER.addEventListener('click', (event) => {
        HAMBURGER.classList.toggle('hamburger_active');
        NAVIGATION.classList.toggle('navigation_active');
    });
};

const addScrollPageHandler = () => {
    window.addEventListener('scroll', event => {
        if (window.pageYOffset > 0) {
            HEADER.classList.add('header_sticky');
        } else {
            HEADER.classList.remove('header_sticky');
        }
        changeActiveNavigationMenuOnScroll();
    })
}

const addNavigationTransitionHandler = () => {
    NAVIGATION.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedElement = event.target;
        if (clickedElement.tagName === 'A') {
            removeActiveNavigationMenu();
            addActiveNavigationMenu(clickedElement);
            addSmoothScrolling(clickedElement);
        }
    });
}

const removeActiveNavigationMenu = () => {
    NAVIGATION.querySelectorAll('a').forEach(elem => {
        elem.classList.remove('navigation__link_active');
    });
}

const addActiveNavigationMenu = (clickedElement) => {
    clickedElement.classList.add('navigation__link_active');
}

const addSmoothScrolling = (clickedElement) => {
    const ANCHOR_ID = clickedElement.getAttribute('href').substr(1);
    const y = document.getElementById(ANCHOR_ID).getBoundingClientRect().top + window.pageYOffset - 50;
    window.scrollTo({ top: y, behavior: 'smooth' });
}

const getMenuSiteBlocksOffsetTop = () => {
    Array.from(MENU_ANCHORS, el => {
        MENU_SITE_BLOCKS[el.id] = el.offsetTop - 800;
    })
}

const changeActiveNavigationMenuOnScroll = () => {
    let currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    for (let anchor in MENU_SITE_BLOCKS) {
        if (MENU_SITE_BLOCKS[anchor] <= currentScrollPosition) {
            document.querySelector('.navigation__link_active').classList.remove("navigation__link_active");
            document.querySelector(`a[href*='${anchor}']`).classList.add("navigation__link_active");
        }
    }
}

// slider
const plusSlides = (sliderNumber) => {
    showSlides(slideIndex += sliderNumber);
}

const showSlides = (sliderNumber) => {
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


const slider = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('slider__button_arrow-left')) {
        plusSlides(-1);
        SLIDES.forEach(el => el.classList.add('slide-left'));
    } else if (event.target.classList.contains('slider__button_arrow-right')) {
        plusSlides(1);
        SLIDES.forEach(el => el.classList.add('slide-right'));
    }
}

const addSliderClickHandler = () => {
    Array.from(SLIDER_BUTTON, el => el.addEventListener('click', slider));
}


// phones
const addPhonesClickHandler = () => {
    Array.from(PHONES_ITEM, el => el.addEventListener('click', event => {
        let clickedElement = event.target;
        if (clickedElement.className !== 'phone__shadow') {
            togglePhoneScreenDisplay(clickedElement);
        }
    }));
}

const togglePhoneScreenDisplay = (clickedElement) => {
    clickedElement.parentNode.querySelector('.phone__screen').classList.toggle('phone__screen_off');
}


// portfolio
const addPortfolioImgClickHandler = () => {
    PORTFOLIO_CONTAINER.addEventListener('click', event => {
        event.preventDefault();
        let clickedElement = event.target;
        if (clickedElement.tagName === 'IMG') {
            removePortfolioActiveImages();
            addPortfolioActiveImg(clickedElement);
        }
    });
}

const removePortfolioActiveImages = () => {
    let PORTFOLIO_IMG = document.querySelectorAll('.portfolio__img');
    PORTFOLIO_IMG.forEach(elem => {
        elem.classList.remove('portfolio__img_active');
    });
}

const addPortfolioActiveImg = (clickedElement) => {
    clickedElement.closest('.portfolio__img').classList.add('portfolio__img_active');
}

const addPortfolioMenuClickHandler = () =>
    PORTFOLIO__MENU.addEventListener('click', event => {
        event.preventDefault();
        let PORTFOLIO_IMG = document.querySelectorAll('.portfolio__img');
        let arrImg = Array.from(PORTFOLIO_IMG);
        let clickedElement = event.target;

        if (clickedElement.tagName === 'A') {
            removePortfolioActiveImages();
            removeActivePortfolioMenu();
            addActivePortfolioMenu(clickedElement);
            clearPortfolioContainer();
            arrImg = shuffleArr(arrImg);
            addShuffledPortfolioImages(arrImg);

        }
    });

const removeActivePortfolioMenu = () => {
    PORTFOLIO__MENU.querySelectorAll('a').forEach(elem => {
        elem.classList.remove('menu__link_active');
    });
}

const addActivePortfolioMenu = (clickedElement) => {
    clickedElement.classList.add('menu__link_active');
}

const clearPortfolioContainer = () => {
    PORTFOLIO_CONTAINER.innerHTML = '';
}

const addShuffledPortfolioImages = (arr) => {
    arr.forEach(elem => {
        PORTFOLIO_CONTAINER.innerHTML += elem.outerHTML;
    });
}

const shuffleArr = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


// form
const addFormSubmitClickHandler = () => {
    FORM_SUBMIT.addEventListener('click', event => {
        event.preventDefault();



        if (CONTACT_US_FORM.checkValidity()) {
            fillModalWindow();
            openModalWindow();
        } else {
            CONTACT_US_FORM.reportValidity();
        };
    });
}

const openModalWindow = () => {
    MESSAGE_BOX.classList.remove('hidden');
}

const closeModalWindow = () => {
    MESSAGE_BOX.classList.add('hidden');
}

const fillModalWindow = () => {
    const formSubject = document.querySelector('input[class=form__subject]'),
        formDetail = document.querySelector('textarea[class=form__detail]'),
        messageSubject = document.getElementById('message-subject'),
        messageDescription = document.getElementById('message-description');

    messageSubject.innerHTML = formSubject.value ? `Subject: ${formSubject.value}` : `Without subject`;
    messageDescription.innerHTML = formDetail.value ? `Description: ${formDetail.value}` : `Without description`;
}

const addModalWindowButtonOkHandler = () => {
    BUTTON_OK.addEventListener('click', event => {
        event.preventDefault();
        CONTACT_US_FORM.reset();
        closeModalWindow();
    });
}