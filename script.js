const HEADER = document.getElementById("header");
const NAVIGATION = document.getElementById('navigation');
const PHONES_ITEM = document.querySelectorAll('.phones__item');
const PORTFOLIO_CONTAINER = document.querySelector('.portfolio__container');
const PORTFOLIO__MENU = document.getElementById("portfolio__menu");
const BUTTON_OK = document.getElementById('button_ok');
const FORM_SUBMIT = document.getElementById('form__submit');
const MESSAGE_BOX = document.getElementById('message-box');

function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


/* sticky header*/
window.onscroll = function() {
    if (window.pageYOffset > 1) {
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
        const anchorID = event.target.getAttribute('href').substr(1);

        document.getElementById(anchorID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

/*phones*/
Array.from(PHONES_ITEM, el => el.addEventListener('click', event => {
    event.target.parentNode.querySelector('.phone__screen').classList.toggle('phone__screen_off');
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

    const formName = document.querySelector('input[class=form__name]');
    const formEmail = document.querySelector('input[class=form__email]');
    const formSubject = document.querySelector('input[class=form__subject]');
    const formDetail = document.querySelector('textarea[class=form__detail]');

    if (formName.checkValidity() && formEmail.checkValidity()) {
        let messageSubject = document.getElementById('message-subject');
        let messageDescription = document.getElementById('message-description');

        messageSubject.innerHTML = formSubject.value ? `Тема: ${formSubject.value}` : `Без темы`;
        messageDescription.innerHTML = formDetail.value ? `Описание: ${formDetail.value}` : `Без описания`;

        MESSAGE_BOX.classList.remove('hidden');
    } else {
        formName.reportValidity();
        formEmail.reportValidity();
    };
});


BUTTON_OK.addEventListener('click', event => {
    event.preventDefault();
    const formName = document.querySelector('input[class=form__name]');
    const formEmail = document.querySelector('input[class=form__email]');
    const formSubject = document.querySelector('input[class=form__subject]');
    const formDetail = document.querySelector('textarea[class=form__detail]');

    formName.value = '';
    formEmail.value = '';
    formSubject.value = '';
    formDetail.value = '';

    MESSAGE_BOX.classList.add('hidden');
});